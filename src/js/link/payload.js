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

    function generateKeypair(){
        var { getSharedSecret, schnorr, utils } = nobleSecp256k1
        var crypto = window.crypto
        var getRand = size => crypto.getRandomValues(new Uint8Array (size))
        var sha256 = bitcoinjs.crypto.sha256
        var keypair = bitcoinjs.ECPair.makeRandom()
        var privkey = keypair.privateKey.toString("hex")
        var pubkey = keypair.publicKey.toString("hex")
        pubkey = pubkey.substring(2)
        console.log( pubKey);
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
                content = await decrypt(privKey, event.pubkey, content)

                // Initialize arrays to store 'p' and 'x' tags
                let pTags = [];
                let dTag = [];
                let rTag = [];
                let wsHash = [];
                let bHash = [];
                let sHash = [];
                let sTitle = [];
                let ddLine = [];
                let xTags = [];

                // Iterate through the 'tags' array and separate 'p' and 'x' tags
                for (const [tagType, tagValue] of tags) {
                    if (tagType === 'p') {
                        pTags.push(tagValue);
                    } else if (tagType === 'd') {
                        dTag.push(tagValue);
                    } else if (tagType === 'wsHash') {
                        wsHash.push(tagValue);
                    } else if (tagType === 'bHash') {
                        bHash.push(tagValue);
                    } else if (tagType === 'sHash') {
                        sHash.push(tagValue);
                    } else if (tagType === 'sTitle') {
                        sTitle.push(tagValue);
                    } else if (tagType === 'ddLine') {
                        ddLine.push(tagValue);
                    } else if (tagType === 'x') {
                        xTags.push(tagValue);
                    } else if (tagType === 'r') {
                        rTag.push(tagValue);
                    }
                }

                // Private board event handler
            if (kind === privateWorkspaceKindNumber) {

                // Hide the first time window
                const firstTimeWindow = document.getElementById("newDashboardModal");
                firstTimeWindow.remove();

                // Show new board button
                document.getElementById('createBoardButton').classList.remove('display-none')

                // Set data-workspace-hash to current workspace
                const dashboardWorkspace = document.getElementById("workspace");
                dashboardWorkspace.setAttribute("data-workspace-hash", wsHash[0]);

                let eventWorkspaceHash = wsHash[0]
                let eventTitle = decodeURIComponent(decrypt(privKey, event.pubkey, sTitle[0]))
                let eventDescription = decodeURIComponent(content)
                let eventTagsArray = decryptArray(privKey, event.pubkey, xTags)
                let eventDeadline = ddLine[0]
                let eventTimeCreation = event.created_at
                let eventParticipants = event.pubkey
                let revisionsAmount = rTag[0]
                let eventSocketHash = dTag[0]

                function workspaceCreationHandler() {
                    const newWorkspaceDecryptedArrayed = [eventWorkspaceHash, eventTitle, eventDescription, eventTagsArray, eventDeadline, eventTimeCreation, eventParticipants, revisionsAmount, eventSocketHash]
                    localStorage.setItem(eventWorkspaceHash, JSON.stringify(newWorkspaceDecryptedArrayed));
                    constructWorkspace(eventWorkspaceHash);

                    console.log(`ABOUT TO CONSTRUCT WORKSPACE WITH THIS WS HASH ${eventWorkspaceHash}`)
                }
                workspaceCreationHandler()

                let workspace = document.getElementById('workspace')
            }

                // Private board event handler
                if (kind === privateBoardKindNumber) {

                    let eventWorkspaceHash = wsHash[0]
                    let eventBoardId = bHash[0]
                    let eventTitle = decodeURIComponent(decrypt(privKey, event.pubkey, sTitle[0]))
                    let eventDescription = decodeURIComponent(content)
                    let eventTagsArray = decryptArray(privKey, event.pubkey, xTags)
                    let eventDeadline = ddLine[0]
                    let eventTimeCreation = event.created_at
                    let eventParticipants = event.pubkey
                    let revisionsAmount = rTag[0]
                    let eventSocketHash = dTag[0]

                    var workspaceIsReady = false 

                    console.log(`KIND BOARD EVENT ENTERED: WS HASH => ${eventWorkspaceHash}`)

                    function boardCreationHandler() {
                        const newBoardDecryptedArrayed = [eventWorkspaceHash, eventBoardId, eventTitle, eventDescription, eventTagsArray, eventDeadline, eventTimeCreation, eventParticipants, revisionsAmount, eventSocketHash]
                        localStorage.setItem(eventBoardId, JSON.stringify(newBoardDecryptedArrayed));
                        constructBoard(eventBoardId);

                        if (!workspaceIsReady) {
                            window.removeEventListener(eventWorkspaceHash, boardCreationHandler);
                        }
                    }
                    
                    let workspaceHash = workspace.getAttribute('data-workspace-hash')
                    if (eventWorkspaceHash === workspaceHash) { // Event is from current workspace
                        workspaceIsReady = true
                        boardCreationHandler()
                    } else { // Event is not from current workspace
                        workspaceIsReady = false
                        console.log(`WORKSPACE IS NOT READY YET, LISTEN FOR CREATION EVENT WITH THIS NAME ${eventWorkspaceHash}`)
                        window.addEventListener(eventWorkspaceHash, function() {
                            boardCreationHandler()
                        });
                    }
                }

                // Private sheet event handler
                if (kind === privateSheetKindNumber) {

                    var boardIsReady = true
                    let eventWorkspaceHash = wsHash[0]
                    let eventBoardId = bHash[0]
                    let eventSheetId = sHash[0]
                    let eventTitle = decodeURIComponent(decrypt(privKey, event.pubkey, sTitle[0]))
                    let eventDescription = decodeURIComponent(content)
                    let eventTagsArray = decryptArray(privKey, event.pubkey, xTags)
                    let eventDeadline = ddLine[0]
                    let eventTimeCreation = event.created_at
                    let eventParticipants = event.pubkey
                    let revisionsAmount = rTag[0]
                    let eventSocketHash = dTag[0]
                    
                    document.dispatchEvent(new Event(eventSocketHash));

                    function sheetCreationHandler() {
                        const newSheetDecryptedArrayed = [eventWorkspaceHash, eventBoardId, eventSheetId, eventTitle, eventDescription, eventTagsArray, eventDeadline, eventTimeCreation, eventParticipants, revisionsAmount, eventSocketHash];
                        localStorage.setItem(`descypher-${eventSheetId}`, JSON.stringify(newSheetDecryptedArrayed));
                        constructSheet(eventSheetId)
                        
                        if (!boardIsReady) { // Remove the event listener after it's been executed if applies
                            window.removeEventListener(eventBoardId, sheetCreationHandler);
                        }
                        boardIsReady = true
                    }
                    if (eventWorkspaceHash === workspaceHash && document.getElementById(eventBoardId)) {
                        boardIsReady = true
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

            // Listen for the local event of creating a new WORKSPACE that trigger event compose and send
            //0 workspaceId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants, 7 revisions, 8 hash event
            function handleNewWorkspaceEvent(e) {
                const newWorkspaceEventHash = localStorage.getItem("newWorkspaceLS");
                const newWorkspaceContent = localStorage.getItem(newWorkspaceEventHash);
                let newWorkspaceLS = JSON.parse(newWorkspaceContent);
            
                const workspaceHash = newWorkspaceLS[0];
                const newWorkspaceEncryptedTitle = encrypt(privKey, pubKey, newWorkspaceLS[1]);
                const newWorkspaceEncryptedContent = encrypt(privKey, pubKey, newWorkspaceLS[2]);
                const newWorkspaceXTags = JSON.parse(newWorkspaceLS[3]);
                const newWorkspaceDeadline = newWorkspaceLS[4];
                const newWorkspaceCreation = Math.floor(Date.now() / 1000);
                //const mentions = newWorkspaceLS[6];
                const newWorkspaceRevisions = (parseInt(newWorkspaceLS[7]) + 1).toString();
                const eventSocketHashAgain = newWorkspaceLS[8];
            
                const privateWorkspace = {
                    "content": newWorkspaceEncryptedContent,
                    "created_at": newWorkspaceCreation,
                    "kind": privateWorkspaceKindNumber,
                    "tags": [
                        ['p', pubKey], 
                        ['d', eventSocketHashAgain], // 'd' tag allows to replace existent event with same: 'pubkey', 'kind' and 'd' tag.
                        ['wsHash', workspaceHash],
                        ['sTitle', newWorkspaceEncryptedTitle],
                        ['ddLine', newWorkspaceDeadline],
                        ...createXTagsFromArray(newWorkspaceXTags),
                        //...createPTagsFromArray(mentions);
                        ['r', newWorkspaceRevisions],
                    ],
                    "pubkey": pubKey,
                };
                
                currentRetry = 0;
                sendEventWithRetry(privateWorkspace);
                
                document.addEventListener(eventSocketHashAgain, function(event) {
                    window.dispatchEvent(new Event("closeNewWorkspaceModal"));
                    localStorage.removeItem("newWorkspaceLS");
                    ephemeralNotification("Workspace created successfully.");
                    document.removeEventListener("newWorkspaceEvent", handleNewWorkspaceEvent);
                });
            }
            
            // Listen for the local event of creating a new BOARD that triggers the event composition and sending
            window.addEventListener("newWorkspaceEvent", handleNewWorkspaceEvent);

            // Listen for the local event of creating a new sheet that trigger event compose and send
            //0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 content, 5 tags, 6 deadline, 7 at, 8 participants, 9 revisions
            function handleNewSheetEvent(e) {
                const newSheetEventHash = localStorage.getItem("newSheetLS");
                const newSheetContent = localStorage.getItem(newSheetEventHash);
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
                const newSheetRevisions = (parseInt(newSheetLS[9]) + 1).toString()
                const eventSocketHashAgain = newSheetLS[10]
                
                // Private sheet composing
                const privateSheet = {
                    "content": newSheetEncryptedContent,
                    "created_at": newSheetCreation,
                    "kind": privateSheetKindNumber,
                    "tags": [
                        ['p', pubKey], 
                        ['p', '3cede65c95e85ccd630f28e251e468404de54d7da099f9811099c31d743d88e1'], 
                        ['d', eventSocketHashAgain], // 'd' tag allows to replace existent event with same: 'pubkey', 'kind' and 'd' tag.
                        ['wsHash', workspaceHash],
                        ['bHash', newSheetLinkedBoardHash],
                        ['sHash', newSheetHash],
                        ['sTitle', newSheetEncryptedTitle],
                        ['ddLine', newSheetDeadline],
                        ...createXTagsFromArray(newSheetXTags),
                        //...createPTagsFromArray(mentions)
                        ['r', newSheetRevisions],
                    ],
                    "pubkey": pubKey,
                };
                currentRetry = 0;
                sendEventWithRetry(privateSheet);
                document.addEventListener(eventSocketHashAgain, function(event) {
                    window.dispatchEvent(new Event("closeNewSheetModal"));
                    localStorage.removeItem("newSheetLS");
                    ephemeralNotification("Sheet created successfully.");
                    document.removeEventListener("newSheetEvent", handleNewSheetEvent);
                });
            };

            // Listen for the local event of creating a new SHEET that triggers the event composition and sending
            window.addEventListener("newSheetEvent", handleNewSheetEvent);

            // Listen for the local event of creating a new BOARD that trigger event compose and send
            //0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
            function handleNewBoardEvent(e) {
                const newBoardEventHash = localStorage.getItem("newBoardLS");
                const newBoardContent = localStorage.getItem(newBoardEventHash);
                let newBoardLS = JSON.parse(newBoardContent);
            
                const workspaceHash = newBoardLS[0];
                const newBoardHash = newBoardLS[1];
                const newBoardEncryptedTitle = encrypt(privKey, pubKey, newBoardLS[2]);
                const newBoardEncryptedContent = encrypt(privKey, pubKey, newBoardLS[3]);
                const newBoardXTags = JSON.parse(newBoardLS[4]);
                const newBoardDeadline = newBoardLS[5];
                const newBoardCreation = Math.floor(Date.now() / 1000);
                //const mentions = newBoardLS[7];
                const newBoardRevisions = (parseInt(newBoardLS[8]) + 1).toString();
                const eventSocketHashAgain = newBoardLS[9];
            
                const privateBoard = {
                    "content": newBoardEncryptedContent,
                    "created_at": newBoardCreation,
                    "kind": privateBoardKindNumber,
                    "tags": [
                        ['p', pubKey], 
                        ['d', eventSocketHashAgain], // 'd' tag allows to replace existent event with same: 'pubkey', 'kind' and 'd' tag.
                        ['wsHash', workspaceHash],
                        ['bHash', newBoardHash], 
                        ['sTitle', newBoardEncryptedTitle],
                        ['ddLine', newBoardDeadline],
                        ...createXTagsFromArray(newBoardXTags),
                        //...createPTagsFromArray(mentions);
                        ['r', newBoardRevisions],
                    ],
                    "pubkey": pubKey,
                };
                
                currentRetry = 0;
                sendEventWithRetry(privateBoard);
                
                document.addEventListener(eventSocketHashAgain, function(event) {
                    window.dispatchEvent(new Event("closeNewBoardModal"));
                    localStorage.removeItem("newBoardLS");
                    ephemeralNotification("Board created successfully.");
                    document.removeEventListener("newBoardEvent", handleNewBoardEvent);
                });
            }
            
            // Listen for the local event of creating a new BOARD that triggers the event composition and sending
            window.addEventListener("newBoardEvent", handleNewBoardEvent);
            

            

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

