

// New sheet form variables
const sheetCreationModal = document.getElementById('sheetCreationModal')
const newSheetForm = document.getElementById('newSheetForm')
const cancelAddNewSheet = document.getElementById('cancelAddNewSheet')
const newSheetSubmitButton = document.getElementById('newSheetSubmitButton')
const newSheetNameInput = document.getElementById('newSheetName')
const newSheetInputDescription = document.getElementById('newSheetInputDescription')
const newSheetInputTagsInput = document.getElementById('newSheetInputTags')
const boardReference = document.getElementById('boardReference')
const sheetModalIndicator = document.getElementById('sheetModalIndicator')
var linkedBoardId = ''
var newSheetHash = ''
var newSheetRevisionsAmount = 0

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

// hide add new sheet modal
cancelAddNewSheet.addEventListener("click", function () {
    hideNewSheetModal()
});

// hide add new sheet modal
closeAddNewSheet.addEventListener("click", function () {
    hideNewSheetModal()
});

// listen event that allow close new sheet modal when success on sending the event
window.addEventListener("closeNewSheetModal", function() {
    hideNewSheetModal()
});


// Launch Modal and fullfill inputs needed
function launchModalSheet(workspaceId, boardId, sheetHash) {

    // If sheet hash comes empty, means brand new sheet
    if (sheetHash === '') {
        newSheetHash = genHex(8)
        sheetModalIndicator.textContent = 'New Sheet'
        newSheetSubmitButton.textContent = 'Add Sheet'
        newSheetNameInput.value = ''
        newSheetInputDescription.value = ''
        newSheetInputTagsInput.value = ''
        newSheetRevisionsAmount = 0
     
        
    } else { // Existent sheet edition

        // target existen sheet and extract => title, description, and tags
        let sheetTargetted = document.getElementById(sheetHash)
        // Extract tags from sheet
        let sheetTargettedTagsContainer = sheetTargetted.querySelector('.sheetTagsContainer');
        let sheetTargettedTitle = sheetTargetted.querySelector('.sheetTitle').textContent
        let sheetTargettedDescription = sheetTargetted.querySelector('.sheetDescription').textContent
        
        newSheetHash = sheetHash
        sheetModalIndicator.textContent = 'Edit Sheet'
        newSheetSubmitButton.textContent = 'Confirm'
        newSheetNameInput.value = sheetTargettedTitle
        newSheetInputDescription.value = sheetTargettedDescription
        newSheetInputTagsInput.value = ExtractTags(sheetTargettedTagsContainer)

    }

    // get boardTitle with ID
    let targettedBoard = document.getElementById(boardId)
    let targettedBoardTitle = targettedBoard.querySelector('.boardTitle').textContent

    boardReference.textContent = targettedBoardTitle
    linkedBoardId = boardId
    workspaceHash = workspaceId

    showNewSheetModal()
    
};

// Submit sheet listener
newSheetForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const newSheetName = newSheetNameInput.value
    const newSheetInputTags = newSheetInputTagsInput.value
    const newSheetDescription = newSheetInputDescription.value

    //0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 description, 5 tags, 6 deadline, 7 at, 8 participants, 9 revisions
    const newSheetArrayed = [
        workspaceHash,
        linkedBoardId,
        newSheetHash,
        encodeURIComponent(newSheetName),
        encodeURIComponent(newSheetDescription),
        arrayTags(newSheetInputTags),
        'tomorrow',
        'now',
        '',
        newSheetRevisionsAmount
    ];

    if (newSheetName) {

        localStorage.setItem("newSheetLS", JSON.stringify(newSheetArrayed));
        const event = new Event("newSheetEvent");
        window.dispatchEvent(event);
        console.log(newSheetName);
        
    } else {
        ephemeralNotification("Sheet name cannot be empty")
    }
});