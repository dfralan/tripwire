function generateKeypair() {
    var { getSharedSecret, schnorr, utils } = nobleSecp256k1
    var crypto = window.crypto
    var getRand = size => crypto.getRandomValues(new Uint8Array(size))
    var sha256 = bitcoinjs.crypto.sha256
    var keypair = bitcoinjs.ECPair.makeRandom()
    var privkey = keypair.privateKey.toString("hex")
    var pubkey = keypair.publicKey.toString("hex")
    pubkey = pubkey.substring(2)
    return { privateKey: privkey, publicKey: pubkey };
}

let genKeyButton = document.getElementById('genKeyButton')
let runKeyButton = document.getElementById('runKeyButton')
let rContainer = document.getElementById('rContainer')


// Get the SVG container element
let svg = document.getElementById("svgContainer");

// Define the dimensions and other properties of each rectangle
let rectWidth = 10;
let rectHeight = 10;
let startX = 0;
let startY = 0;
let spacing = 0; // Spacing between rectangles


function assignCharsToRects(inputStr) {
    
    
    // Calculamos el número de rectángulos que caben a lo largo y ancho del cuadrado de 80x80
    let numCols = 8; // Número de columnas (80 / rectWidth)
    let numRows = 8; // Número de filas (80 / rectHeight)
    
    // Obtenemos el contenedor SVG
    let svg = document.getElementById("svgContainer");
    
    // Iteramos sobre la cadena de entrada
    for (let i = 0; i < inputStr.length; i++) {
        // Calculamos las coordenadas x e y para cada rectángulo
        let col = i % numCols; // Columna actual
        let row = Math.floor(i / numCols); // Fila actual
        
        let x = startX + col * (rectWidth + spacing);
        let y = startY + row * (rectHeight + spacing);
        
        // Creamos un elemento <rect>
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", rectWidth);
        rect.setAttribute("height", rectHeight);
        rect.setAttribute("fill", `#${inputStr[0]+inputStr[1]+inputStr[2]+inputStr[3]+inputStr[4]+inputStr[0]}`);
        svg.appendChild(rect);
    }
    
}

function printKeys(){
    var keys = generateKeypair();
    document.getElementById('generatedPrivKey').textContent = `Clave Privada: ${keys.privateKey}`;
    document.getElementById('generatedPublicKey').textContent = `Clave Pública: ${keys.publicKey}`;
    assignCharsToRects(keys.publicKey);


    runKeyButton.addEventListener('click', function() {
        localStorage.setItem("privKey", keys.privateKey);
        window.location.href = 'dashboard.html';
    }); 
}

printKeys()

genKeyButton.addEventListener('click', function() {
    printKeys()
});

