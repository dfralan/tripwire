let dropwdownElementClass = 'dropdown-element ultra-over-mark block-mode color-secondary rounded-xs cursor-pointer'

var navbar =`
<div class="bg-body stick-top z-3 steady-1 padded spaced display-flex flex-wrap">

    
        <!-- Brand -->
        
        <div class="display-flex flex-wrap">
            ${clipIcon}
            <div>
                <p class="font-500 color-primary">Tripwire</p>
                <p class="color-rock no-wrap font-s on-mobile-pass">Sales Approach</p>
            </div>
        </div>

        <div class="display-flex flex-row s-gap">




        <!-- Create Board Button -->
        <button id="addNewBoardButton" class="btn btn-tint no-wrap">
            <span>Create</span>
            <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960"
                width="18">
                <path d="M450-450H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-510h220v-220q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-730v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-450H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T450-230v-220Z"/></svg>
        </button>

            <!-- Language Switcher -->
            <loom class="dropdown">
                <button class="cursor-pointer full-center btn bg-none color-secondary fill-secondary hover-color-tint hover-fill-tint">
                    <span loom-indicator>
                    </span>
                    ${globeIcon}
                    ${dropdownIcon}
                </button>
                <ul loom-list class="dropdown-right text-right rounded m-font font-200 shadow-two bg-body xs-padded border-solid-xs border-tertiary">
                    <li loom-language="ar" class="${dropwdownElementClass}"></li>
                    <li loom-language="us" class="${dropwdownElementClass}"></li>
                    <li loom-language="br" class="${dropwdownElementClass}"></li>
                    <li loom-language="fr" class="${dropwdownElementClass}"></li>
                </ul>
            </loom>
            
            <!-- Theme -->
            <a id="theme-btn" class="full-center cursor-pointer decoration-none">
                <span>
                    ${sunIcon}
                    ${moonIcon}
                </span>
            </a>

            <!-- Logout button -->
            <button id="logoutButton" class="cursor-pointer full-center btn bg-none color-secondary fill-secondary hover-color-tint hover-fill-tint">
            <span class='on-mobile-pass'>
            Logout
            </span>
                ${doorIcon}
            </button>

        </div>
        
    </div>
`
