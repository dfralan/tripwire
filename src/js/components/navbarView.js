let visualsDropdownId = genHex(12);
let loomDropdownId = genHex(12);
let navUserDropdownId = genHex(12);

var navbar =`
<div class="bg-body stick-top z-3 steady-1 s-padded spaced display-flex flex-wrap full-center">

    
        <!-- Brand -->
        
        <div class="display-flex flex-row full-center s-padded no-padded-bottom no-padded-top">
            ${clipIcon}
            <p class="font-500 color-primary">Tripwire</p>
        </div>

        <div class="display-flex flex-row s-gap full-center s-padded no-padded-bottom no-padded-top">

        <div id='${visualsDropdownId}' class="dropdown">
            <button onclick="toggleDropdown('${visualsDropdownId}')" class="btn btn-secondary no-wrap">
                ${contrastIcon}
                ${chevronDown}
            </button>
            <ul class="dropdown-content to-left z-1 absolute text-center rounded shadow-two bg-body xs-padded border-solid-s border-primary">

                <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-secondary">Theme</li>
                <li id="theme-btn" class="dropdown-element btn" id="logoutButton">
                    <span>${sunIcon}${moonIcon}</span>
                </li>

                <div class="text-center color-grey block-mode divider"></div>

                <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-secondary">Backgrounds</li>
                <li class='${backgroundSwitcherClass}' raw-theme='bg-tertiary'>
                    <div class='avatar-s shadow-dynamic bg-tertiary'></div>
                    &nbspBody
                </li>
                <li class='${backgroundSwitcherClass}' raw-theme='bg-g-penny'>
                    <div class='avatar-s shadow-dynamic bg-g-penny'></div>
                    &nbspPenny
                </li>
                <li class='${backgroundSwitcherClass}' raw-theme='bg-g-rainbow'>
                    <div class='avatar-s shadow-dynamic bg-g-rainbow'></div>
                    &nbspRainbow
                </li>

            </ul>
        </div>


            <!-- Language Switcher -->

            <loom id='${loomDropdownId}' class="dropdown">
                <button onclick="toggleDropdown('${loomDropdownId}')" class="display-flex btn btn-secondary no-wrap">
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

            <div id='${navUserDropdownId}' class="dropdown">
                <div onclick="toggleDropdown('${navUserDropdownId}')" class="btn display-flex cursor-pointer xs-padded">
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