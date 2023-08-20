document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the class 'backgroundSwitcher'
    const backgroundSwitchers = document.querySelectorAll('.backgroundSwitcher');
    
    // Add click event listener to each backgroundSwitcher element
    backgroundSwitchers.forEach(function(element) {
        element.addEventListener('click', function() {
            // Get the raw attribute value
            const rawAttributeValue = element.getAttribute('raw');
            
            var htmlElement = document.documentElement;
      
            // Remove all classes
            while (htmlElement.classList.length > 0) {
                htmlElement.classList.remove(htmlElement.classList.item(0));
            }
            
            // Set the new class as the class for the <html> element
            htmlElement.classList.add(rawAttributeValue);
        });
    });

});


window.addEventListener("brikChange", function() {

    // draggin handler
    var tripSheets = document.querySelectorAll('.tripSheet');
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

    // Expand board function
    tripSheets.forEach(function (tripSheet) {
        focusedTripSheet = document.getElementById(tripSheet.getAttribute("id"))
        const expandButton = focusedTripSheet.querySelector(".expandBoard");
        const details = focusedTripSheet.querySelector(".more");
        
        // Check if the event listener is already attached
        if (!expandButton.dataset.expandListenerAdded) {
            expandButton.dataset.expandListenerAdded = true;
            
            expandButton.addEventListener("click", function () {
                console.log("clicked expand")
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

    // dropdown handler
    var dropdowns = document.getElementsByClassName("dropdown");
    var i;

    // Hide all dropwdowns
    function hideAllDropdowns(){
        var dropdowncontainers = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowncontainers.length; i++) {
            var openDropdown = dropdowncontainers[i];
            if (openDropdown.classList.contains('display-block')) {
                openDropdown.classList.remove('display-block');
            }
        }
    }

    for (i = 0; i < dropdowns.length; i++) {
        let actualDropwdown = dropdowns[i]
        const dropbtn = actualDropwdown.querySelector(".dropbtn");
        const dropcontent = actualDropwdown.querySelector(".dropdown-content");
        
        if (dropbtn) {
            dropbtn.addEventListener("click", function (event) {
                event.stopPropagation(); // Stop event propagation
                if (dropcontent.classList.contains('display-block')) {
                    hideAllDropdowns()
                } else {
                    hideAllDropdowns()
                    dropcontent.classList.add('display-block');
                }
            })
        
            // Close the dropdown if the user clicks outside of it
            window.onclick = function(event) {
                if (!event.target.matches('.dropbtn')) {
                    hideAllDropdowns()
                }
            }
        }
    }
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