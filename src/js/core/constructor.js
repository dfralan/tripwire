// WORKSPACE CONSTRUCTOR
function constructWorkspace(workspaceHash) {
    console.log(`CONSTRUCTOR WORKSPACE LAUNCHED CORRECTLY ${workspaceHash}`)
    window.dispatchEvent(new Event(workspaceHash));
}

// BOARD CONSTRUCTOR
function constructBoard(BoardHash) {

    var newBoardDecrypted = JSON.parse(localStorage.getItem(BoardHash))
    let workspaceId = newBoardDecrypted[0]
    let boardId = newBoardDecrypted[1]
    let title = newBoardDecrypted[2]
    let description = newBoardDecrypted[3]
    let tags = newBoardDecrypted[4]
    let deadline = newBoardDecrypted[5]
    let at = newBoardDecrypted[6]
    let participants = newBoardDecrypted[7]
    let revisions = newBoardDecrypted[8]
    let boardEventHash = newBoardDecrypted[9]

    // Amount of tags and clasification declaration
    var phoneNumbersAmount = 0
    var emailsAmount = 0
    var urlsAmount = 0
    var tagsAmount = 0

    // Concatenated tags variable declaration
    var boardTags = ''

    // Create and append tag elements
    tags.forEach(tag => {

        var boardTagContent = decodeURIComponent(tag)
        const urlTagClass = `bg-tint-lighter color-tint tag xxs-padded font-xs rounded-max no-wrap hide-scrollbar overflow-scroll max-w-100`

        if (isValidUrl(`${boardTagContent}`)){

            urlsAmount++
            var urlTagElement = `<a class="${urlTagClass} text-decoration-none underlined" target="_blank" href="${boardTagContent}">${boardTagContent}</a>`
            boardTags += urlTagElement;

        } else if (isValidEmail(`${decodeURIComponent(tag)}`)) {

            emailsAmount++
            var emailTagElement = `<a class="${urlTagClass} text-decoration-none underlined" target="_blank" href="mailto:${boardTagContent}">${boardTagContent}</a>`
            boardTags += emailTagElement;
            
        } else if (isValidPhoneNumber(`${decodeURIComponent(tag)}`)) {

            phoneNumbersAmount++
            var phoneTagElement = `<a class="${urlTagClass} text-decoration-none underlined" target="_blank" href="tel:${boardTagContent}">${boardTagContent}</a>`
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
    let boardTimeStamp = `
    <p class="timestamp font-xs color-secondary overflow-scroll no-wrap" data-timestamp="${at}">now</p>
    `
    boardDetails += boardTimeStamp

    // revisions count
    let revisionTagsAmountElement = `
    <p class="${detailIndicatorBoardClass}">
        <span>${revisionsIcon}</span>
        <span>${revisions}</span>
    </p>
    `
    if (revisions != '0') {boardDetails += revisionTagsAmountElement}

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
    <div class="rounded bg-body display-flex flex-col border-solid border-secondary transition-300">
        <div class="bg-tertiary display-flex rounded-up border-solid border-secondary border-top-none border-left-none border-right-none full-center spaced color-primary font-400 font-m s-padded">
            <div class='hide-scrollbar overflow-scroll max-width-100'><span class="boardTitle no-wrap">${title}</span></div>
            <div id='dropdown-${boardId}' class="dropdown">
                <button onclick="toggleDropdown('dropdown-${boardId}')" class="hover-bg-lighter rounded-max btn cursor-pointer hover-fill-primary fill-secondary">
                    ${dotOptionsIcon}
                </button>
                <ul class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                    <li onclick="launchModalSheet('${boardId}', '')" class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${boardId}">Add new sheet +</li>
                    <li onclick="launchModalBoard('${boardId}')" class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${boardId}">Edit Board</li>
                </ul>
            </div>
        </div>
        <p class='boardDescription s-padded  font-s color-primary'>${description}</p>
        <ul class="sheetContainer hide-scrollbar display-flex flex-col s-gap overflow-scroll s-padded" style="max-height: 300px;"></ul>
        <div class="boardTagsContainer display-flex flex-wrap s-gap s-padded">
            ${boardTags}
        </div>
        <div class="boardDetailsContainer display-flex flex-row s-gap s-padded no-padded-top overflow-hidden overflow-scroll">
            ${boardDetails}
        </div>
    </div>`

    const targettedWorkspace = document.getElementById('workspace')
    // const workspaceHash = targettedWorkspace.getAttribute('data-workspace-hash');
    const boardcontainer = targettedWorkspace.querySelector('.boardsContainer')

    // Check if is an update, or an older than the actual one with same ID,
    if (document.querySelector(`[data-event-hash="${boardEventHash}"]`)){

        const targettedBoard = document.getElementById(BoardHash)

        const existentAccessButton = targettedWorkspace.querySelector(`#accessBtn-${BoardHash}`)
        existentAccessButton.innerHTML = title;

        const existentBoardTitle = targettedBoard.querySelector(`.boardTitle`)
        existentBoardTitle.innerHTML = title;

        const existentBoardDescription = targettedBoard.querySelector(`.boardDescription`)
        existentBoardDescription.innerHTML = description;

        const existentBoardTagsContainer = targettedBoard.querySelector(`.boardTagsContainer`)
        existentBoardTagsContainer.innerHTML = boardTags;

        const existentBoardDetailsContainer = targettedBoard.querySelector(`.boardDetailsContainer`)
        existentBoardDetailsContainer.innerHTML = boardDetails;

    } else {

        // Create the outermost div with class "responsive-4"
        const newBoardDiv = document.createElement("div")
        newBoardDiv.className = "max-w-350 display-block matchMeMan border-dashed boardDropZone rounded"
        newBoardDiv.id = boardId
        newBoardDiv.setAttribute('data-event-hash', boardEventHash)
        newBoardDiv.innerHTML = easyBoard
        boardcontainer.appendChild(newBoardDiv)

        // Add access button to toolbar
        const toolbarAccessButton = document.createElement('button');
        toolbarAccessButton.className = "bg-tertiary display-flex rounded bg-lighter color-secondary border-none full-center font-400 font-s s-padded-wide";
        toolbarAccessButton.id = `accessBtn-${boardId}`
        toolbarAccessButton.innerHTML = title;
        toolbarAccessButton.onclick = function() {
            toggleBoardVisibility(boardId, `accessBtn-${boardId}`);
        };

        let toolbar = document.querySelector('.toolbar')
        toolbar.appendChild(toolbarAccessButton)
    }
    
    // Dispatch changes on trip
    window.dispatchEvent(new Event("brikChange"));
    window.dispatchEvent(new Event(boardId));

}

// SHEET CONSTRUCTOR
function constructSheet(sheetHash) {

    var newSheetDecrypted = JSON.parse(localStorage.getItem(`descypher-${sheetHash}`))

    let boardId = newSheetDecrypted[1]
    let sheetId = newSheetDecrypted[2]
    let title = newSheetDecrypted[3]
    let sheetDescription = newSheetDecrypted[4]
    let tags = newSheetDecrypted[5]
    let deadline = newSheetDecrypted[6]
    let at = newSheetDecrypted[7]
    let participants = newSheetDecrypted[8]
    let revisions = newSheetDecrypted[9]
    let hashEventHash = newSheetDecrypted[10]

    // Amount of tags and clasification declaration
    var phoneNumbersAmount = 0
    var emailsAmount = 0
    var urlsAmount = 0
    var tagsAmount = 0
    var sheetTags = ''

    // Create and append tag elements
    tags.forEach(tag => {

        var sheetTagContent = decodeURIComponent(tag)
        const urlTagClass = `bg-tint-lighter color-tint tag xxs-padded font-xs rounded-max no-wrap hide-scrollbar overflow-scroll max-w-100`
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
        <span>${revisions}</span>
    </p>
    `
    if (revisions != '0') {sheetDetails += revisionTagsAmountElement}

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
        <span>${phoneIcon}</span>
        <span>${phoneNumbersAmount}</span>
    </p>
    `
    if (phoneNumbersAmount > 0) {sheetDetails += phoneTagsAmountElement}

    var easySheet = `
    <div class="display-flex flex-row spaced">
        <h4 class="sheetTitle hide-scrollbar overflow-scroll no-wrap font-400 full-center">${title}</h4>
        <div class="display-flex flex-row full-center">
            <button onclick="expandSheet('${sheetId}')" class="hover-bg-lighter rounded-max btn hover-fill-primary fill-secondary">
                ${chevronDown}
            </button>
            <div id='dropdown-${sheetId}' class="dropdown position-relative display-block-inline">
                <button onclick="toggleDropdown('dropdown-${sheetId}')" class="hover-bg-lighter rounded-max btn cursor-pointer hover-fill-primary fill-secondary">
                ${dotOptionsIcon}
                </button>
                <ul class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                    <li onclick="launchModalSheet('${boardId}', '${sheetId}')" class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${sheetId}">Edit Sheet</li>
                    <li class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer" data-parent-id="${sheetId}">Delete Sheet</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="sheetExpansion display-none s-gap flex-col color-primary">
        <p class='sheetDescription s-padded no-padded-left no-padded-right no-padded-top font-s'>${sheetDescription}</p>
        <div class="sheetTagsContainer display-flex flex-wrap s-gap">${sheetTags}</div>
    </div>
    <div class="display-flex flex-row s-gap">
        <p class="timestamp font-xs color-secondary no-wrap" data-timestamp="${at}" loom='now'></p>
        ${sheetDetails}
    </div>
    `

    const eventHash = document.querySelector(`[data-event-hash="${hashEventHash}"]`)
    const sheetClass = `tripSheet matchMeManChild show-my-child cursor-pointer bg-tertiary shadow-dynamic color-primary s-padded display-flex flex-col rounded-s s-gap border-solid border-secondary`
    
    // Check if is an update, or an older than the actual one with same ID,
    if (eventHash){

        const eventHashId = eventHash.id;
        const existenSheeti = document.getElementById(sheetHash)

        if (newSheetDecrypted[1] === eventHashId) {
            existenSheeti.innerHTML = easySheet
            console.log(`hash Event ${hashEventHash}`)
            console.log(`revisions ${revisions}`)
        } else {
            existenSheeti.remove()
            const newSheetLi = document.createElement('li');
        newSheetLi.setAttribute('data-event-hash', hashEventHash)
        newSheetLi.draggable = true;
        newSheetLi.className =  `${sheetClass}`
        newSheetLi.id = sheetId;
        
        newSheetLi.innerHTML = easySheet

        // Find the .boardContainer element within the specified board element
        var targettedBoard = document.getElementById(boardId);
        var targettedBoardContainer = targettedBoard.querySelector('.sheetContainer');
        
        targettedBoardContainer.appendChild(newSheetLi)
        }

    } else {
        const newSheetLi = document.createElement('li');
        newSheetLi.setAttribute('data-event-hash', hashEventHash)
        newSheetLi.draggable = true
        newSheetLi.className = `${sheetClass}`
        newSheetLi.id = sheetId;
        newSheetLi.innerHTML = easySheet

        // Find the .boardContainer element within the specified board element
        var targettedBoard = document.getElementById(boardId);
        var targettedBoardContainer = targettedBoard.querySelector('.sheetContainer');
        
        targettedBoardContainer.appendChild(newSheetLi)
    }

    // Dispatch changes on trip
    window.dispatchEvent(new Event("brikChange"));

}