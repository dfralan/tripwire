(function () {

    // Define constants for different kinds of private data
    const privateDMKindNumber = 4
    const privateSheetKindNumber = 30003
    const privateBoardKindNumber = 30002
    const privateWorkspaceKindNumber = 30001

    // Check if the device is online before proceeding
    if (!navigator.onLine) {
        localStorage.removeItem("privKey");
        window.location.href = 'index.html';
        return;
    }

    // Define elliptic curve and cryptographic functions
    const ec = new elliptic.ec('secp256k1');// Instantiate the secp256k1 elliptic curve (the one used in Bitcoin)
    var { getSharedSecret, schnorr, utils } = nobleSecp256k1
    var crypto = window.crypto
    var getRand = size => crypto.getRandomValues(new Uint8Array(size))
    var sha256 = bitcoinjs.crypto.sha256

    // Hex dealing functions for data conversion
    function hexToBytes(hex) {
        return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    }

    // Same
    function base64ToHex(str) {
        var raw = atob(str);
        var result = '';
        var i; for (i = 0; i < raw.length; i++) {
            var hex = raw.charCodeAt(i).toString(16);
            result += (hex.length === 2 ? hex : '0' + hex);
        }
        return result;
    }

    // Encryption function
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

    // Decryption function
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

    function decryptArray(privkey, pubkey, inputArray) {
        // Create a new array to store the processed values
        const processedArray = [];
      
        // Process each element of the input array
        for (let i = 0; i < inputArray.length; i++) {
          const processedValue = decrypt(privkey, pubkey, inputArray[i])/* Process the inputArray[i] here */;
          const dURIProcessedValue = decodeURIComponent(processedValue)
          processedArray.push(processedValue);
        }
      
        return processedArray;
    }

    // Generate public key from private key
    function generatePublicKey(privateKeyHex) {
        const keyPair = ec.keyFromPrivate(privateKeyHex, 'hex');
        const publicKeyBuffer = keyPair.getPublic();
        const publicKeyHex = publicKeyBuffer.encode('hex', false).substring(2);
        const shortHexKey = publicKeyHex.slice(0, 64);
        return shortHexKey;
    }

    // Set up WebSocket connection and handle data communication
    function setupWebSocketConnection() {

        // Define relay server and fetch private key from local storage
        const relay = "wss://relay.damus.io";
        const privKey = localStorage.getItem("privKey")
        const pubKey = generatePublicKey(privKey);

        // Subscribe to own key for data updates
        var subId = bitcoinjs.ECPair.makeRandom().privateKey.toString("hex")
        var filter = { "authors": [pubKey] }
        var subscription = ["REQ", subId, filter]

        var socket = null; // Initialize socket variable

        function createWebSocket() {

            socket = new WebSocket(relay); // Initialize WebSocket connection

            // Handle incoming messages
            socket.addEventListener('message', async function (message) {
                var [type, subId, event] = JSON.parse(message.data);
                var { kind, content, tags } = event || {}
                if (!event || event === true) return
                console.log(event)
                if (kind === privateSheetKindNumber) {
                    content = await decrypt(privKey, event.pubkey, content)
                }
                let workspace = document.getElementById('workspace')
                let workspaceHash = workspace.getAttribute('data-workspace-hash')

                // Initialize arrays to store 'p' and 'x' tags
                let pTags = [];
                let dTags = [];
                let wsHash = [];
                let bHash = [];
                let sTitle = [];
                let ddLine = [];
                let xTags = [];

                // Iterate through the 'tags' array and separate 'p' and 'x' tags
                for (const [tagType, tagValue] of tags) {
                    if (tagType === 'p') {
                        pTags.push(tagValue);
                    } else if (tagType === 'd') {
                        dTags.push(tagValue);
                    } else if (tagType === 'wsHash') {
                        wsHash.push(tagValue);
                    } else if (tagType === 'bHash') {
                        bHash.push(tagValue);
                    } else if (tagType === 'sTitle') {
                        sTitle.push(tagValue);
                    } else if (tagType === 'ddLine') {
                        ddLine.push(tagValue);
                    } else if (tagType === 'x') {
                        xTags.push(tagValue);
                    }
                }

                console.log('pTags:', wsHash[0]);
                console.log('xTags:', xTags);



                // Private board event handler
                if (kind === privateBoardKindNumber) {

                    console.log('createdBoard')
                    console.log(xTags)

                    var workspaceIsReady = true
                    let eventWorkspaceHash = wsHash[0]
                    let eventBoardId = dTags[0]
                    let eventTitle = decodeURIComponent(decrypt(privKey, event.pubkey, sTitle[0]))
                    let eventTagsArray = decryptArray(privKey, event.pubkey, xTags)
                    let eventDeadline = ddLine[0]
                    let eventTimeCreation = event.created_at
                    let eventParticipants = event.pubkey

                    function boardCreationHandler() {
                        constructBoard(eventWorkspaceHash, eventBoardId, eventTitle, eventTagsArray, eventDeadline, eventTimeCreation, eventParticipants);
                        if (!workspaceIsReady) {
                            c
                            window.removeEventListener(eventWorkspaceHash, boardCreationHandler);
                        }
                        workspaceIsReady = true
                    }
                    if (eventWorkspaceHash === workspaceHash) { // Event is from current workspace
                        workspaceIsReady = true
                        boardCreationHandler()
                    } else { // Event is not from current workspace
                        workspaceIsReady = false
                        window.addEventListener(eventWorkspaceHash, boardCreationHandler);
                    }
                }

                // Private sheet event handler
                if (kind === privateSheetKindNumber) {

                    var boardIsReady = true
                    let eventWorkspaceHash = wsHash[0]
                    let eventBoardId = bHash[0]
                    let eventSheetId = dTags[0]
                    let eventTitle = decodeURIComponent(decrypt(privKey, event.pubkey, sTitle[0]))
                    let eventDescription = decodeURIComponent(content)
                    let eventTagsArray = xTags
                    let eventDeadline = ddLine[0]
                    let eventTimeCreation = event.created_at
                    let eventParticipants = event.pubkey

                    function sheetCreationHandler() {
                        constructSheet(eventWorkspaceHash, eventBoardId, eventSheetId, eventTitle, eventDescription, eventTagsArray, eventDeadline, eventTimeCreation, eventParticipants);
                        if (!boardIsReady) { // Remove the event listener after it's been executed if applies
                            window.removeEventListener(eventBoardId, sheetCreationHandler);
                        }
                        boardIsReady = true
                    }
                    if (eventWorkspaceHash === workspaceHash && document.getElementById(eventBoardId)) {
                        sheetCreationHandler()
                    } else {
                        boardIsReady = false
                        window.addEventListener(eventBoardId, sheetCreationHandler);
                    }
                }

            })

            // Handle WebSocket close events
            socket.addEventListener('close', function (event) {
                if (!event.wasClean) {
                    console.error(`WebSocket connection was abruptly closed, code: ${event.code}, reason: ${event.reason}`);
                    ephemeralNotification("WebSocket connection was abruptly closed, attempting to reconnect...");
                    setTimeout(createWebSocket, 2000);
                }
            });

            // Sign event data for secure communication
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

            // Send event with retry
            async function sendEventWithRetry(event, maxRetries = 3, retryDelay = 1000) {
                let retries = 0;

                while (retries < maxRetries) {
                    try {
                        const signedEvent = await getSignedEvent(event, privKey);
                        socket.send(JSON.stringify(["EVENT", signedEvent]));
                        ephemeralNotification("Board created successfully.");
                        localStorage.removeItem("newSheetLS");
                        localStorage.removeItem("newBoardLS");
                        window.dispatchEvent(new Event("closeNewBoardModal"));
                        window.dispatchEvent(new Event("closeNewSheetModal"));
                        return;
                    } catch (error) {
                        retries++;
                        if (retries < maxRetries) {
                            ephemeralNotification(`Unable to send event on attempt ${retries}. Retrying...`);
                            await sleep(retryDelay);
                        } else {
                            ephemeralNotification("Max retries reached. Unable to send event. Please try again later.");
                        }
                    }
                }
            }

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }


            // Function to append X tags to event with encryption handling
            function createXTagsFromArray(tagArray) {
                return tagArray.map(tag => ['x', encrypt(privKey, pubKey, tag)]);
            }

            // Function to append mentions/participants to event
            function createPTagsFromArray(tagArray) {
                return tagArray.map(tag => ['p', tag]);
            }

            // Listen for the local event of creating a new sheet that trigger event compose and send
            //0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 content, 5 tags, 6 deadline, 7 at, 8 participants, 9 revisions
            window.addEventListener("newSheetEvent", async function (e) {
                const newSheetContent = localStorage.getItem("newSheetLS");
                let newSheetLS = JSON.parse(newSheetContent);

                const workspaceHash = newSheetLS[0]
                const newSheetLinkedBoardHash = newSheetLS[1]
                const newSheetHash = newSheetLS[2]
                const newSheetEncryptedTitle = encrypt(privKey, pubKey, newSheetLS[3]);
                const newSheetEncryptedContent = encrypt(privKey, pubKey, newSheetLS[4]);
                const newSheetXTags = JSON.parse(newSheetLS[5]);
                const newSheetDeadline = newSheetLS[6]
                const newSheetCreation = Math.floor(Date.now() / 1000)
                //const mentions = newSheetLS[8]
                
                // Private sheet composing
                const privateSheet = {
                    "content": newSheetEncryptedContent,
                    "created_at": newSheetCreation,
                    "kind": privateSheetKindNumber,
                    "tags": [
                        ['p', pubKey], 
                        ['d', newSheetHash], // 'd' tag allows to replace existent event with same: 'pubkey', 'kind' and 'd' tag.
                        ['wsHash', workspaceHash],
                        ['bHash', newSheetLinkedBoardHash],
                        ['sTitle', newSheetEncryptedTitle],
                        ['ddLine', newSheetDeadline],
                        ...createXTagsFromArray(newSheetXTags),
                        //...createPTagsFromArray(mentions)
                    ],
                    "pubkey": pubKey,
                };
                currentRetry = 0;
                sendEventWithRetry(privateSheet);
            });

            // Listen for the local event of creating a new BOARD that trigger event compose and send
            //0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
            window.addEventListener("newBoardEvent", async function (e) {
                const newBoardContent = localStorage.getItem("newBoardLS");
                let newBoardLS = JSON.parse(newBoardContent);

                const workspaceHash = newBoardLS[0]
                const newBoardHash = newBoardLS[1]
                const newBoardEncryptedTitle = encrypt(privKey, pubKey, newBoardLS[2]);
                const newBoardXTags = JSON.parse(newBoardLS[3]);
                const newBoardDeadline = newBoardLS[4]
                const newBoardCreation = Math.floor(Date.now() / 1000)
                //const mentions = newSheetLS[6]
                
                const privateBoard = {
                    "content": '',
                    "created_at": newBoardCreation,
                    "kind": privateBoardKindNumber,
                    "tags": [
                        ['p', pubKey], 
                        ['d', newBoardHash], // 'd' tag allows to replace existent event with same: 'pubkey', 'kind' and 'd' tag.
                        ['wsHash', workspaceHash],
                        ['sTitle', newBoardEncryptedTitle],
                        ['ddLine', newBoardDeadline],
                        ...createXTagsFromArray(newBoardXTags),
                        //...createPTagsFromArray(mentions)
                    ],
                    "pubkey": pubKey,
                };
                currentRetry = 0;
                sendEventWithRetry(privateBoard);
            });

            // Handle WebSocket connection open event
            socket.addEventListener('open', async function (e) {
                socket.send(JSON.stringify(subscription));
                ephemeralNotification(`Connected to websocket.`)
            });
        }

        // Initialize the WebSocket connection
        createWebSocket();
    }

    // Call the function to set up the WebSocket connection
    setupWebSocketConnection();

})();

