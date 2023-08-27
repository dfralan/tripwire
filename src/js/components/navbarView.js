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

    <div class="display-flex flex-wrap s-gap full-center s-padded no-padded-bottom no-padded-top">

    <div class="display-flex flex-row full-center s-padded no-padded-bottom no-padded-top fill-secondary">
    <span class='z-i full-center'>
        ${filterIcon}
    </span>
    
    <input style='margin-left: -30px; padding-left: 35px !important' class="s-padded bg-body rounded border-solid border-tertiary shadow-dynamic placeholder-secondary font-s color-primary" type="text" id="filterInput" placeholder="Filter">
</div>
        
        <!-- Visuals Dropdown -->
        <div id='${visualsDropdownId}' class="dropdown">
            <!-- Dropdown button -->
            <button onclick="toggleDropdown('${visualsDropdownId}')" class="btn btn-secondary no-wrap">
                ${contrastIcon}
                ${chevronDown}
            </button>
            <!-- Dropdown content -->
            <ul class="dropdown-content to-right z-1 absolute text-center rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                <!-- Theme -->
                <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-secondary">Theme</li>
                <li id="theme-btn" class="dropdown-element btn">
                    <span>${sunIcon}${moonIcon}</span>
                </li>
                <div class="text-center color-grey block-mode divider"></div>
                <!-- Backgrounds -->
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
            <!-- Dropdown button -->
            <button onclick="toggleDropdown('${loomDropdownId}')" class="display-flex btn btn-secondary no-wrap">
                <span loom-indicator></span>
                ${globeIcon}
                ${chevronDown}
            </button>
            <!-- Dropdown content -->
            <ul loom-list class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                <li loom-language="ar" class="${dropwdownElementClass}"></li>
                <li loom-language="us" class="${dropwdownElementClass}"></li>
                <li loom-language="br" class="${dropwdownElementClass}"></li>
                <li loom-language="fr" class="${dropwdownElementClass}"></li>
            </ul>
        </loom>

        <!-- Avatar Dropdown -->
        <div id='${navUserDropdownId}' class="dropdown">
            <!-- Dropdown button -->
            <div onclick="toggleDropdown('${navUserDropdownId}')" class="btn display-flex cursor-pointer xs-padded">
                <span class='avatar-m shadow-dynamic bg-primary'></span>
            </div>
            <!-- Dropdown content -->
            <ul style='min-width: 200px' class="dropdown-content to-right z-1 absolute text-right rounded shadow-two bg-body xs-padded border-solid-s border-primary">
                <li class="text-right font-xs font-500 dropdown-element inactive block-mode color-secondary">Workspaces</li>
                <li class="text-right font-xs font-300 dropdown-element block-mode color-primary cursor-pointer">Sales Approach</li>
                <div class="text-right color-grey block-mode divider"></div>
                <li onclick="launchModalWorkspace('')" class="text-right flex-end font-xs font-300 dropdown-element block-mode rounded-xs cursor-pointer full-center color-primary fill-primary">
                    New Workspace
                    ${boxIcon}
                </li>
                <div class="text-right color-grey block-mode divider"></div>
                <li onclick="logout()" class="text-right flex-end font-xs font-300 dropdown-element block-mode rounded-xs cursor-pointer full-center color-primary fill-primary">
                    Logout
                    ${doorIcon}
                </li>
            </ul>
        </div>
    </div>
    <!-- Missing closing div for the first "bg-body" div -->
</div>


`