(function () {

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
    const relay = "wss://relay.damus.io";
    var socket = new WebSocket(relay);
    const privKey = localStorage.getItem("privKey")
    const pubKey = generatePublicKey(privKey);


    // Listen nostr events
    socket.addEventListener('message', async function (message) {
        var [type, subId, event] = JSON.parse(message.data);
        var { kind, content } = event || {}
        if (!event || event === true) return
        console.log('message:', event)
        if (kind === 4) {
            content = await decrypt(privKey, event.pubkey, content)
        }
        console.log(`created at = ${event.created_at}`)
        const parsedContent = JSON.parse(content);

        // Usage example
        const tags = ['+5493412293515', 'john@lotus.com', 'lotusmotors.com'];
        console.log(`tags are ${parsedContent[4]}`)
        createLi(parsedContent[0], decodeURIComponent(parsedContent[2]), decodeURIComponent(parsedContent[3]), parsedContent[4], parsedContent[1], event.created_at);
        window.dispatchEvent(new Event("tripChange"));
    })

    // Subscribe to myself key
    var subId = bitcoinjs.ECPair.makeRandom().privateKey.toString("hex")
    var filter = { "authors": [pubKey] }
    var subscription = ["REQ", subId, filter]

    socket.addEventListener('open', async function (e) {
        ephemeralNotification(`Connection succesfully.`)
        socket.send(JSON.stringify(subscription));
    })

    // Listen on websocket close
    socket.addEventListener('close', function (event) {
        if (event.wasClean) {
            console.log(`WebSocket connection closed cleanly, code: ${event.code}, reason: ${event.reason}`);
            socket.send(JSON.stringify(subscription));
        } else {
            socket.send(JSON.stringify(subscription));
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
            localStorage.removeItem("latestNewBoard");
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

    // Listen application event of created board, and trigger send event with board content
    window.addEventListener("latestNewBoardCreated", async function (e) {
        const boardContent = localStorage.getItem("latestNewBoard", newBoardInputName);
        const message = boardContent;
        const encrypted = encrypt(privKey, pubKey, message);
        const event2 = {
            "content": encrypted,
            "created_at": Math.floor(Date.now() / 1000),
            "kind": 4,
            "tags": [['p', pubKey], ['t', "hexHashBoard"]],
            "pubkey": pubKey,
        };
        currentRetry = 0;
        sendEventWithRetry(event2);
    });

})();

