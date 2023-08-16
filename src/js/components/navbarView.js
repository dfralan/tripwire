let dropwdownElementClass = 'dropdown-element ultra-over-mark block-mode color-secondary rounded-xs cursor-pointer'

var navbar =`

<div class="bg-body stick-top z-3">

    <div class="steady-1 padded m-gap">

        <!-- Brand -->
        
        <div class="display-flex flex-row decoration-none">
            ${clipIcon}
            <div>
                <p class="font-500 color-primary">Tripwire</p>
                <p class="color-rock no-wrap font-s">Sales Approach</p>
            </div>
        </div>
        

        <div class="steady-1 m-gap flex-end">

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

            <button id="logoutButton" class="cursor-pointer full-center btn bg-none color-secondary fill-secondary hover-color-tint hover-fill-tint">Logout
                ${doorIcon}
            </button>

        </div>
        
    </div>
    
</div>
`
