
// Variables to handle sheet creation
const workspaceCreationModal = document.getElementById('workspaceCreationModal')
const newWorkspaceForm = document.getElementById('newWorkspaceForm');
const newWorkspaceNameInput = document.getElementById('newWorkspaceName')
const newWorkspaceInputDescription = document.getElementById('newWorkspaceInputDescription')
const newWorkspaceInputTags = document.getElementById('newWorkspaceInputTags')
// here go mentions but for now only private workspaces ()
const workspaceModalIndicator = document.getElementById('workspaceModalIndicator')
var newWorkspaceHash = ''
var existentWorkspaceLS = ''
var workspaceRevisionsAmount = ''
var workspaceEventHash = ''
var isFirstTime = true

// show add new workspace modal
function showNewWorkspaceModal() {
    workspaceCreationModal.classList.remove("display-none");
    workspaceCreationModal.classList.add("display-flex");
}

// hide add new workspace modal
function hideNewWorkspaceModal() {
    workspaceCreationModal.classList.remove("display-flex");
    workspaceCreationModal.classList.add("display-none");
}

// Launch Modal and fullfill inputs needed
function launchModalWorkspace(workspaceId) {

    // If workspace hash comes empty, means brand new workspace
    if (workspaceId === '') {
        newWorkspaceHash = genHex(12)
        newWorkspaceNameInput.value = ''
        newWorkspaceInputDescription.value = ''
        newWorkspaceInputTags.value = ''
        workspaceModalIndicator.textContent = 'New Workspace'
        workspaceRevisionsAmount = '-1'
        workspaceEventHash = genHex(20)


    } else { // Existent workspace edition

        existentWorkspaceLS = JSON.parse(localStorage.getItem(workspaceId))
        newWorkspaceHash = existentWorkspaceLS[0]
        newWorkspaceNameInput.value = existentWorkspaceLS[1]
        newWorkspaceInputDescription.value = existentWorkspaceLS[2]
        newWorkspaceInputTags.value = arrayToCommaString(existentWorkspaceLS[3])
        workspaceModalIndicator.textContent = 'Edit Workspace'
        workspaceRevisionsAmount = existentWorkspaceLS[8]
        workspaceEventHash = existentWorkspaceLS[9]
    }

    showNewWorkspaceModal()

}

// Submit workspace new listener
newWorkspaceForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const newWorkspaceName = newWorkspaceNameInput.value
    const newWorkspaceDescription = newWorkspaceInputDescription.value
    const newWorkspaceTags = newWorkspaceInputTags.value

    if (newWorkspaceName) {
        //0 workspaceId, 1 workspaceId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
        const newWorkspaceArrayed = [
            newWorkspaceHash,
            encodeURIComponent(newWorkspaceName),
            encodeURIComponent(newWorkspaceDescription),
            arrayTags(newWorkspaceTags),
            'tomorrow',
            'now',
            'onlyme',
            workspaceRevisionsAmount,
            workspaceEventHash
        ];

        console.log(arrayTags(newWorkspaceTags))

        localStorage.setItem("newWorkspaceLS", newWorkspaceHash);
        localStorage.setItem(newWorkspaceHash, JSON.stringify(newWorkspaceArrayed));
        const event = new Event("newWorkspaceEvent");
        window.dispatchEvent(event);
        
    } else {
        ephemeralNotification("Workspace name cannot be empty")
    }
});
