var sidebar = `
<div id="sidebar" style="transform: translateX(-350px); width: 350px;" class="hided transition-smooth shadow-one sidebar z-i fixed bottom-0 start-0 bg-body height-100 rounded-end display-flex flex-col spaced border-solid border-secondary border-left-none">
    
<div class="w-100 display-flex flex-col padded s-gap rounded-top-end bg-tertiary">
    <div class="display-flex flex-row spaced h-center">
        <div>
            <svg  class="fill-tint" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M460-80q-91 0-155.5-62.5T240-296v-430q0-64 45.5-109T395-880q65 0 110 45t45 110v394q0 38-26 64.5T460-240q-38 0-64-28.5T370-336v-372q0-8 6-14t14-6q8 0 14 6t6 14v375q0 22 14.5 37.5T460-280q21 0 35.5-15t14.5-36v-395q0-48-33.5-81T395-840q-48 0-81.5 33T280-726v432q0 73 53 123.5T460-120q75 0 127.5-51T640-296v-412q0-8 6-14t14-6q8 0 14 6t6 14v411q0 91-64.5 154T460-80Z"/></svg>
        </div>
        <div onclick="hideSideBar()" class="hover-bg-lighter full-center rounded-s xs-padded cursor-pointer hover-fill-primary fill-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>
        </div>
    </div>
</div>

<div class="w-100 display-flex flex-col padded color-secondary s-padded">
    <div class="display-flex flex-row spaced xs-padded no-padded-left no-padded-right ">
        <h4 class="font-s font-600 color-secondary rounded-s">Workspaces</h4>
        <button onclick="launchModalWorkspace('')" class="display-none border-none bg-tint color-white full-center text-center display-flex flex-row font-s font-500 s-padded-wide rounded no-wrap cursor-pointer">+ Add new</button>

    </div>
    
    <div class="sidebarContent w-100 display-flex flex-col s-gap">
    </div>
    <div class="border-solid border-secondary border-top-none border-left-none border-right-none">
    </div>
</div>


<div class="display-flex flex-col padded s-gap bg-tertiary rounded-bottom-end">
    <div class="display-flex flex-row s-gap">
        <a class="color-tint text-decoration-none font-xs" href="https://github.com/dfralan/tripwire">Github</a>
        <a class="color-tint text-decoration-none font-xs" href="https://github.com/dfralan/teller">Teller</a>
        <a class="color-tint text-decoration-none font-xs" href="https://getloom.co">Loom SS</a>
    </div>
    <small class="font-xxs color-secondary">
        © 2023 Tripwire by Teller.
    </small>
</div>

</div>
`