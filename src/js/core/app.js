


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
        
        // Logout function
        const logoutButton = document.getElementById('logoutButton')
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("privKey");
            window.location.href = 'index.html';
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

        // Background switcher
        const backgroundSwitchers = document.querySelectorAll('.backgroundSwitcher');
        backgroundSwitchers.forEach(function(element) {
            element.addEventListener('click', function() {
                // Get the raw attribute value
                const rawAttributeValue = element.getAttribute('raw-theme');
                var htmlElement = document.documentElement;
                while (htmlElement.classList.length > 0) {
                    htmlElement.classList.remove(htmlElement.classList.item(0));
                }
                
                // Set the new class as the class for the <html> element
                htmlElement.classList.add(rawAttributeValue);
            });
        });

    }
    
})();


window.addEventListener("brikChange", function() {

    // draggin handler
    tripSheets = document.querySelectorAll('.tripSheet');
    var boardDropZones = document.getElementsByClassName('boardDropZone')
    var dragItem = null

    for(var i of tripSheets){
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

    for(j of boardDropZones){
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
        Array.from(boardDropZones).forEach(function(x) {
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
        Array.from(boardDropZones).forEach(function(x) {
            x.classList.remove("border-cyan");
        });
    }

    // Timestamp formatter initial update
    updateTimestampDisplay();


});