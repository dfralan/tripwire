let trashDropdownId = genHex(12);

var boardcontainer = `
        <section class="boardsContainer m-gap bg-tertiary padded overflow-scroll hide-scrollbar display-flex flex-row min-height-50">

            <div id="trashBoard" style="min-width: 350px; min-height: 300px;" class="responsive-4 display-none">
                <div class="border-dashed boardDropZone rounded bg-body display-flex flex-col s-gap shadow-one">
                    <div class="xs-padded no-padded-right no-padded-top">
                        <h4 class="display-flex spaced color-primary font-500 font-m s-padded no-padded-bottom">
                            <span loom="Trash 🗑️"></span>

                            <!-- Trash options dropdown -->
                            <div id='${trashDropdownId}' class="dropdown">
                                <p onclick="toggleDropdown('${trashDropdownId}')" class="btn cursor-pointer bg-none hover-color-tint hover-fill-tint focus-fill-tint focus-color-tint">
                                    <svg class="fill-primary" width="22" height="22" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.3929 26.4001C11.731 26.4001 11.1667 26.1644 10.7 25.693C10.2333 25.2216 10 24.655 10 23.993C10 23.3311 10.2357 22.7668 10.7071 22.3001C11.1785 21.8334 11.7451 21.6001 12.4071 21.6001C13.069 21.6001 13.6333 21.8358 14.1 22.3072C14.5667 22.7786 14.8 23.3452 14.8 24.0072C14.8 24.6691 14.5643 25.2334 14.0929 25.7001C13.6215 26.1668 13.0549 26.4001 12.3929 26.4001ZM23.9929 26.4001C23.331 26.4001 22.7667 26.1644 22.3 25.693C21.8333 25.2216 21.6 24.655 21.6 23.993C21.6 23.3311 21.8357 22.7668 22.3071 22.3001C22.7785 21.8334 23.3451 21.6001 24.0071 21.6001C24.669 21.6001 25.2333 21.8358 25.7 22.3072C26.1667 22.7786 26.4 23.3452 26.4 24.0072C26.4 24.6691 26.1643 25.2334 25.6929 25.7001C25.2215 26.1668 24.6549 26.4001 23.9929 26.4001ZM35.5929 26.4001C34.931 26.4001 34.3667 26.1644 33.9 25.693C33.4333 25.2216 33.2 24.655 33.2 23.993C33.2 23.3311 33.4357 22.7668 33.9071 22.3001C34.3785 21.8334 34.9451 21.6001 35.6071 21.6001C36.269 21.6001 36.8333 21.8358 37.3 22.3072C37.7667 22.7786 38 23.3452 38 24.0072C38 24.6691 37.7643 25.2334 37.2929 25.7001C36.8215 26.1668 36.2549 26.4001 35.5929 26.4001Z" />
                                    </svg>
                                </p>
                                <ul
                                    class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                                    <li class="dropdown-element block-mode color-secondary rounded-xs cursor-pointer">
                                        Hide Board</li>
                                </ul>
                            </div>

                        </h4>
                    </div>
                    <ul style="max-height:300px;"
                        class="hide-scrollbar display-flex flex-col s-gap overflow-scroll s-padded" id="0">
                    </ul>
                </div>
            </div>

            <div id='createBoardButton' class='display-none'>
                <button onclick="launchModalBoard('')" class="bg-tint color-white full-center text-center display-flex flex-row font-m font-500 s-padded-wide border-solid border-tertiary fill-white rounded no-wrap cursor-pointer border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
                        <path
                            d="M450-450H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-510h220v-220q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-730v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-450H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T450-230v-220Z" />
                    </svg>
                    <span>Create board</span>
                </button>
            </div>

        </section>
`