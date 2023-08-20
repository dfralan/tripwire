(function () {

        // Assuming you have a parent element with class 'workspace'
        const workspace = document.querySelector('.workspace');

        if (workspace) {

            // Variables to handle sheet creation
            const newSheetForm = document.getElementById('newSheetForm');
            var newSheetHash = genHex(8)
            const cancelAddNewSheet = document.getElementById('cancelAddNewSheet')
            const closeAddNewSheet = document.getElementById('closeAddNewSheet')
            const sheetCreationModal = document.getElementById('sheetCreationModal')


            // hide add new sheet modal
            cancelAddNewSheet.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default behavior of the button
                sheetCreationModal.classList.add("display-none");
                sheetCreationModal.classList.remove("display-flex");
            });

            // hide add new sheet modal
            closeAddNewSheet.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default behavior of the button
                sheetCreationModal.classList.add("display-none");
                sheetCreationModal.classList.remove("display-flex");
            });

            // listen event that allow close new sheet modal when success on sending the event
            window.addEventListener("closeNewBoardModal", function() {
                sheetCreationModal.classList.add("display-none");
                sheetCreationModal.classList.remove("display-flex");
            });


            // Event listener attached to the workspace
            workspace.addEventListener('click', function(event) {
                // Check if the clicked element has the class 'newSheetTrigger'
                if (event.target.classList.contains('newSheetTrigger')) {
                    // show add new sheet modal
                    event.stopPropagation(); // Stop event propagation
                    sheetCreationModal.classList.remove("display-none");
                    sheetCreationModal.classList.add("display-flex");
                }


                const workspaceId = workspace.id;
                const boardId = event.target.getAttribute('data-parent-id');

                // Submit sheet listener
                newSheetForm.addEventListener('submit', function (event) {
                    event.preventDefault() // Prevent the default form submission behavior
                    const newSheetName = document.getElementById('newSheetName').value
                    const newSheetInputTags = document.getElementById('newSheetInputTags').value
                    const newSheetInputDescription = document.getElementById('newSheetInputDescription').value

                    //0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 description, 5 tags, 6 deadline, 7 at, 8 participants,
                    const newSheetArrayed = [
                        workspaceId,
                        boardId,
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

                        checkOnlineStatusWithRetries(function(isOnline) {
                            if (isOnline) {
                                const event = new Event("newSheetEvent");
                                window.dispatchEvent(event);
                                console.log(newSheetName);
                            }
                        });
                    } else {
                        ephemeralNotification("Sheet name cannot be empty")
                    }
                });
                
            });

        }


})();