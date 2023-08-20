var navbar =`
<div class="bg-body stick-top z-3 steady-1 s-padded spaced display-flex flex-wrap full-center">

    
        <!-- Brand -->
        
        <div class="display-flex flex-row full-center s-padded no-padded-bottom no-padded-top">
            ${clipIcon}
            <p class="font-500 color-primary on-mobile-pass">Tripwire</p>
        </div>

        <div class="display-flex flex-row s-gap full-center s-padded no-padded-bottom no-padded-top">


            <!-- Language Switcher -->

            <loom class="dropdown">
                <button class="display-flex dropbtn btn btn-secondary no-wrap">

                    <span loom-indicator>
                    </span>
                    ${globeIcon}
                    ${chevronDown}
                </button>
                <ul loom-list class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                    <li loom-language="ar" class="${dropwdownElementClass}"></li>
                    <li loom-language="us" class="${dropwdownElementClass}"></li>
                    <li loom-language="br" class="${dropwdownElementClass}"></li>
                    <li loom-language="fr" class="${dropwdownElementClass}"></li>
                </ul>
            </loom>

            <!-- Avatar Dropdown -->

            <div class="dropdown">
                <div class="dropbtn display-flex cursor-pointer xs-padded">
                    <span class='avatar-m shadow-dynamic bg-primary'></span>
                </div>
                <ul class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                
                    <li class="text-right font-xs font-500 dropdown-element inactive block-mode color-secondary">Workspaces</li>
                    <li class="text-right font-xs font-300 dropdown-element block-mode color-primary cursor-pointer">Sales Approach</li>

                    <div class="text-right color-grey block-mode divider"></div>

                    <li class="text-right flex-end font-xs font-300 dropdown-element block-mode rounded-xs cursor-pointer full-center color-primary fill-primary" id="logoutButton">
                        Logout
                        ${doorIcon}
                    </li>

                </ul>
            </div>

        </div>
        
    </div>
`