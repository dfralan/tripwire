var navbar =
`
<div class="bg-body stick-top z-3">
    <div class="steady-1 padded m-gap">

        <!-- Brand -->
        
        <div class="display-flex flex-row decoration-none">
            <svg  class="fill-rock" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28"><path d="M460-80q-91 0-155.5-62.5T240-296v-430q0-64 45.5-109T395-880q65 0 110 45t45 110v394q0 38-26 64.5T460-240q-38 0-64-28.5T370-336v-372q0-8 6-14t14-6q8 0 14 6t6 14v375q0 22 14.5 37.5T460-280q21 0 35.5-15t14.5-36v-395q0-48-33.5-81T395-840q-48 0-81.5 33T280-726v432q0 73 53 123.5T460-120q75 0 127.5-51T640-296v-412q0-8 6-14t14-6q8 0 14 6t6 14v411q0 91-64.5 154T460-80Z"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-84 0-157-31.5T196-197q-54-54-85-127.5T80-482q0-84 31-156.5T196-765q54-54 127-84.5T480-880q84 0 157 30.5T764-765q54 54 85 126.5T880-482q0 84-31 157.5T764-197q-54 54-127 85.5T480-80Zm0-58q35-36 58.5-82.5T577-331H384q14 60 37.5 108t58.5 85Zm-85-12q-25-38-43-82t-30-99H172q38 71 88 111.5T395-150Zm171-1q72-23 129.5-69T788-331H639q-13 54-30.5 98T566-151ZM152-391h159q-3-27-3.5-48.5T307-482q0-25 1-44.5t4-43.5H152q-7 24-9.5 43t-2.5 45q0 26 2.5 46.5T152-391Zm221 0h215q4-31 5-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4 31-5 49.5t-1 38.5q0 21 1 40.5t5 50.5Zm275 0h160q7-24 9.5-44.5T820-482q0-26-2.5-45t-9.5-43H649q3 35 4 53.5t1 34.5q0 22-1.5 41.5T648-391Zm-10-239h150q-33-69-90.5-115T565-810q25 37 42.5 80T638-630Zm-254 0h194q-11-53-37-102.5T480-820q-32 27-54 71t-42 119Zm-212 0h151q11-54 28-96.5t43-82.5q-75 19-131 64t-91 115Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-360 280-559h400L480-360Z"/></svg>
                </button>
                <ul loom-list class="dropdown-right text-right rounded m-font font-200 shadow-two bg-body xs-padded border-solid-xs border-tertiary">
                    <li loom-language="ar" class="dropdown-element ultra-over-mark block-mode color-secondary rounded-xs cursor-pointer"></li>
                    <li loom-language="us" class="dropdown-element ultra-over-mark block-mode color-secondary rounded-xs cursor-pointer"></li>
                    <li loom-language="br" class="dropdown-element ultra-over-mark block-mode color-secondary rounded-xs cursor-pointer"></li>
                    <li loom-language="fr" class="dropdown-element ultra-over-mark block-mode color-secondary rounded-xs cursor-pointer"></li>
                </ul>
            </loom>
            
            <!-- Theme -->
            <a id="theme-btn" class="full-center cursor-pointer decoration-none">
                <span>
                    <svg id="sun" class="fill-secondary hover-fill-tint" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-120q-150 0-255-105T120-480q0-135 79.5-229T408-830q41-8 56 14t-1 60q-9 23-14 47t-5 49q0 90 63 153t153 63q25 0 48.5-4.5T754-461q43-16 64 1.5t11 59.5q-27 121-121 200.5T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.667 16.5Q688.667-384 660-384q-114.689 0-195.345-80.655Q384-545.311 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z"/></svg>
                    <svg id="moon" class="fill-secondary hover-fill-tint" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M479.765-340Q538-340 579-380.765q41-40.764 41-99Q620-538 579.235-579q-40.764-41-99-41Q422-620 381-579.235q-41 40.764-41 99Q340-422 380.765-381q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM70-450q-12.75 0-21.375-8.675Q40-467.351 40-480.175 40-493 48.625-501.5T70-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170-450H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450H790ZM479.825-760Q467-760 458.5-768.625T450-790v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720Q467-40 458.5-48.625T450-70v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-170v100q0 12.75-8.675 21.375Q492.649-40 479.825-40ZM240-678l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217-786 226-777l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5-282q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743-174 734-183Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786-743 777-734l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897-182.897q-8.897-8.896-8.897-21.5Q174-217 183-226l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291-273 291-261t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480-480Z"/></svg>
                </span>
            </a>

            <!-- Logout button -->
            <button id="logoutButton" class="cursor-pointer full-center btn bg-none color-secondary fill-secondary hover-color-tint hover-fill-tint">Logout
                <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="23"><path d="M440.175-450q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-120v-60l280-49v-466q0-14-7.5-24.5T512-732l-252-39v-59l266 46q32 5 53 29.9t21 58.1v466q0 21.658-14.179 38.462Q571.642-174.734 550-171l-290 51Zm0-60h440v-590l-440-1v591Zm-110 60q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150-180h50v-590q0-24.75 17.625-42.375T260-830h440q24.75 0 42.375 17.625T760-770v590h50q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810-120H150Z"/></svg>
            </button>

        </div>
        
    </div>
</div>
`
