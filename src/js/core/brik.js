

let brikStyleSheet = `
@import url('https://fonts.googleapis.com/css2?family=Edu+SA+Beginner:wght@500&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

:root {
    --white-color: #FFF;
    --black-color: #000;
    --black-color-rgb: 0, 0, 0;
    --white-color-rgb: 255, 255, 255;
    --red-color: #ff4444;
    --blue-color: #446dff;
    --cyan-color: #44f6ff;
    --violet-color: #570DF2;
    --shadow-opacity: 0.07;
    --shadow-opacity-hover: 0.1;
    --glow-opacity: 0.15;
    --glow-opacity-hover: 0.25;
    --tint-color: #FF622C;
    --bg-body-color: #FCFEFB;
    --bg-body-color-rgb: 252, 254, 251; 
    --primary-color: #181A22;
    --primary-color-rgb: 24,26,34;

    --secondary-color: #898D9A;
    --tertiary-color: #F6F7F8;

    --rounded-s: 1vh;
    --rounded-m: 1.5vh;
    --rounded-l: 2vh;
    --rounded-xl: 2.5vh;
    --rounded-xxl: 3vh;

    --padded-s: 5px;
    --padded-m: 10px;
    --padded-l: 15px;
    --padded-xl: 20px;
    --padded-xxl: 30px;
}

html[data-theme='light'] {
    --bg-body-color: #FCFEFB;
    --bg-body-color-rgb: 252, 254, 251; 
    --primary-color: #181A22;
    --primary-color-rgb: 24,26,34;
    --secondary-color: #898D9A;
    --tertiary-color: #F6F7F8;
    --violet-color: #601CF2;
    --glow-opacity: 0.15;
    --glow-opacity-hover: 0.25;
}

html[data-theme='dark'] {
    --bg-body-color: #111317;
    --bg-body-color-rgb: 17, 19, 23; 
    --primary-color: #EAEDF2;
    --primary-color-rgb: 234, 237, 242;
    --secondary-color: #898D9A;
    --tertiary-color: #2A2C33;
    --tint-color: #FF7742;
    --shadow-opacity: 0.3;
    --shadow-opacity-hover: 0.6;
    --glow-opacity: 0.03;
    --glow-opacity-hover: 0.07;
}

[data-theme='light'] .d-block-light,
[data-theme='dark'] .d-block-dark {
    display: block !important;
}

html {
    background-color: var(--bg-body-color);
    scroll-behavior: smooth;
}

* {
    font-family: 'IBM Plex Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.avatar-m {
    width: 30px;
    height: 30px;
    border-radius: 15px;
}

.avatar-s {
    width: 22px;
    height: 22px;
    border-radius: 11px;
}

.min-w-250{
    min-width: 250px !important;
}

.max-w-350{
    max-width: 350px !important;
}

.board {
    padding: 0;
}

.land {
    padding: 0 10% 0 10%;
    margin: auto;
}

.transition-smooth {
    transition: .25s;
}

.shadow-one {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
}

.shadow-dynamic {
    transition: .2s;
    box-shadow: 0px 0px 7px rgba(var(--black-color-rgb), var(--shadow-opacity));
}

.shadow-dynamic:hover {
    transition: .2s;
    box-shadow: 0px 2px 10px rgba(var(--black-color-rgb), var(--shadow-opacity-hover));
}

.glow-dynamic {
    transition: .2s;
    box-shadow: 0px 0px 10px rgba(var(--white-color-rgb), var(--glow-opacity));
}

.glow-dynamic:hover {
    transition: .2s;
    box-shadow: 0px 2px 13px rgba(var(--white-color-rgb), var(--glow-opacity-hover));
}

.shadow-two {
    box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.2);
}

/* Redondeo */

.rounded-s {
    border-radius: var(--rounded-s);
}

.rounded {
    border-radius: var(--rounded-m);
}

.rounded-l {
    border-radius: var(--rounded-l);
}

.rounded-xl {
    border-radius: var(--rounded-xl);
}

.rounded-max {
    border-radius: var(--rounded-xxl);
}

.overflow-hidden {
    overflow: hidden;
}

.overflow-auto {
    overflow: auto;
}

.overflow-scroll {
    overflow: scroll;
}

.overflow-y-hidden {
    overflow-y: hidden !important;
}

.cursor-pointer {
    cursor: pointer;
}

.cursor-help {
    cursor: help;
}

.block-mode {
    display: block;
    white-space: nowrap;
}

.no-wrap {
    white-space: nowrap;
}

.no-bullets {
    list-style-type: none;
}

.xs-padded {
    padding: 5px;
}

.s-padded {
    padding: 10px;
}

.padded {
    padding: 20px;
}

.x-padded {
    padding: 30px;
}

.no-padded-top {
    padding-top: 0;
}

.no-padded-bottom {
    padding-bottom: 0;
}

.no-padded-left {
    padding-left: 0;
}

.no-padded-right {
    padding-right: 0;
}

.xs-margin {
    margin: 5px;
}

.s-margin {
    margin: 10px;
}

.margin {
    margin: 20px;
}

.x-margin {
    margin: 30px;
}

.absolute {
    position: absolute;
}

.fixed {
    position: fixed;
}

.sticky {
    position: sticky;
}

.to-left {
    left: 0;
}

.to-right {
    right: 0;
}

.to-bottom {
    bottom: 0;
}

.to-top {
    top: 0;
}

.full-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.spaced {
    justify-content: space-between;
}

.flex-start {
    justify-content: flex-start;
}

.flex-end {
    justify-content: flex-end;
}

.justify-center {
    justify-content: center;
}

.vertical-center {
    align-self: center;
    justify-content: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

.text-center {
    text-align: center;
}

.flex-row {
    flex-direction: row;
}

.flex-row-reverse {
    flex-direction: row-reverse;
}

.flex-col {
    flex-direction: column;
}

.flex-col-reverse {
    flex-direction: column-reverse;
}

.hover-fill-tint:hover {
    fill: var(--tint-color) !important;
}

.hover-color-tint:hover {
    color: var(--tint-color) !important;
}

.focus-fill-tint:focus {
    fill: var(--tint-color) !important;
}

.focus-color-tint:focus {
    color: var(--tint-color) !important;
}

.color-black {
    color: var(--black-color);
}

.color-tint {
    color: var(--tint-color);
}

.color-body {
    color: var(--bg-body-color);
}

.color-primary {
    color: var(--primary-color);
}

.color-secondary {
    color: var(--secondary-color);
}

.color-tertiary {
    color: var(--tertiary-color);
}

.color-alert {
    color: var(--red-color);
}

.color-info {
    color: var(--blue-color);
}

.color-rock {
    color: var(--violet-color);
}

.fill-white {
    fill: var(--white-color);
}

.fill-black {
    fill: var(--black-color);
}

.fill-alert {
    fill: var(--red-color);
}

.fill-body {
    fill: var(--bg-body-color);
}

.fill-tint {
    fill: var(--tint-color);
}

.fill-rock {
    fill: var(--violet-color);
}

.fill-primary {
    fill: var(--primary-color);
}

.fill-secondary {
    fill: var(--secondary-color);
}

.fill-tertiary {
    fill: var(--tertiary-color);
}

.font-100 {
    font-weight: 100;
}

.font-200 {
    font-weight: 200;
}

.font-300 {
    font-weight: 300;
}

.font-400 {
    font-weight: 400;
}

.font-500 {
    font-weight: 500;
}

.font-600 {
    font-weight: 600;
}

.font-700 {
    font-weight: 700;
}

.font-800 {
    font-weight: 800;
}

.font-900 {
    font-weight: 900;
}

.font-xs {
    font-size: smaller;
}

.font-s {
    font-size: small;
}

.font-m {
    font-size: medium;
}

.font-l {
    font-size: large;
}

.font-xl {
    font-size: larger;
}

.font-xxl {
    font-size: xx-large;
}

.font-xxxl {
    font-size: 50px
}

.italic {
    font-style: italic;
}

.land-flag {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10% 0 10%;
    margin: auto;
    width: auto;
    height: auto;
}

.flex-wrap {
    flex-wrap: wrap;
}

.xs-gap {
    grid-gap: 5px;
}

.s-gap {
    grid-gap: 10px;
}

.m-gap {
    grid-gap: 20px;
}

.l-gap {
    grid-gap: 40px;
}

.fixed-bottom {
    position: fixed;
    bottom: 0;
}

.decoration-none {
    text-decoration: none;
}

.z-0 {
    z-index: 0;
}

.z-1 {
    z-index: 1;
}

.z-2 {
    z-index: 2;
}

.z-3 {
    z-index: 3;
}

.z-i {
    z-index: 999;
}

.o-2 {
    opacity: .2;
}

.o-4 {
    opacity: .4;
}

.o-6 {
    opacity: .6;
}

.o-8 {
    opacity: .8;
}

.o-0 {
    opacity: 0;
}

.child {
    opacity: 0;
}

.show-my-child:hover .child {
    opacity: 1;
}

.box-to-border {
    box-sizing: border-box;
}

.brick {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}

.responsive-1 {
    height: fit-content;
    width: 100%;
}

.responsive-2 {
    height: fit-content;
    width: 50%;
}

.responsive-3 {
    height: fit-content;
    width: 33.33333333%;
}

.responsive-4 {
    height: fit-content;
    width: 25%;
}

.responsive-5 {
    height: fit-content;
    width: 20%;
}

.responsive-6 {
    height: fit-content;
    width: 16.66666667%;
}

.steady-1 {
    display: flex;
    width: 100%;
}

.steady-2 {
    display: flex;
    width: 50%;
}

.steady-3 {
    display: flex;
    width: 33.33%;
}

.steady-4 {
    display: flex;
    width: 25%;
}

.steady-5 {
    display: flex;
    width: 20%;
}

.min-height-50 {
    min-height: 50vh;
}

.height-100 {
    height: 100vh;
}

.on-mobile-pass {
    visibility: visible;
}

@media only screen and (max-width: 1600px) {
    .land-flag {
        padding: 0 15% 0 15%;
    }

    .land {
        padding: 0 15% 0 15%;
    }
}

@media only screen and (max-width: 1200px) {
    .land-flag {
        padding: 0 40px 0 40px;
    }

    .land {
        padding: 0 40px 0 40px;
    }
}

@media only screen and (max-width: 1100px) {
    .land-flag {
        padding: 0 30px 0 30px;
    }

    .land {
        padding: 0 30px 0 30px;
    }
}

@media only screen and (max-width: 900px) {

    .on-mobile-pass {
        visibility: collapse;
        display: none;
    }

    .responsive-4 {
        width: 50%;
    }

    .responsive-5 {
        width: 50%;

    }

    .responsive-6 {
        width: 33.33333333%;
    }
}

@media only screen and (max-width: 600px) {

    .land-flag {
        padding: 0 20px 0 20px;
    }

    .land {
        padding: 0 20px 0 20px;
    }

    .brick {
        min-width: 250px;
    }

    .responsive-2 {
        width: 100%;
    }

    .responsive-3 {
        width: 100%;
    }

    .responsive-4 {
        width: 100% - 20px;
    }

    .responsive-5 {
        width: 100% - 20px;
    }

    .responsive-6 {
        width: 50% - 20px;
    }
}

.float-left {
    float: left;
}

.float-right {
    float: right;
}

.btn {
    background: transparent;
    display: flex;
    text-decoration: none;
    border: none;
    font-size: small;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}

.btn-primary {
    background-color: var(--primary-color);
    padding: var(--padded-m);
    border-radius: var(--rounded-s);
    color: var(--bg-body-color);
    fill: var(--bg-body-color);
    border: solid .7px var(--secondary-color);
}

.btn-primary:hover {
    border: solid .7px var(--primary-color);
}

.btn-secondary {
    background-color: var(--bg-body-color);
    padding: var(--padded-m);
    border-radius: var(--rounded-s);
    color: var(--secondary-color);
    fill: var(--secondary-color);
}

.btn-secondary:hover {
    color: var(--primary-color);
    fill: var(--primary-color);
}

.btn-tint {
    background-color: var(--tint-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--white-color);
}

.btn-danger {
    background-color: var(--red-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--white-color);
}

.btn-rock {
    background-color: var(--violet-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--white-color);
}


.btn-tertiary {
    background-color: var(--tertiary-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--primary-color);
}


.pastel1 {
    background: none;
    background-color: #C1EBC0;
    color: var(--black-color);
}

.pastel2 {
    background: none;
    background-color: #C7CAFF;
    color: var(--black-color);
}

.pastel3 {
    background: none;
    background-color: #FAFABE;
    color: var(--black-color);
}

.pastel4 {
    background: none;
    background-color: #F6C2F3;
    color: var(--black-color);
}

.bg-g-penny {
    background: linear-gradient(90deg, #21D4FD 0%, #B721FF 100%);
}

.bg-g-melon {
    background: linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%);
}

.bg-g-forest {
    background: linear-gradient( 90deg,  rgba(61,131,97,1) 0%, rgba(28,103,88,1) 100% );
}

.bg-g-rainbow {
    background: linear-gradient(90deg, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%);
}

.bg-none {
    background: none;
    background-color: none;
}

.bg-white {
    background-color: var(--white-color);
}

.bg-black {
    background-color: var(--black-color);
}

.bg-body {
    background-color: var(--bg-body-color);
}

.bg-body-o {
    background-color: rgba(var(--bg-body-color-rgb) , 0.6);
}

.bg-primary {
    background-color: var(--primary-color);
}

.bg-secondary {
    background-color: var(--secondary-color);
}

.bg-tertiary {
    background-color: var(--tertiary-color);
}


.underlined {
    text-decoration: underline;
}

.grayscale {
    filter: grayscale(100%);
}

.border-solid {
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
}

.border-solid-s {
    border-width: .5px;
    border-style: solid;
    border-color: transparent;
}

.border-dashed {
    border-style: dashed;
    border-color: transparent;
}

.border-tint {
    border-color: var(--tint-color);
}

.border-body {
    border-color: var(--bg-body-color);
}

.border-red {
    border-color: var(--red-color);
}

.border-primary {
    border-color: var(--primary-color);
}

.border-secondary {
    border-color: var(--secondary-color);
}

.border-tertiary {
    border-color: var(--tertiary-color);
}

.border-rock {
    border-color: var(--violet-color);
}

.border-cyan {
    border-color: var(--cyan-color);
}

.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.modal-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.notification-modal {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
}

.blur-behind {
    backdrop-filter: blur(5px);
}

.placeholder-secondary::placeholder {
    color: var(--secondary-color);
}

.dropdown-element {
    border-radius: var(--rounded-s);
    padding: 5px 10px 5px 10px;
}

.dropdown-element:hover {
    background-color: var(--tertiary-color);
}

.dropdown-element:focus {
    background-color: var(--tint-color);
}

.dropdown-element:active {
    background-color: var(--tint-color) !important;
    color: var(--white-color) !important;
}

.inactive {
    cursor: default !important;
    background-color: transparent !important;
}

.dropbtn {
    border: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown .dropbtn{
    display: flex;
    align-items: center;
    justify-content: center;
}

.h-center {
    align-items: center;
}

.dropdown-content {
    display: none;
    overflow: auto;
}

.drop-right{
    right: 0;
}

.display-block {
    display: block;
}

.display-flex {
    display: flex;
}

.display-none {
    display: none;
}

.divider{
    border-bottom: 1px solid var(--tertiary-color);
    width: auto;
    margin: 4px 10px 4px 10px;
}

.selected {
    background-color: var(--tint-color) !important;
    color: var(--white-color) !important;
}
`;

(function () {

    // Append styles
    var styleElement = document.createElement("style");
    styleElement.textContent = brikStyleSheet
    document.head.appendChild(styleElement);

    // Construct briks
    const briks = document.getElementsByTagName("brik")
    if (briks) {
        for (let i = 0; i < briks.length; i++) {
            const attributes = briks[i].attributes;
            for (let j = 0; j < attributes.length; j++) {
                const attributeName = attributes[j].name;
                briks[i].innerHTML = eval(attributeName)
                window.dispatchEvent(new Event("brikChange"));
            }
        }
    }

    // Set theme based on user preferences
    const currentTheme = localStorage.getItem("theme");
    let themeValue = currentTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    let sun = document.getElementById("sun")
    let moon = document.getElementById("moon")
    let themeButton = document.querySelector("#theme-btn")

    function reflectPreference() {
        localStorage.setItem("theme", themeValue)
        document.firstElementChild.setAttribute("data-theme", themeValue)
        themeButton?.setAttribute("aria-label", themeValue)
        if (sun) {sun.style.display = themeValue === "dark" ? "none" : "block";}
        if (moon) {moon.style.display = themeValue === "dark" ? "block" : "none";}
    }
    reflectPreference()
    
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: e }) => {
        themeValue = e ? "dark" : "light"
        reflectPreference()
    });

    themeButton?.addEventListener("click", () => {
        themeValue = "light" === themeValue ? "dark" : "light"
        reflectPreference()
    })

})();

// Ephemeral Hash
const genHex = (a) => Math.random().toString(16).slice(2, (a + 2));

// Hide all dropwdowns
function hideAllDropdowns(){
    var dropdowncontainers = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowncontainers.length; i++) {
        var openDropdown = dropdowncontainers[i];
        if (openDropdown.classList.contains('display-block')) {
            openDropdown.classList.remove('display-block');
        }
    }
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropbtn')) {
        hideAllDropdowns();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var dropBtns = document.querySelectorAll(".dropbtn");
    
    dropBtns.forEach(function(dropBtn) {
        dropBtn.addEventListener("click", function() {
            var dropdownContent = dropBtn.nextElementSibling;
            dropdownContent.classList.toggle("display-block");
        });
    });
});

