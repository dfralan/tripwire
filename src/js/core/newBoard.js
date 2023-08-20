(function () {


    // Assuming you have a parent element with class 'workspace'
    const workspace = document.querySelector('.workspace');

    if (workspace) {

        // Variables to handle sheet creation
        const newBoardForm = document.getElementById('newBoardForm');
        var newBoardHash = genHex(8)
        const addNewBoardButton = document.getElementById('addNewBoardButton')
        const cancelAddNewBoard = document.getElementById('cancelAddNewBoard')
        const closeAddNewBoard = document.getElementById('closeAddNewBoard')
        const boardCreationModal = document.getElementById('boardCreationModal')

        // show add new sheet modal
        addNewBoardButton.addEventListener("click", function () {
            boardCreationModal.classList.remove("display-none");
            boardCreationModal.classList.add("display-flex");
        });

        // hide add new sheet modal
        cancelAddNewBoard.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior of the button
            boardCreationModal.classList.add("display-none");
            boardCreationModal.classList.remove("display-flex");
        });

        // hide add new sheet modal
        closeAddNewBoard.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior of the button
            boardCreationModal.classList.add("display-none");
            boardCreationModal.classList.remove("display-flex");
        });

        // listen event that allow close new sheet modal when success on sending the event
        window.addEventListener("closeNewBoardModal", function() {
            boardCreationModal.classList.add("display-none");
            boardCreationModal.classList.remove("display-flex");
        });

        // Submit board new listener
        newBoardForm.addEventListener('submit', function (event) {
            event.preventDefault() // Prevent the default form submission behavior
            const newBoardName = document.getElementById('newBoardName').value
            const newBoardInputTags = document.getElementById('newBoardInputTags').value

            //0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
            const newBoardArrayed = [
                'aWorkspace',
                newBoardHash,
                encodeURIComponent(newBoardName),
                arrayTags(newBoardInputTags),
                'tomorrow',
                'now',
                'onlyme',
            ];

            if (newBoardName) {
                localStorage.setItem("newBoardLS", JSON.stringify(newBoardArrayed));

                checkOnlineStatusWithRetries(function(isOnline) {
                    if (isOnline) {
                        const event = new Event("newBoardEvent");
                        window.dispatchEvent(event);
                        console.log(newBoardName);
                    }
                });
            } else {
                ephemeralNotification("Board name cannot be empty")
            }
        });
    }

})();

