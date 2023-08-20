var toolbar =`
<div class="s-padded bg-body-o display-flex flex-wrap s-gap spaced shadow-one">

        <div class="display-flex flex-wrap s-gap s-padded no-padded-bottom no-padded-top">

            <div class="dropdown">
                <button class="dropbtn btn btn-secondary no-wrap">
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
                    <li class='${backgroundSwitcherClass}' raw='bg-tertiary'>
                        <div class='avatar-s shadow-dynamic bg-tertiary'></div>
                        &nbspBody
                    </li>
                    <li class='${backgroundSwitcherClass}' raw='bg-g-melon'>
                        <div class='avatar-s shadow-dynamic bg-g-melon'></div>
                        &nbspMelon
                    </li>
                    <li class='${backgroundSwitcherClass}' raw='bg-g-penny'>
                        <div class='avatar-s shadow-dynamic bg-g-penny'></div>
                        &nbspPenny
                    </li>
                    <li class='${backgroundSwitcherClass}' raw='bg-g-forest'>
                        <div class='avatar-s shadow-dynamic bg-g-forest'></div>
                        &nbspForest
                    </li>
                    <li class='${backgroundSwitcherClass}' raw='bg-g-rainbow'>
                        <div class='avatar-s shadow-dynamic bg-g-rainbow'></div>
                        &nbspRainbow
                    </li>

                </ul>
            </div>

            <!-- Show Clients List Button -->
            <button id="clientsBoardShowToggle" class="btn btn-secondary no-wrap">
                <span>Clients</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M180-217q60-56 135.896-90.5 75.897-34.5 164-34.5Q568-342 644-307.5 720-273 780-217v-563H180v563Zm302-204q58 0 98-40t40-98q0-58-40-98t-98-40q-58 0-98 40t-40 98q0 58 40 98t98 40ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm55-60h490v-9q-54-46-116-69.5T480-282q-67 0-129 23.5T235-189v9Zm247-301q-32.5 0-55.25-22.75T404-559q0-32.5 22.75-55.25T482-637q32.5 0 55.25 22.75T560-559q0 32.5-22.75 55.25T482-481Zm-2-18Z"/></svg>
            </button>

            <!-- Show drafts Button -->
            <button id="draftBoardShowToggle" class="btn btn-secondary no-wrap">
                <span>Draft </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M751-596 596-751l70-70q17-17 42-17t42 17l71 71q17 17 17 42t-17 42l-70 70ZM120-120v-156l194-194L93-692l174-176 223 223 106-106 155 155-106 106 223 223L693-94 471-315 276-120H120Zm237-393 90-90-73-73-48 48-42-42 48-48-64-64-90 90 179 179Zm334 335 90-90-64-64-48 48-42-42 48-48-73-73-90 90 179 179Zm-511-2h70l415-415-70-70-415 415v70Z"/></svg>
            </button>

        </div>
    </div>`