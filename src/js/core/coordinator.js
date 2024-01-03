// Variables to handle sheet creation
const coordinatorModal = document.getElementById('coordinatorModal')
const confirmationLogoutModal = document.getElementById('confirmationLogoutModal')
const coordinatorPubkey = document.getElementById('coordinatorPubkey')

document.addEventListener('pubKeySetted', function () {
    let pbk = localStorage.getItem('pubKey');
    coordinatorPubkey.textContent = pbk
});

function copyPublicKeyToClipboard() {
    let pbk = localStorage.getItem('pubKey');
    let tempInput = document.createElement('input');
    tempInput.value = pbk;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    ephemeralNotification("Public key copied")
}

function copyPrivateKeyToClipboard() {
    let pvk = localStorage.getItem('privKey');
    let tempInput = document.createElement('input');
    tempInput.value = pvk;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    ephemeralNotification("Private key copied")
}

// show add new board modal
function toggleCoordinatorModal() {
    if (coordinatorModal.classList.contains("display-none")){
        coordinatorModal.classList.remove("display-none");
    } else {
        coordinatorModal.classList.add("display-none");
    }
    
}

// show add new board modal
function toggleConfirmationLogoutModal() {
    if (confirmationLogoutModal.classList.contains("display-none")){
        confirmationLogoutModal.classList.remove("display-none");
    } else {
        confirmationLogoutModal.classList.add("display-none");
    }
    
}