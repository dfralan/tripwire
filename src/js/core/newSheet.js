
// New sheet form variables
const sheetCreationModal = document.getElementById('sheetCreationModal')
const newSheetForm = document.getElementById('newSheetForm')
const newSheetSubmitButton = document.getElementById('newSheetSubmitButton')
const newSheetNameInput = document.getElementById('newSheetName')
const newSheetInputDescription = document.getElementById('newSheetInputDescription')
const newSheetInputTags = document.getElementById('newSheetInputTags')
const boardReference = document.getElementById('boardReference')
const sheetModalIndicator = document.getElementById('sheetModalIndicator')
// workspaceHash already declared in newboard.js file
var boardHash = ''
var newSheetHash = ''
var existentSheetLS = ''
var sheetRevisionsAmount = ''
var sheetEventHash = ''

// show add new sheet modal
function showNewSheetModal(){
    sheetCreationModal.classList.add("display-flex");
    sheetCreationModal.classList.remove("display-none");
}

// hide add new sheet modal
function hideNewSheetModal(){
    sheetCreationModal.classList.add("display-none");
    sheetCreationModal.classList.remove("display-flex");
}

// listen event that allow close new sheet modal when success on sending the event
//0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 content, 5 tags, 6 deadline, 7 at, 8 participants, 9 revisions
window.addEventListener("closeNewSheetModal", function() {
    hideNewSheetModal()
});

// Launch Modal and fullfill inputs needed
function launchModalSheet(boardId, sheetHash) {

    const actualWorkspace = document.getElementById("workspace");
    var actualWorkspaceHash = actualWorkspace.getAttribute("data-workspace-hash");

    // If sheet hash comes empty, means brand new sheet
    if (sheetHash === '') {
        newSheetHash = genHex(12)
        // workspaceHash does not apply
        newSheetNameInput.value = ''
        newSheetInputDescription.value = ''
        newSheetInputTags.value = ''
        sheetModalIndicator.textContent = 'New Sheet'
        newSheetSubmitButton.textContent = 'Add Sheet'
        sheetRevisionsAmount = '-1'
        sheetEventHash = genHex(20)

    } else { // Existent sheet edition

        existentSheetLS = JSON.parse(localStorage.getItem(`descypher-${sheetHash}`))
        newSheetHash = existentSheetLS[2]
        newSheetNameInput.value = existentSheetLS[3]
        newSheetInputDescription.value = existentSheetLS[4]
        newSheetInputTags.value = arrayToCommaString(existentSheetLS[5])
        sheetModalIndicator.textContent = 'Edit Sheet'
        newSheetSubmitButton.textContent = 'Confirm'
        sheetRevisionsAmount = existentSheetLS[9]
        console.log(`existent sheet revisions amount ${sheetRevisionsAmount}`)
        sheetEventHash = existentSheetLS[10]
    }
    boardHash = boardId
    let targettedBoardLS = localStorage.getItem(boardId)
    let boardTitleParse = JSON.parse(targettedBoardLS)
    boardReference.textContent = boardTitleParse[2]
    workspaceHash = actualWorkspaceHash
    showNewSheetModal()
    
};

// Submit sheet listener
newSheetForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const newSheetName = newSheetNameInput.value
    const newSheetDescription = newSheetInputDescription.value
    const newSheetTags = newSheetInputTags.value

    //0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 description, 5 tags, 6 deadline, 7 at, 8 participants, 9 revisions
    const newSheetArrayed = [
        workspaceHash,
        boardHash,
        newSheetHash,
        encodeURIComponent(newSheetName),
        encodeURIComponent(newSheetDescription),
        arrayTags(newSheetTags),
        'tomorrow',
        'now',
        'onlyme',
        sheetRevisionsAmount,
        sheetEventHash
    ];

    
    console.log('sheet hash from new sheet in newsheetfile')
    console.log(newSheetHash)

    if (newSheetName) {

        localStorage.setItem("newSheetLS", newSheetHash);
        localStorage.setItem(newSheetHash, JSON.stringify(newSheetArrayed));
        const event = new Event("newSheetEvent");
        window.dispatchEvent(event);
        
    } else {
        ephemeralNotification("Sheet name cannot be empty")
    }
});