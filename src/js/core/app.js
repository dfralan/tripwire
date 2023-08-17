
window.addEventListener("tripChange", function() {

    // draggin handler
    var taskBoards = document.querySelectorAll('.taskBoard');
    var taskBoardDropZones = document.getElementsByClassName('taskBoardDropZone')
    var dragItem = null

    for(var i of taskBoards){
        i.addEventListener('dragstart', dragStart)
        i.addEventListener('dragend', dragEnd)
    }
    function dragStart(){
        dragItem = this
        setTimeout(()=>this.style.display = 'none', 0)
    }

    function dragEnd(){
        setTimeout(()=>this.style.display = 'flex', 0)
        dragItem = null
    }

    for(j of taskBoardDropZones){
        j.addEventListener('dragover', dragOver)
        j.addEventListener('dragenter', dragEnter)
        j.addEventListener('dragleave', dragLeave)
        j.addEventListener('drop', Drop)
    }

    function Drop() {
        if (dragItem != null){
            if (this.id === "deletionZone") {
                // launch confirmation deletion button
                return;
            }
            this.querySelector("ul").append(dragItem)
        }
        Array.from(taskBoardDropZones).forEach(function(x) {
            x.classList.remove("border-cyan");
        });
    }

    function dragOver(e) {
        e.preventDefault()
        this.classList.add("border-cyan");
    }

    function dragEnter(e) {
        e.preventDefault()
    }

    function dragLeave(e) {
        Array.from(taskBoardDropZones).forEach(function(x) {
            x.classList.remove("border-cyan");
        });
    }


    // Expand board function
    taskBoards.forEach(function (taskBoard) {
        focusedTaskBoard = document.getElementById(taskBoard.getAttribute("id"))
        const expandButton = focusedTaskBoard.querySelector(".expandBoard");
        const details = focusedTaskBoard.querySelector(".more");
        
        // Check if the event listener is already attached
        if (!expandButton.dataset.expandListenerAdded) {
            expandButton.dataset.expandListenerAdded = true;
            
            expandButton.addEventListener("click", function () {
                if (details.classList.contains("display-none")){
                    details.classList.remove("display-none");
                    details.classList.add("display-flex");
                    expandButton.style.transform = 'scaleY(-1)'
                } else {
                    details.classList.remove("display-flex");
                    details.classList.add("display-none");
                    expandButton.style.transform = 'scaleY(1)'
                }
            });
        }
    });
    

    // Timestamp formatter initial update
    updateTimestampDisplay();
});



(function () {

    // Logged key
    var privKey = localStorage.getItem("privKey")

    // Check if exist key on local storage and if is valid otherwise redirects to index.html
    if (isValidHexKey(privKey)) {
        main()
    } else {
        localStorage.removeItem("privKey");
        window.location.href = 'index.html';
    }

    // Main function
    function main() {
        
        //logout function
        const logoutButton = document.getElementById('logoutButton')
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("privKey");
            window.location.href = 'index.html';
        });

        // Variables to handle board creation
        const addNewBoardButton = document.getElementById('addNewBoardButton')
        const cancelAddNewBoard = document.getElementById('cancelAddNewBoard')
        const newBoardCreationModal = document.getElementById('newBoardCreationModal')

        // show add new board modal
        addNewBoardButton.addEventListener("click", function () {
            newBoardCreationModal.classList.remove("display-none");
            newBoardCreationModal.classList.add("display-flex");
        });

        // hide add new board modal
        cancelAddNewBoard.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior of the button
            newBoardCreationModal.classList.add("display-none");
            newBoardCreationModal.classList.remove("display-flex");
        });

        // listen event that allow close new board modal when success on sending the event
        window.addEventListener("closeNewBoardModal", function() {
            newBoardCreationModal.classList.add("display-none");
            newBoardCreationModal.classList.remove("display-flex");
        });

        // count boards inside zones
        function countAndLogListItems(ulId, badgeId) {
            const ulElement = document.getElementById(ulId);
            const badge = document.getElementById(badgeId)
            
            if (!ulElement) {
                return;
            }
            
            let itemCount = ulElement.getElementsByTagName('li').length;
          
            badge.innerHTML = itemCount
            
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                  const newCount = ulElement.getElementsByTagName('li').length;
                  if (newCount !== itemCount) {
                    console.log(`New count: ${newCount}`);
                    itemCount = newCount;
                    badge.innerHTML = itemCount
                  }
                }
              });
            });
            
            observer.observe(ulElement, { childList: true });
        }
        countAndLogListItems('3', 'attractionBoardsBadge');
        countAndLogListItems('4', 'considerationBoardsBadge');
        countAndLogListItems('5', 'decisionBoardsBadge');
        countAndLogListItems('6', 'actionBoardsBadge');


        // Show or hide Contacts Zone 
        const clientsBoardShowToggle = document.getElementById('clientsBoardShowToggle')
        const clientsBoard = document.getElementById('clientsBoard')

        clientsBoardShowToggle.addEventListener("click", function () {
            if (clientsBoard.classList.contains("display-none")){
                clientsBoard.classList.remove("display-none");
            } else {
                clientsBoard.classList.add("display-none");
            }
        });

        // Show or hide Draft Zone 
        const draftBoardShowToggle = document.getElementById('draftBoardShowToggle')
        const draftBoard = document.getElementById('draftBoard')

        draftBoardShowToggle.addEventListener("click", function () {
            if (draftBoard.classList.contains("display-none")){
                draftBoard.classList.remove("display-none");
            } else {
                draftBoard.classList.add("display-none");
            }
        });

        // Show or hide Trash Zone 
        const trashBoard = document.getElementById('trashBoard')

        deletionZone.addEventListener("click", function () {
            if (trashBoard.classList.contains("display-none")){
                trashBoard.classList.remove("display-none");
            } else {
                trashBoard.classList.add("display-none");
            }
        });

        

    }
    
})();