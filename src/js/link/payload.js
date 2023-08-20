(function () {

    const privateDMKindNumber = 4
    const privateSheetKindNumber = 1003
    const privateBoardKindNumber = 1002
    const privateWorkspaceKindNumber = 1001 

    // Check if the device is online before proceeding
    if (!navigator.onLine) {
        localStorage.removeItem("privKey");
        window.location.href = 'index.html';
        return;
    }

    // Needed variables
    const ec = new elliptic.ec('secp256k1');// Instantiate the secp256k1 elliptic curve (the one used in Bitcoin)
    var { getSharedSecret, schnorr, utils } = nobleSecp256k1
    var crypto = window.crypto
    var getRand = size => crypto.getRandomValues(new Uint8Array(size))
    var sha256 = bitcoinjs.crypto.sha256

    // Hex delaing
    function hexToBytes(hex) {
        return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    }

    function base64ToHex(str) {
        var raw = atob(str);
        var result = '';
        var i; for (i = 0; i < raw.length; i++) {
            var hex = raw.charCodeAt(i).toString(16);
            result += (hex.length === 2 ? hex : '0' + hex);
        }
        return result;
    }

    // Encrypt
    function encrypt(privkey, pubkey, text) {
        var key = nobleSecp256k1.getSharedSecret(privkey, '02' + pubkey, true).substring(2);
        var iv = window.crypto.getRandomValues(new Uint8Array(16));
        var cipher = browserifyCipher.createCipheriv('aes-256-cbc', hexToBytes(key), iv);
        var encryptedMessage = cipher.update(text, "utf8", "base64");
        emsg = encryptedMessage + cipher.final("base64");
        var uint8View = new Uint8Array(iv.buffer);
        var decoder = new TextDecoder();
        return emsg + "?iv=" + btoa(String.fromCharCode.apply(null, uint8View));
    }

    // Decrypt
    function decrypt(privkey, pubkey, ciphertext) {
        var [emsg, iv] = ciphertext.split("?iv=");
        var key = nobleSecp256k1.getSharedSecret(privkey, '02' + pubkey, true).substring(2);
        var decipher = browserifyCipher.createDecipheriv(
            'aes-256-cbc',
            hexToBytes(key),
            hexToBytes(base64ToHex(iv))
        );
        var decryptedMessage = decipher.update(emsg, "base64");
        dmsg = decryptedMessage + decipher.final("utf8");
        return dmsg;
    }

    // Public key in hexadecimal format from private key
    function generatePublicKey(privateKeyHex) {
        const keyPair = ec.keyFromPrivate(privateKeyHex, 'hex');
        const publicKeyBuffer = keyPair.getPublic();
        const publicKeyHex = publicKeyBuffer.encode('hex', false).substring(2);
        const shortHexKey = publicKeyHex.slice(0, 64);
        return shortHexKey;
    }

    // Relay connection
    const relay = "wss://relayable.org";
    var socket = new WebSocket(relay);
    const privKey = localStorage.getItem("privKey")
    const pubKey = generatePublicKey(privKey);

    // Listen nostr events
    socket.addEventListener('message', async function (message) {
        var [type, subId, event] = JSON.parse(message.data);
        var { kind, content } = event || {}
        if (!event || event === true) return
        console.log('message:', event)
        content = await decrypt(privKey, event.pubkey, content)
        const parsedContent = JSON.parse(content);

        // private board case
        if (kind === privateBoardKindNumber) {
            constructBoard(parsedContent[0], parsedContent[1], decodeURIComponent(parsedContent[2]), parsedContent[3], parsedContent[4], event.created_at, event.pubkey);
        }

        // private sheet case
        if (kind === privateSheetKindNumber) {
            if (document.getElementById(parsedContent[1])) {
                constructSheet(parsedContent[0], parsedContent[1], parsedContent[2], decodeURIComponent(parsedContent[3]), decodeURIComponent(parsedContent[4]), parsedContent[5], parsedContent[6], event.created_at, event.pubkey);
            } else {
                window.addEventListener(parsedContent[1], function() {
                    constructSheet(parsedContent[0], parsedContent[1], parsedContent[2], decodeURIComponent(parsedContent[3]), decodeURIComponent(parsedContent[4]), parsedContent[5], parsedContent[6], event.created_at, event.pubkey);
                })
            }
        }

    })

    // Subscribe to myself key
    var subId = bitcoinjs.ECPair.makeRandom().privateKey.toString("hex")
    var filter = { "authors": [pubKey] }
    var subscription = ["REQ", subId, filter]
    socket.addEventListener('open', async function (e) {
        socket.send(JSON.stringify(subscription));
        ephemeralNotification(`Connected to websocket.`)
    })

    // Show user is online confirmation modal and handle reconnection to websocket
    function isUserOnline(){
        const confirmationOnlineUserModal = document.getElementById('confirmationOnlineUserModal')
        const userIsOnline = document.getElementById('userIsOnline')
        confirmationOnlineUserModal.classList.remove("display-none");
        userIsOnline.addEventListener("click", function() {
            var socket = new WebSocket(relay);
            socket.send(JSON.stringify(subscription));
            confirmationOnlineUserModal.classList.add("display-none");
        })
    }

    // Listen on websocket close
    socket.addEventListener('close', function (event) {
        if (event.wasClean) {
            console.log(`WebSocket connection closed cleanly, code: ${event.code}, reason: ${event.reason}`);
            isUserOnline()
        } else {
            isUserOnline()
            console.error(`WebSocket connection was abruptly closed, code: ${event.code}, reason: ${event.reason}`);
        }
    });

    // Signing event
    async function getSignedEvent(event, privKey) {
        var eventData = JSON.stringify([
            0,
            event['pubkey'],
            event['created_at'],
            event['kind'],
            event['tags'],
            event['content']
        ])
        event.id = sha256(eventData).toString('hex')
        event.sig = await schnorr.sign(event.id, privKey)
        return event
    }

    // Event sender with 3 retry attempts function
    let currentRetry = 0;
    async function sendEventWithRetry(event) {
        try {
            const signedEvent = await getSignedEvent(event, privKey);
            socket.send(JSON.stringify(["EVENT", signedEvent]));
            ephemeralNotification("Board created successfully.")
            window.dispatchEvent(new Event("closeNewBoardModal"));
            localStorage.removeItem("newSheetLS");
        } catch (error) {
            if (currentRetry < 3) {
                ephemeralNotification(`Unable to send event on try ${currentRetry}. Retrying...`)
                currentRetry++;
                setTimeout(() => sendEventWithRetry(event), 1000);
            } 
            else if (currentRetry < 2){
                socket.send(JSON.stringify(subscription));
            }else {
                ephemeralNotification("Max retries reached. Unable to send event. Please try again later.")
            }
        }
    }

    // Listen event of created sheet, and trigger send event
    window.addEventListener("newSheetEvent", async function (e) {
        const newSheetContent = localStorage.getItem("newSheetLS");
        const encryptedSheet = encrypt(privKey, pubKey, newSheetContent);
        const privateSheet = {
            "content": encryptedSheet,
            "created_at": Math.floor(Date.now() / 1000),
            "kind": privateSheetKindNumber,
            "tags": [['p', pubKey]],
            "pubkey": pubKey,
        };
        currentRetry = 0;
        sendEventWithRetry(privateSheet);
    });

    // Listen event of created board, and trigger send event
    window.addEventListener("newBoardEvent", async function (e) {
        const newBoardContent = localStorage.getItem("newBoardLS");
        const encryptedBoard = encrypt(privKey, pubKey, newBoardContent);
        const privateBoard = {
            "content": encryptedBoard,
            "created_at": Math.floor(Date.now() / 1000),
            "kind": privateBoardKindNumber,
            "tags": [['p', pubKey]],
            "pubkey": pubKey,
        };
        currentRetry = 0;
        sendEventWithRetry(privateBoard);
    });

    // Listen event of created workspace, and trigger send event
    window.addEventListener("newWorkspaceEvent", async function (e) {
        const newBoardContent = localStorage.getItem("newWorkspaceLS");
        const encryptedBoard = encrypt(privKey, pubKey, newBoardContent);
        const privateBoard = {
            "content": encryptedBoard,
            "created_at": Math.floor(Date.now() / 1000),
            "kind": privateWorkspaceKindNumber,
            "tags": [['p', pubKey]],
            "pubkey": pubKey,
        };
        currentRetry = 0;
        sendEventWithRetry(privateBoard);
    });

})();

