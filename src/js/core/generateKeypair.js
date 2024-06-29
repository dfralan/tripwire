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

genKeyButton.addEventListener('click', function() {
    var keys = generateKeypair();
    document.getElementById('generatedPrivKey').textContent = `Clave Privada: ${keys.privateKey}`;
    document.getElementById('generatedPublicKey').textContent = `Clave Pública: ${keys.publicKey}`;
});