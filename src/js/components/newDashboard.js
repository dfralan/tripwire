var newdashboard = `

<div id="newDashboardModal" class="modal z-i full-center blur-behind smooth-300 display-flex flex-col s-gap display-none">
    <div class="display-flex flex-col max-w-350">
        ${newDashBoardSVG}
    </div>
    <p class='color-primary padded'>🫠 You didn't create any workspace yet</p>
    <button onclick="launchModalWorkspace('first')" class="border-none cursor-pointer color-black font-m bg-g-rainbow rounded s-padded">
        Create New Workspace
    </button>
    <p onclick="logout()" class='cursor-pointer color-primary fill-primary display-flex flex-row full-center'>
        Cancel
    </p>
</div>
`