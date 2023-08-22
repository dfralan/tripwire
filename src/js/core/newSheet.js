// New sheet form variables
const sheetCreationModal = document.getElementById('sheetCreationModal')
const newSheetForm = document.getElementById('newSheetForm')
const cancelAddNewSheet = document.getElementById('cancelAddNewSheet')
const newSheetSubmitButton = document.getElementById('newSheetSubmitButton')
const newSheetNameInput = document.getElementById('newSheetName')
const newSheetInputDescriptionInput = document.getElementById('newSheetInputDescription')
const newSheetInputTagsInput = document.getElementById('newSheetInputTags')
const boardReference = document.getElementById('boardReference')
const sheetModalIndicator = document.getElementById('sheetModalIndicator')
var linkedBoardId = ''
var newSheetHash = ''

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
function launchModalSheet(workspaceId, boardId, boardTitle, sheetHash, sheetTitle, sheetDescription, sheetTags) {

    newSheetHash = (sheetHash === '') ? genHex(8) : sheetHash
    linkedBoardId = boardId
    workspaceHash = workspaceId
    sheetModalIndicator.textContent = (sheetHash === '') ? 'New Sheet' : 'Edit Sheet'
    boardReference.textContent = boardTitle
    newSheetSubmitButton.textContent = (sheetHash === '') ? 'Add Sheet' : 'Confirm'
    newSheetNameInput.value = sheetTitle
    newSheetInputDescriptionInput.value = sheetDescription
    newSheetInputTagsInput.value = sheetTags

    showNewSheetModal()
    
};

// Submit sheet listener
newSheetForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const newSheetName = newSheetNameInput.value
    const newSheetInputTags = newSheetInputTagsInput.value
    const newSheetInputDescription = newSheetInputDescriptionInput.value

    //0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 description, 5 tags, 6 deadline, 7 at, 8 participants,
    const newSheetArrayed = [
        workspaceHash,
        linkedBoardId,
        newSheetHash,
        encodeURIComponent(newSheetName),
        encodeURIComponent(newSheetInputDescription),
        arrayTags(newSheetInputTags),
        'tomorrow',
        'now',
        'onlyme',
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
