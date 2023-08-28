var sheetcreationform = `

<div id="sheetCreationModal" class="modal z-i full-center blur-behind smooth-300 display-none">
<div class="modal-bg o-2 bg-primary"></div>
<form id="newSheetForm" class="max-w-350 bg-body z-2 padded rounded brick flex-col s-gap">
    <div class="display-flex flex-col">
        <div onclick="hideNewSheetModal()" class="display-flex flex-end fill-primary cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>
        </div>
        <div class="full-center flex-col">
            <h1>✏️</h1>
            <h4 id="sheetModalIndicator" class="color-primary">New Sheet</h4>    
        </div>
    </div>

    <div class="display-flex flex-col xs-gap">
        <label class="color-primary font-xs" for="newBoardName">
            <span>Sheet title</span>
            <span class="color-alert">*</span>
        </label>
        <input id="newSheetName"
            class="s-padded bg-body border-secondary border-solid rounded-s placeholder-secondary font-m color-primary"
            type="text" placeholder="" autofocus>
        <small class="color-primary">👋 It is necessary to indicate the title of the sheet</small>
    </div>


    <textarea id="newSheetInputDescription" name="" cols="30" rows="3"
        class="s-padded bg-body border-secondary border-solid rounded-s placeholder-secondary font-s color-primary"
        placeholder=""></textarea>
    
    <div class="display-flex flex-col xs-gap">
        <label class="color-primary font-xs" >
            <span>Tags</span>
        </label>
        <input id="newSheetInputTags"
                class="s-padded bg-body border-secondary border-solid rounded-s placeholder-secondary font-m color-primary"
                type="text" placeholder="">
        <small class="color-primary">Add some tags splitted by ',' like: Priority high, UX/UI, Keep it simple</small>
    </div>

    <p class="display-flex flex-row flex-start color-secondary fill-secondary font-s hide-scrollbar overflow-scroll max-width-100">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M460-80q-91 0-155.5-62.5T240-296v-430q0-64 45.5-109T395-880q65 0 110 45t45 110v394q0 38-26 64.5T460-240q-38 0-64-28.5T370-336v-372q0-8 6-14t14-6q8 0 14 6t6 14v375q0 22 14.5 37.5T460-280q21 0 35.5-15t14.5-36v-395q0-48-33.5-81T395-840q-48 0-81.5 33T280-726v432q0 73 53 123.5T460-120q75 0 127.5-51T640-296v-412q0-8 6-14t14-6q8 0 14 6t6 14v411q0 91-64.5 154T460-80Z"/></svg>
        </span>
        <span class='sticky to-left bg-body no-wrap'>Attached to board</span>
        <span>&nbsp</span>
        <span id="boardReference" class="color-primary font-500 no-wrap">Connections 🔗</span>
    </p>

    <div class="flex-col display-flex s-gap">
        <button id="newSheetSubmitButton" class="border-none cursor-pointer color-white font-m bg-tint rounded-s s-padded border-none" type="submit">Add Sheet</button>
        <button onclick="hideNewSheetModal()" class="border-none cursor-pointer color-body font-m bg-primary rounded-s s-padded border-none" type="button">Cancel</button>
    </div>
</form>
</div>
`