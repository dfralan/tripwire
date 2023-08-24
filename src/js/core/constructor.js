

//0 workspaceId, 1 boardId, 2 title, 3 tags, 4 deadline, 5 at, 6 participants
function constructBoard(workspaceId, boardId, title, tags, deadline, at, participants) {

    // Check if is an update, or an older than the actual one with same ID,
    if (document.getElementById(boardId)){
        console.log('repeated board id')
        return
    }

    // Concatenated tags variable declaration
    var boardTags = ''

    // Amount of tags and clasification declaration
    var phoneNumbersAmount = 0
    var emailsAmount = 0
    var urlsAmount = 0
    var tagsAmount = 0
    var boardRevisionsAmount = 1

    // Create and append tag elements
    tags.forEach(tag => {

        var boardTagContent = decodeURIComponent(tag)
        var urlTagClass = `pastel-${Math.floor(Math.random() * 5) + 1} tag xxs-padded font-xs rounded-s no-wrap hide-scrollbar overflow-scroll max-w-100`

        if (isValidUrl(`${boardTagContent}`)){

            urlsAmount++
            var urlTagElement = `<a class="${urlTagClass}" target="_blank" href="${boardTagContent}">${boardTagContent}</a>`
            boardTags += urlTagElement;

        } else if (isValidEmail(`${decodeURIComponent(tag)}`)) {

            emailsAmount++
            var emailTagElement = `<a class="${urlTagClass}" target="_blank" href="mailto:${boardTagContent}">${boardTagContent}</a>`
            boardTags += emailTagElement;
            
        } else if (isValidPhoneNumber(`${decodeURIComponent(tag)}`)) {

            phoneNumbersAmount++
            var phoneTagElement = `<a class="${urlTagClass}" target="_blank" href="tel:${boardTagContent}">${boardTagContent}</a>`
            boardTags += phoneTagElement;

        } else {
            
            tagsAmount++
            var simpleTagElement = `<p class="${urlTagClass}">${boardTagContent}</p>`
            boardTags += simpleTagElement;

        }
    });

    var boardDetails = ''
    let detailIndicatorBoardClass = 'font-xs color-primary fill-secondary display-flex flex-row'

    // revisions count
    let revisionTagsAmountElement = `
    <p class="${detailIndicatorBoardClass}">
        <span>${revisionsIcon}</span>
        <span data-revisions-amount="${boardRevisionsAmount}">${tagsAmount}</span>
    </p>
    `
    if (boardRevisionsAmount > 0) {boardDetails += revisionTagsAmountElement}

    // tags count
    let simpleTagsAmountElement = `
    <p class="${detailIndicatorBoardClass}">
        <span>${tagIcon}</span>
        <span>${tagsAmount}</span>
    </p>
    `
    if (tagsAmount > 0) {boardDetails += simpleTagsAmountElement}

    // url count
    let urlTagsAmountElement = `
    <p class="${detailIndicatorBoardClass}">
        <span>${linkIcon}</span>
        <span>${urlsAmount}</span>
    </p>
    `
    if (urlsAmount > 0) {boardDetails += urlTagsAmountElement}

    // email count
    let emailTagsAmountElement = `
    <p class="${detailIndicatorBoardClass}">
        <span>${emailIcon}</span>
        <span>${emailsAmount}</span>
    </p>
    `
    if (emailsAmount > 0) {boardDetails += emailTagsAmountElement}

    // phone count
    let phoneTagsAmountElement = `
    <p class="${detailIndicatorBoardClass}">
        <span>${phoneIcon}</span>
        <span>${phoneNumbersAmount}</span>
    </p>
    `
    if (phoneNumbersAmount > 0) {boardDetails += phoneTagsAmountElement}

    var easyBoard = `
    <div class="border-dashed boardDropZone rounded bg-tertiary display-flex flex-col s-gap shadow-one matcher">
        <div class="xs-padded no-padded-right no-padded-top">
            <h4 class="display-flex spaced color-primary font-500 font-m s-padded no-padded-bottom">
                <div class='hide-scrollbar overflow-scroll max-width-100'><span class="boardTitle no-wrap">${title}</span></div>
                <div id='dropdown-${boardId}' class="dropdown">
                    <button onclick="toggleDropdown('dropdown-${boardId}')" class=" border-none cursor-pointer bg-none hover-color-tint hover-fill-tint focus-fill-tint focus-color-tint">
                        ${dotOptionsIcon}
                    </button>
                    <ul class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                        <li onclick="launchModalSheet('${workspaceId}', '${boardId}', '')" class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${boardId}">Add new sheet +</li>
                        <li onclick="launchModalBoard('${workspaceId}', '${boardId}', '${title}', '')" class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${boardId}">Edit Board</li>
                    </ul>
                </div>
            </h4>
        </div>
        <ul class="sheetContainer hide-scrollbar display-flex flex-col s-gap overflow-scroll s-padded" style="max-height: 300px;"></ul>
        <div class="boardTagsContainer display-flex flex-wrap s-gap s-padded no-padded-bottom no-padded-top">
            ${boardTags}
        </div>
        <div class="boardDetailsContainer display-flex flex-row s-gap s-padded no-padded-top overflow-hidden overflow-scroll">
            <p class="timestamp font-xs color-secondary overflow-scroll no-wrap" data-timestamp="${at}">now</p>
            ${boardDetails}
        </div>
    </div>`

    // Create the outermost div with class "responsive-4"
    const newBoardDiv = document.createElement("div")
    newBoardDiv.className = "max-w-350 display-block"
    newBoardDiv.id = boardId
    newBoardDiv.innerHTML = easyBoard

    const targettedWorkspace = document.getElementById('workspace')
    // const workspaceHash = targettedWorkspace.getAttribute('data-workspace-hash');
    const boardcontainer = targettedWorkspace.querySelector('.boardsContainer')
    boardcontainer.appendChild(newBoardDiv)


    // Add access button to toolbar
    const toolbarAccessButton = document.createElement('button');
    toolbarAccessButton.className = "btn btn-secondary no-wrap rounded-max";
    toolbarAccessButton.id = `accessBtn-${boardId}`
    toolbarAccessButton.innerHTML = title;
    toolbarAccessButton.onclick = function() {
        toggleBoardVisibility(boardId, `accessBtn-${boardId}`);
    };



    let workspace = document.getElementById('workspace')
    let toolbar = workspace.querySelector('.toolbar')
    toolbar.appendChild(toolbarAccessButton)
    
    // Dispatch changes on trip
    window.dispatchEvent(new Event("brikChange"));
    window.dispatchEvent(new Event(boardId));

}








//0 workspaceId, 1 boardId, 2 sheetId, 3 title, 4 description, 5 tags, 6 deadline, 7 at, 8 participants,
function constructSheet(workspaceId, boardId, sheetId, title, description, tags, deadline, at, participants) {

    // Check if is an update, or an older than the actual one with same ID,
    if (document.getElementById(sheetId)){
        console.log('repeated sheet id')
        return
    }

    // Check if sheet already exist to know is only an update
    var existentSheet = document.getElementById(sheetId)
    var update = existentSheet ? true : false

    var sheetTags = ''

    // Amount of tags and clasification declaration
    var phoneNumbersAmount = 0
    var emailsAmount = 0
    var urlsAmount = 0
    var tagsAmount = 0
    var sheetRevisionsAmount = 1

    // Create and append tag elements
    tags.forEach(tag => {

        var sheetTagContent = decodeURIComponent(tag)
        var urlTagClass = `pastel-${Math.floor(Math.random() * 5) + 1} tag xxs-padded font-xs rounded-s no-wrap hide-scrollbar overflow-scroll max-w-100`

        if (isValidUrl(`${sheetTagContent}`)){

            urlsAmount++
            var urlTagElement = `<a class="${urlTagClass}" target="_blank" href="${sheetTagContent}">${sheetTagContent}</a>`
            sheetTags += urlTagElement;

        } else if (isValidEmail(`${decodeURIComponent(tag)}`)) {

            emailsAmount++
            var emailTagElement = `<a class="${urlTagClass}" target="_blank" href="mailto:${sheetTagContent}">${sheetTagContent}</a>`
            sheetTags += emailTagElement;
            
        } else if (isValidPhoneNumber(`${decodeURIComponent(tag)}`)) {

            phoneNumbersAmount++
            var phoneTagElement = `<a class="${urlTagClass}" target="_blank" href="tel:${sheetTagContent}">${sheetTagContent}</a>`
            sheetTags += phoneTagElement;

        } else {
            
            tagsAmount++
            var simpleTagElement = `<p class="${urlTagClass}">${sheetTagContent}</p>`
            sheetTags += simpleTagElement;

        }
    });

    var sheetDetails = ''
    let detailIndicatorSheetClass = 'font-xs color-primary fill-secondary display-flex flex-row'

    // revisions count
    let revisionTagsAmountElement = `
    <p class="${detailIndicatorSheetClass} boardRevisionsCount">
        <span>${revisionsIcon}</span>
        <span>${tagsAmount}</span>
    </p>
    `
    if (sheetRevisionsAmount > 0) {sheetDetails += revisionTagsAmountElement}

    // tags count
    let simpleTagsAmountElement = `
    <p class="${detailIndicatorSheetClass}">
        <span>${tagIcon}</span>
        <span>${tagsAmount}</span>
    </p>
    `
    if (tagsAmount > 0) {sheetDetails += simpleTagsAmountElement}

    // url count
    let urlTagsAmountElement = `
    <p class="${detailIndicatorSheetClass}">
        <span>${linkIcon}</span>
        <span>${urlsAmount}</span>
    </p>
    `
    if (urlsAmount > 0) {sheetDetails += urlTagsAmountElement}

    // email count
    let emailTagsAmountElement = `
    <p class="${detailIndicatorSheetClass}">
        <span>${emailIcon}</span>
        <span>${emailsAmount}</span>
    </p>
    `
    if (emailsAmount > 0) {sheetDetails += emailTagsAmountElement}

    // phone count
    let phoneTagsAmountElement = `
    <p class="${detailIndicatorSheetClass}">
        <span>${emailIcon}</span>
        <span>${phoneNumbersAmount}</span>
    </p>
    `
    if (phoneNumbersAmount > 0) {sheetDetails += phoneTagsAmountElement}

    var easySheet = `
    <div class="display-flex flex-row spaced">
        <h4 class="sheetTitle hide-scrollbar overflow-scroll no-wrap font-s font-500">${title}</h4>
        <div class="display-flex flex-row">
            <div id='dropdown-${sheetId}' class="dropdown position-relative display-block-inline">
                <button onclick="toggleDropdown('dropdown-${sheetId}')" class="border-none cursor-pointer bg-none hover-color-tint hover-fill-tint focus-fill-tint focus-color-tint">
                    ${dotOptionsIcon}
                </button>
                <ul class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                    <li onclick="launchModalSheet('${workspaceId}', '${boardId}', '${sheetId}')" class="dropdown-element font-xs block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${sheetId}">Edit Sheet</li>
                    <li class="dropdown-element font-xs block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${sheetId}">Delete Sheet</li>
                </ul>
            </div>
            <button onclick="expandSheet('${sheetId}')" class="btn font-l font-600 fill-secondary">
                ${chevronDown}
            </button>
        </div>
    </div>
    <div class="sheetExpansion display-none s-gap flex-col color-primary">
        <p class='sheetDescription'>${description}</p>
        <div class="sheetTagsContainer display-flex flex-wrap s-gap">${sheetTags}</div>
    </div>
    <div class="display-flex flex-row s-gap">
        <p class="timestamp font-xs color-secondary no-wrap" data-timestamp="${at}" loom='now'></p>
        ${sheetDetails}
    </div>
    `
    const newSheetLi = document.createElement('li');
    newSheetLi.id = sheetId;
    newSheetLi.draggable = true;
    newSheetLi.className = 'tripSheet show-my-child cursor-pointer bg-body shadow-dynamic color-primary s-padded display-flex flex-col rounded-s s-gap';
    
    newSheetLi.innerHTML = easySheet

    // Find the .boardContainer element within the specified board element
    var targettedBoard = document.getElementById(boardId);
    var targettedBoardContainer = targettedBoard.querySelector('.sheetContainer');

    targettedBoardContainer.appendChild(newSheetLi)
    

    // Dispatch changes on trip
    window.dispatchEvent(new Event("brikChange"));

}