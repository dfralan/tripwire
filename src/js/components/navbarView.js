let loomDropdownId = genHex(12);
let navUserDropdownId = genHex(12);

var navbar =`
<div class="bg-body stick-top z-3 s-padded spaced display-flex flex-row full-center s-gap">
    <div class="display-flex flex-row s-gap full-center s-padded no-padded-bottom no-padded-top">
        <!-- Left Sidebar -->
        <p onclick="showSideBar()" class='hover-bg-lighter btn cursor-pointer hover-fill-primary fill-secondary xs-padded rounded-s'>
            ${menuIcon}
        </p>

        <!-- Brand -->
        <div class="display-flex flex-row h-center">
            ${clipIcon}
            <p class="font-500 color-primary on-mobile-pass">Tripwire</p>
            <p class="font-500 color-primary on-mobile-show">Tw</p>
        </div>
    </div>

    <div class="display-flex flex-row s-gap flex-end h-center s-padded no-padded-bottom no-padded-top">

        <div class="hover-fill-primary display-flex flex-row h-center flex-end fill-secondary relative">
            <span class='z-1 full-center absolute xs-padded end-0'>
                ${filterIcon}
            </span>

            <input style='padding-right: 30px !important'
                class="responsive-1 s-padded-wide bg-tertiary border-none rounded-s placeholder-secondary font-s color-primary"
                type="text" id="boardFilter" placeholder="Filter">
        </div>

        <!-- Avatar Dropdown -->
        <!-- Dropdown button -->
        <div onclick='toggleCoordinatorModal()' class="btn display-flex cursor-pointer">
            <span class='avatar-m shadow-dynamic bg-primary'></span>
        </div>
    </div>
    
</div>


`