
var coordinator =`
    
    <div id='coordinatorModal' class="modal z-i full-center blur-behind smooth-300 display-none">

    <div style='max-width: 250px' class="max-w-350 bg-body z-2 padded rounded brick flex-col s-gap shadow-one">

        <li onclick='toggleCoordinatorModal()' class="${dropdownElementClass}">
        ${arrowBackIcon}
        Back
        </li>

        <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-primary">Theme</li>
        <li id="theme-btn" class="full-center ${dropdownElementClass}">
            <span>${sunIcon}${moonIcon}</span>
        </li>

        <div class="text-center color-grey block-mode divider"></div>

        <div class="btn display-flex cursor-pointer">
            <span class='avatar-m shadow-dynamic bg-primary'></span>
        </div>

        <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-primary">
            Your Public Key
        </li>
        <li onclick='copyPublicKeyToClipboard()' class="steady-1 overflow-scroll ${dropdownElementClass}">
            <span id='coordinatorPubkey' class="overflow-scroll">
            </span>
            <span class='s-padded no-padded-top no-padded-bottom no-padded-right'>
                ${copyIcon}
            </span>
        </li>

        <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-primary">
            Your Private Key
        </li>
        <li onclick='copyPrivateKeyToClipboard()' class="steady-1 overflow-scroll ${dropdownElementClass}">
            <span class="overflow-scroll">
            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
            </span>
            <span class='s-padded no-padded-top no-padded-bottom no-padded-right'>
                ${copyIcon}
            </span>
        </li>

        <li class="text-center font-xs font-500 dropdown-element inactive block-mode color-primary">
            Relay URL
        </li>
        <li onclick='copyPrivateKeyToClipboard()' class="steady-1 overflow-scroll ${dropdownElementClass}">
            <span id='urlRelayField' class="overflow-scroll">
            wss://
            </span>
        </li>
        
        <small class='text-left font-300 font-s color-secondary'>Keep this key in a safe place but do not lose it, if you do you will lose all your data.</small>

        <div class="text-center color-grey block-mode divider"></div>

        <li onclick="toggleConfirmationLogoutModal()" class="full-center ${dropdownElementClass}">
            Log out
            ${doorIcon}
        </li>

    </div>
    
</div>
`

var confirmationlogoutmodal =`
    
    <div id='confirmationLogoutModal' class="modal z-i full-center blur-behind smooth-300 display-none">

        <div style='max-width: 250px' class="max-w-350 bg-body z-2 padded rounded brick flex-col s-gap shadow-one">

            <h4 id="sheetModalIndicator" class="padded color-primary text-center">Are you sure you want to Log out? 🫠</h4> 
                
            <div class="flex-row display-flex s-gap flex-end">
                <button onclick="toggleConfirmationLogoutModal()" class="border-none cursor-pointer color-body font-m bg-primary rounded s-padded border-none" type="button">Cancel</button>
                <button onclick="logout()" class="border-none cursor-pointer color-white font-m bg-tint rounded s-padded border-none" type="submit">Log out</button>
            </div>
            

        </div>
    
</div>
`