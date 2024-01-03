let trashDropdownId = genHex(12);

var boardcontainer = `
        <section class="boardsContainer m-gap bg-tertiary padded overflow-scroll hide-scrollbar display-flex flex-row min-height-50">

            <div>
                <button onclick="launchModalBoard('')" class="bg-tint color-white full-center text-center display-flex flex-row font-m font-500 s-padded-wide border-solid border-tertiary fill-white rounded no-wrap cursor-pointer border-none">
                    
                    <span>Create board</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
                        <path
                            d="M450-450H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-510h220v-220q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-730v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-450H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T450-230v-220Z" />
                    </svg>
                </button>
            </div>

        </section>
`