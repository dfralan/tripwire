var boardcreationform =`

<!-- New board modal -->
    <div id="boardCreationModal" class="modal z-i full-center blur-behind smooth-300 display-none">
        <div class="modal-bg o-2 bg-primary"></div>
        <form id="newBoardForm" class="max-w-350 bg-body z-2 padded rounded brick flex-col m-gap">
            <div class="display-flex flex-col">
                <div onclick="hideNewBoardModal()" class="display-flex flex-end fill-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>
                </div>
                <div class="full-center flex-col">
                    <h1>📎</h1>
                    <h4 id ='boardModalIndicator'class="color-primary">New Board</h4>    
                </div>
            </div>

            <div class="display-flex flex-col xs-gap">
                <label class="color-primary font-xs" for="newBoardName">
                    <span>Board title</span>
                    <span class="color-alert">*</span>
                </label>
                <input id="newBoardName"
                    class="s-padded bg-body border-secondary border-solid rounded-s placeholder-secondary font-m color-primary"
                    type="text" placeholder="" autofocus>
                <small class="color-primary" for="newBoardName">👋 It is necessary to indicate the title of the board</small>
            </div>
            <textarea id="newBoardInputDescription" name="" cols="30" rows="3"
                class="s-padded bg-body border-secondary border-solid rounded-s placeholder-secondary font-s color-primary"
                placeholder=""></textarea>
            
            <div class="display-flex flex-col xs-gap">
                <label class="color-primary font-xs" for="newBoardName">
                    <span>Tags</span>
                </label>
                <input id="newBoardInputTags"
                        class="s-padded bg-body border-secondary border-solid rounded-s placeholder-secondary font-m color-primary"
                        type="text" placeholder="">
                <small class="color-primary" for="newBoardName">Add some tags splitted by ',' like: +54911234565, john@lotus.com, lotusmotors.com</small>

            </div>

            <p class="display-flex flex-row flex-start color-secondary fill-secondary font-s">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z"/></svg>
                </span>
                <span>Only private boards are allow for now</span>
            </p>

            <div class="flex-col display-flex s-gap">
                <button id='newBoardSubmitButton' class="bg-tint color-white full-center text-center display-flex flex-row font-m font-500 s-padded-wide border-solid border-tertiary fill-white rounded-s no-wrap cursor-pointer border-none" type="submit">Create Board</button>
                <button onclick="hideNewBoardModal()" class="bg-primary color-body full-center text-center display-flex flex-row font-m font-500 s-padded-wide border-solid border-tertiary fill-white rounded-s no-wrap cursor-pointer border-none" type="button">Cancel</button>
            </div>
        </form>
    </div>`
    ;