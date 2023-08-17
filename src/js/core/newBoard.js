function createLi(id, title, description, tags, zoneId, at) {
    // Create the new li element
    parsedTags = JSON.parse(tags)
    const newLi = document.createElement('li');
    newLi.id = id;
    newLi.draggable = true;
    newLi.className = 'show-my-child taskBoard cursor-pointer bg-body shadow-dynamic color-primary s-padded display-flex flex-col rounded-s s-gap';

    // Create the first div within the li
    const div1 = document.createElement('div');
    div1.className = 'display-flex flex-row spaced';
    
    // Create the span for the title
    const spanTitle = document.createElement('h4');
    spanTitle.className = 'hide-scrollbar overflow-scroll no-wrap font-s font-500';
    spanTitle.textContent = title;
    div1.appendChild(spanTitle);

    // Create the span for buttons
    const spanButtons = document.createElement('div');
    spanButtons.className = 'display-flex flex-row';

    // Create another button
    const otherButton = document.createElement('button');
    otherButton.className = 'btn font-l font-600';
    otherButton.innerHTML = editIcon; // Insert SVG content here
    spanButtons.appendChild(otherButton);

    // Create the expand button
    const expandButton = document.createElement('button');
    expandButton.className = 'expandBoard btn font-l font-600';
    expandButton.innerHTML = chevronDown; // Insert SVG content here
    spanButtons.appendChild(expandButton);

    div1.appendChild(spanButtons);
    newLi.appendChild(div1);

    // Create the second div for the "more" content
    const divMore = document.createElement('div');
    divMore.className = 'more display-none s-gap flex-col';

    // Create the description paragraph
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;
    divMore.appendChild(descriptionParagraph);

    // Create the tags container div
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tagsContainer display-flex flex-wrap s-gap';

    // Create and append tag elements
    parsedTags.forEach(tag => {
        const tagElement = document.createElement('p');
        tagElement.className = 'xs-padded pastel1 font-xs rounded-s decoration-none color-black';
        tagElement.textContent = decodeURIComponent(tag);
        tagsContainer.appendChild(tagElement);
    });

    divMore.appendChild(tagsContainer);
    newLi.appendChild(divMore);

    const timestampContainer = document.createElement('p');
    timestampContainer.className = 'timestamp font-xs'
    timestampContainer.setAttribute("data-timestamp", at);
    newLi.appendChild(timestampContainer);

    // Get the ul element by its zoneId
    const ulElement = document.getElementById(zoneId);

    // Append the new li element to the ul
    ulElement.appendChild(newLi);
}


(function () {

    const newBoardForm = document.getElementById('newBoardForm');
    const newBoardFormInfo = document.getElementById('newBoardFormInfo');
    const zoneSelection = document.getElementById('zoneSelection')

    var selectedZone = 3
    var salesApproachZonesList = document.getElementById('salesApproachZonesList');
    var liElements = salesApproachZonesList.getElementsByTagName('li');
    for (var i = 0; i < liElements.length; i++) {
        liElements[i].addEventListener('click', function() {
            for (var j = 0; j < liElements.length; j++) {
                liElements[j].classList.remove('selected');
            }
            zoneSelection.textContent = this.textContent
            this.classList.add('selected')
            var clickedIndex = Array.from(liElements).indexOf(this)
            selectedZone = clickedIndex
        });
    }

    // Submit login listener
    newBoardForm.addEventListener('submit', function (event) {
        event.preventDefault() // Prevent the default form submission behavior
        let newBoardHash = genHex(8)
        const newBoardInputName = document.getElementById('newBoardInputName').value
        const newBoardInputDescription = document.getElementById('newBoardInputDescription').value
        const newBoardInputTags = document.getElementById('newBoardInputTags').value
        var newBoardState = selectedZone //0 deleted, 1 draft, 2 contacts, 3 attraction, 4 consideration, 5 decision, 6 action

        console.log(`selected state ${newBoardState}`)
        // Split the input string into an array using the comma as the delimiter
        const values = newBoardInputTags.split(', ');

        // Convert each value into a format that matches the desired output
        const output = values.map(value => `"${encodeURIComponent(value)}"`);

        // Join the converted values into a single string with square brackets
        const arrayedTags = `[${output.join(', ')}]`;

        const arrayToStore = [
            newBoardHash,
            newBoardState,
            encodeURIComponent(newBoardInputName),
            encodeURIComponent(newBoardInputDescription),
            arrayedTags,
        ];

        if (newBoardInputName) {
            localStorage.setItem("latestNewBoard", JSON.stringify(arrayToStore));

            checkOnlineStatusWithRetries(function(isOnline) {
                if (isOnline) {
                    const event = new Event("latestNewBoardCreated");
                    window.dispatchEvent(event);
                    console.log(newBoardInputName);
                }
            });
        } else {
            newBoardFormInfo.setAttribute("loom", "Board name cannot be empty");
        }
    });

    
    window.addEventListener("NewDataEvent", function() {
        console.log(localStorage.getItem("newDataKey"));
    });
})();
