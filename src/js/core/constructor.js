

//0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
function constructBoard(workspaceId, boardId, title, tags, deadline, at, participants) {
    parsedTags = JSON.parse(tags)

    // Create the outermost div with class "responsive-4"
    const outerDiv = document.createElement("div");
    outerDiv.style.minWidth = "350px";
    outerDiv.className = "responsive-4 bg-blue";

    outerDiv.id = boardId;

    // Create the main div with classes "border-dashed boardDropZone rounded bg-body display-flex flex-col s-gap shadow-one"
    const mainDiv = document.createElement("div");
    mainDiv.className = "border-dashed boardDropZone rounded bg-tertiary display-flex flex-col s-gap shadow-one";

    // Create the div for the header
    const headerDiv = document.createElement("div");
    headerDiv.className = "xs-padded no-padded-right no-padded-top";

    // Create the h4 element with classes "display-flex spaced color-primary font-500 font-m s-padded no-padded-bottom"
    const h4Element = document.createElement("h4");
    h4Element.className = "display-flex spaced color-primary font-500 font-m s-padded no-padded-bottom";

    // Create the first span element with attribute "loom"
    const span1 = document.createElement("span");
    span1.className = "boardTitle";
    span1.textContent = title;

    // Append both spans to the first span
    //span1.appendChild(document.createTextNode(""));

    // Append the two spans to the h4 element
    const spandiv = document.createElement("div");
    spandiv.appendChild(span1);
    h4Element.appendChild(spandiv);

    // Create the dropdown div
    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown";

    // Create the button element for the dropdown
    const dropdownButton = document.createElement("button");
    dropdownButton.className = "dropbtn cursor-pointer bg-none hover-color-tint hover-fill-tint focus-fill-tint focus-color-tint";
    dropdownButton.innerHTML = dotOptionsIcon;



    // Create the ul element for the dropdown content
    const ulElement = document.createElement("ul");
    ulElement.className = "dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary";

    // Add a click event listener to the dropdown button
    dropdownButton.addEventListener("click", function() {
        const dropdownContent = ulElement; // This assumes ulElement is the dropdown content

        // Toggle the "display-block" class on the dropdown content
        if (dropdownContent.classList.contains("display-block")) {
            hideAllDropdowns()
        } else {
            hideAllDropdowns()
            dropdownContent.classList.add("display-block");
        }
    });

    // Append the button to the dropdown div
    dropdownDiv.appendChild(dropdownButton);

    // Create the li elements for the dropdown options
    const li1 = document.createElement("li");
    li1.className = "dropdown-element block-mode color-secondary rounded-xs cursor-pointer";
    li1.setAttribute('data-parent-id', boardId);
    li1.textContent = "Add new sheet +";

    // Add a click event listener to the dropdown button
    li1.addEventListener("click", function() {
        launchModalSheet(workspaceId, boardId, title, '', '', '', '')
    });

    // Append the li elements to the ul element
    ulElement.appendChild(li1);

    // Append the ul element to the dropdown div
    dropdownDiv.appendChild(ulElement);

    // Append the dropdown div to the h4 element
    h4Element.appendChild(dropdownDiv);

    // Append the h4 element to the header div
    headerDiv.appendChild(h4Element);

    // Create the ul element with styles for max height and classes "hide-scrollbar display-flex flex-col s-gap overflow-scroll s-padded" and ID "4"
    const ulList = document.createElement("ul");
    ulList.style.maxHeight = "300px";
    ulList.className = "sheetContainer hide-scrollbar display-flex flex-col s-gap overflow-scroll s-padded";

    // Create the tags container div
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tagsContainer display-flex flex-wrap s-gap s-padded no-padded-bottom';

    // Create and append tag elements
    parsedTags.forEach(tag => {
        const tagElement = document.createElement('p');
        tagElement.className = 'xs-padded pastel1 font-xs rounded-s decoration-none color-black';
        tagElement.textContent = decodeURIComponent(tag);
        tagsContainer.appendChild(tagElement);
    });

    // timestamp
    const timestampContainer = document.createElement('p');
    timestampContainer.className = 'timestamp font-xs color-primary s-padded no-padded-top'
    timestampContainer.setAttribute("data-timestamp", at);


    // Append the ul element to the main div
    mainDiv.appendChild(headerDiv);
    mainDiv.appendChild(ulList);
    mainDiv.appendChild(tagsContainer);
    mainDiv.appendChild(timestampContainer);

    // Append the main div to the outermost div
    outerDiv.appendChild(mainDiv);

    // Get the element with the ID "workspaceId"
    const workspace = document.getElementById(workspaceId);

    // Append the outermost div to the workspace element
    workspace.appendChild(outerDiv);

    // Dispatch changes on trip
    window.dispatchEvent(new Event("brikChange"));
    window.dispatchEvent(new Event(boardId));

}



//0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 description, 5 tags, 6 deadline, 7 at, 8 participants,
function constructSheet(workspaceId, boardId, sheetId, title, description, tags, deadline, at, participants) {

        
    // Create the new li element
    parsedTags = JSON.parse(tags)
    const newLi = document.createElement('li');
    newLi.id = sheetId;
    newLi.draggable = true;
    newLi.className = 'tripSheet show-my-child cursor-pointer bg-body shadow-dynamic color-primary s-padded display-flex flex-col rounded-s s-gap';

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

    // Add a click event ON EDIT button
    // launchModalSheet(workspaceId, boardId, boardTitle, sheetHash, sheetTitle, sheetDescription, sheetTags)
    const targetBoard = document.getElementById(boardId)
    const boardtitle = targetBoard.querySelector(".boardTitle").textContent

    let commaSeparatedTags = parsedTags.join(', ');
    otherButton.addEventListener("click", function() {
        launchModalSheet(workspaceId, boardId, boardtitle, sheetId, title, description, commaSeparatedTags)
    });

    spanButtons.appendChild(otherButton);

    // Create the expand button
    const expandButton = document.createElement('button');
    expandButton.className = 'btn font-l font-600 fill-secondary';
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

    const targetedBoard = document.getElementById(boardId)
    const ulElement = targetedBoard.querySelector(`.sheetContainer`);



    // Add a click event listener to the dropdown button
    expandButton.addEventListener("click", function() {
        const dropdownContent = divMore; // This assumes ulElement is the dropdown content

        // Toggle the "display-block" class on the dropdown content
        if (dropdownContent.classList.contains("display-none")) {
            dropdownContent.classList.remove("display-none");
        } else {
            dropdownContent.classList.add("display-none");
        }
    });

    // Append the new li element to the ul
    ulElement.appendChild(newLi);

    // Dispatch changes on trip
    window.dispatchEvent(new Event("brikChange"));

}