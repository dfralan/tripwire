// TODO:
// SIDEBAR
// DELETE SHEET OR BOARD FUNCTION
// CENTER PROFILE DROPDOWN

function logout() {
    localStorage.removeItem("privKey");
    window.location.href = 'index.html';
};

(function () {

    // Logged key
    var privKey = localStorage.getItem("privKey")

    // Check if exist key on local storage and if is valid otherwise redirects to index.html
    if (!isValidHexKey(privKey)) {
        logout()
    }

})();

// Drag handler

// Zones where items can be dropped and items than can be dragged
var boardDropZones = document.getElementsByClassName('boardDropZone');
var tripSheets = document.querySelectorAll('.tripSheet');
var dragItem = null;

// Dragging results
var dragItemId = '';
var zoneWhereItemDropsId = ''

// Update drop zones and draggable items on brik change event
window.addEventListener("brikChange", function() {
    tripSheets = document.getElementsByClassName('tripSheet');
    boardDropZones = document.getElementsByClassName('boardDropZone');
    setupDragAndDropHandlers();
});

// Set up drag and drop handlers for later listener deletion to avoid duplication
function setupDragAndDropHandlers() {
    for (var i of tripSheets) {
        i.addEventListener('dragstart', dragStart);
        i.addEventListener('dragend', dragEnd);
    }

    for (j of boardDropZones) {
        j.addEventListener('dragover', dragOver);
        j.addEventListener('dragleave', dragLeave);
    }

    // Timestamp formatter initial update
    updateTimestampDisplay();
}

// Function triggered when item start dragging and set the targetted id
function dragStart() {
    dragItem = this

    // Get and set the id of the targetted item dragged
    var itemid = this.id;
    dragItemId = itemid

    // Hide event when dragging start
    setTimeout(() => this.style.display = 'none', 0)
}

// Drag and drop event deletion to avoid duplication
function removeDragAndDropHandlers() {
    for (var i of tripSheets) {
        i.removeEventListener('dragstart', dragStart);
        i.removeEventListener('dragend', dragEnd);
    }

    for (j of boardDropZones) {
        j.removeEventListener('dragover', dragOver);
        j.removeEventListener('dragleave', dragLeave);
    }

    // Trigger a brik change event that start all over
    window.dispatchEvent(new Event("brikChange"));
}

// On drag end trigger the drag event listeners remove function to avoid duplication
function dragEnd() {

    setTimeout(() => this.style.display = 'flex', 0);
    // Set drag item as null like at the beginning
    dragItem = null;
    // Remove border cyan of all the drop zones
    Array.from(boardDropZones).forEach(function(x) {
        x.classList.remove("border-cyan");
    });
    // Remove the event listeners when dragging ends
    removeDragAndDropHandlers();
    aDragHappen()

}

// On hover a dropzone set targetted drop zone id with it
function dragOver(e) {
    e.preventDefault();

    // Get and set the id of the targetted drop zone
    var zoneid = this.id;
    zoneWhereItemDropsId = zoneid

    // Add border indicator
    this.classList.add("border-cyan");
}

function dragLeave(e) {

    // Remove border cyan of all the drop zones
    Array.from(boardDropZones).forEach(function(x) {
        x.classList.remove("border-cyan");
    });

    // Set only the zone id to empty string cause the item id is triggered once
    zoneWhereItemDropsId = ''

}

// Initial setup
setupDragAndDropHandlers();

// Function that get item in local storage, if exist check if the dropped zone is different from the origin
// in case it is, launch sheet event creation with new parameters
function aDragHappen(){
    const draggedSheetLS = localStorage.getItem(`descypher-${dragItemId}`)
    let draggedSheetLSParsed = JSON.parse(draggedSheetLS);
    const draggedSheetLastBoardId = draggedSheetLSParsed[1]
    if (draggedSheetLastBoardId === zoneWhereItemDropsId) {
        return
    } else {
        // HANDLE NEW SHEET
        const newDraggedSheetArrayed = [
            draggedSheetLSParsed[0],
            zoneWhereItemDropsId,
            draggedSheetLSParsed[2],
            draggedSheetLSParsed[3],
            draggedSheetLSParsed[4],
            arrayTags(arrayToCommaString(draggedSheetLSParsed[5])),
            'tomorrow',
            'now',
            'onlyme',
            draggedSheetLSParsed[9],
            draggedSheetLSParsed[10]
        ];

        localStorage.setItem("newSheetLS", draggedSheetLSParsed[2]);
        localStorage.setItem(draggedSheetLSParsed[2], JSON.stringify(newDraggedSheetArrayed));
        const event = new Event("newSheetEvent");
        window.dispatchEvent(event);

    }
}
