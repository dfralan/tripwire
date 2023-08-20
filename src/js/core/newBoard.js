

        // Variables to handle sheet creation
        const newBoardForm = document.getElementById('newBoardForm');
        const addNewBoardButton = document.getElementById('addNewBoardButton')
        const cancelAddNewBoard = document.getElementById('cancelAddNewBoard')
        const closeAddNewBoard = document.getElementById('closeAddNewBoard')
        const boardCreationModal = document.getElementById('boardCreationModal')
        const newBoardSubmitButton = document.getElementById('newBoardSubmitButton')

        function showNewBoardModal() {
            boardCreationModal.classList.remove("display-none");
            boardCreationModal.classList.add("display-flex");
        }
        function hideNewBoardModal() {
            boardCreationModal.classList.remove("display-flex");
            boardCreationModal.classList.add("display-none");
        }

        // show add new sheet modal
        //0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
        addNewBoardButton.addEventListener("click", function () {
            var workspaces = document.getElementsByClassName("workspace");
            var workspaceHash = workspaces[0].id
            launchModalBoard(workspaceHash, '', '', '') 
        });

        // hide add new sheet modal
        cancelAddNewBoard.addEventListener("click", function () {
            hideNewBoardModal()
        });

        // hide add new sheet modal
        closeAddNewBoard.addEventListener("click", function () {
            hideNewBoardModal()
        });

        // listen event that allow close new sheet modal when success on sending the event
        window.addEventListener("closeNewBoardModal", function() {
            hideNewBoardModal()
        });

        function launchModalBoard(workspaceId, boardId, boardTitle, boardTags) {

            var newBoardHash = (boardId === '') ? genHex(8) : boardId

            const newBoardNameInput = document.getElementById('newBoardName')
            const newBoardInputTags = document.getElementById('newBoardInputTags')
            const boardModalIndicator = document.getElementById('sheetModalIndicator')

            boardModalIndicator.textContent = (boardId === '') ? 'New Board' : 'Edit Board'
            newBoardSubmitButton.textContent = (boardId === '') ? 'Create Board' : 'Confirm'
            newBoardNameInput.value = boardTitle
            newBoardInputTags.value = boardTags

            showNewBoardModal()

            // Submit board new listener
            newBoardForm.addEventListener('submit', function (event) {
                event.preventDefault()

                const newBoardName = newBoardNameInput.value
                const newBoardInputTags = newBoardInputTags.value

                //0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
                const newBoardArrayed = [
                    workspaceId,
                    newBoardHash,
                    encodeURIComponent(newBoardName),
                    arrayTags(newBoardInputTags),
                    'tomorrow',
                    'now',
                    'onlyme',
                ];

                if (newBoardName) {
                    
                    localStorage.setItem("newBoardLS", JSON.stringify(newBoardArrayed));
                    const event = new Event("newBoardEvent");
                    window.dispatchEvent(event);
                    console.log(newBoardName);
                    
                } else {
                    ephemeralNotification("Board name cannot be empty")
                }
            });

        }

