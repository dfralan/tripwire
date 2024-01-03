
// Variables to handle sheet creation
const boardCreationModal = document.getElementById('boardCreationModal')
const newBoardForm = document.getElementById('newBoardForm');
const newBoardSubmitButton = document.getElementById('newBoardSubmitButton')
const newBoardNameInput = document.getElementById('newBoardName')
const newBoardInputDescription = document.getElementById('newBoardInputDescription')
const newBoardInputTags = document.getElementById('newBoardInputTags')
// here go mentions but for now only private boards ()
const boardModalIndicator = document.getElementById('boardModalIndicator')
// Deadline
const datePickerDD = document.getElementById('datePickerDD');
const timePickerDD = document.getElementById('timePickerDD');

var workspaceHash = '' 
var newBoardHash = ''
var existentBoardLS = ''
var boardRevisionsAmount = ''
var boardEventHash = ''

// show add new board modal
function showNewBoardModal() {
    boardCreationModal.classList.remove("display-none");
}

// hide add new board modal
function hideNewBoardModal() {
    boardCreationModal.classList.add("display-none");
}

// Launch Modal and fullfill inputs needed
function launchModalBoard(boardId) {

    const actualWorkspace = document.getElementById("workspace");
    var actualWorkspaceHash = actualWorkspace.getAttribute("data-workspace-hash");

    // If board hash comes empty, means brand new board
    if (boardId === '') {
        newBoardHash = genHex(12)
        workspaceHash = actualWorkspaceHash
        newBoardNameInput.value = ''
        newBoardInputDescription.value = ''
        newBoardInputTags.value = ''
        boardModalIndicator.textContent = 'New Board'
        newBoardSubmitButton.textContent = 'Create Board'
        boardRevisionsAmount = '-1'
        boardEventHash = genHex(20)
        datePickerDD.value = `${''}-${''}-${''}`;
        timePickerDD.value = `${''}:${''}`;

    } else { // Existent board edition

        existentBoardLS = JSON.parse(localStorage.getItem(boardId))
        workspaceHash = existentBoardLS[0]
        newBoardHash = existentBoardLS[1]
        newBoardNameInput.value = existentBoardLS[2]
        newBoardInputDescription.value = existentBoardLS[3]
        newBoardInputTags.value = arrayToCommaString(existentBoardLS[4])
        console.log(existentBoardLS[4])
        boardModalIndicator.textContent = 'Edit Board'
        newBoardSubmitButton.textContent = 'Confirm'
        boardRevisionsAmount = existentBoardLS[8]
        boardEventHash = existentBoardLS[9]
        //datePickerDD.value = getDateTimeFromTimestamp(existentBoardLS[5])[0]
        //timePickerDD.value = getDateTimeFromTimestamp(existentBoardLS[5])[1]
    }

    showNewBoardModal()

}

// Submit board new listener
newBoardForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const newBoardName = newBoardNameInput.value
    const newBoardDescription = newBoardInputDescription.value
    const newBoardTags = newBoardInputTags.value

    // deadline values
    //const selectedDate = datePickerDD.value;
    //const selectedTime = timePickerDD.value;
    //const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    //const boardDeadline = combinedDateTime.getTime();
    //0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
    
    const newBoardArrayed = [
        workspaceHash,
        newBoardHash,
        encodeURIComponent(newBoardName),
        encodeURIComponent(newBoardDescription),
        arrayTags(newBoardTags),
        'tomorrow',
        'now',
        'onlyme',
        boardRevisionsAmount,
        boardEventHash
    ];

    if (newBoardName) {
        
        localStorage.setItem("newBoardLS", newBoardHash);
        localStorage.setItem(newBoardHash, JSON.stringify(newBoardArrayed));
        const event = new Event("newBoardEvent");
        window.dispatchEvent(event);
        
    } else {
        ephemeralNotification("Board name cannot be empty")
    }
});
