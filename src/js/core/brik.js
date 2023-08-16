
// Ephemeral Hash
const genHex = (a) => Math.random().toString(16).slice(2, (a + 2));

let brikStyleSheet = `
@import url('https://fonts.googleapis.com/css2?family=Edu+SA+Beginner:wght@500&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

:root {
    --white-color: #FFF;
    --black-color: #000;
    --black-color-rgb: 0, 0, 0;
    --red-color: #ff4444;
    --blue-color: #446dff;
    --violet-color: #570DF2;
    --rgb-shadow: 0, 0, 0;
    --shadow-opacity: 0.07;
    --shadow-opacity-hover: 0.1;
    --tint-color: #FF622C;
    --bg-body-color: #FCFEFB;
    --primary-color: #181A22;
    --secondary-color: #898D9A;
    --tertiary-color: #F6F7F8;

    --rounded-s: 1vh;
    --rounded-m: 1.5vh;
    --rounded-l: 2vh;
    --rounded-xl: 2.5vh;
    --rounded-xxl: 3vh;
}

html[data-theme='light'] {
    --bg-body-color: #FCFEFB;
    --primary-color: #181A22;
    --secondary-color: #898D9A;
    --tertiary-color: #F6F7F8;
    --violet-color: #601CF2;
    --rgb-shadow: 0, 0, 0;
    --shadow-opacity: 0.07;
    --shadow-opacity-hover: 0.1
}

html[data-theme='dark'] {
    --bg-body-color: #111317;
    --primary-color: #EAEDF2;
    --secondary-color: #898D9A;
    --tertiary-color: #2A2C33;
    --tint-color: #FF7742;
    --shadow-opacity: 0.15;
    --shadow-opacity-hover: 0.3
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

.min-w-250{
    min-width: 250px !important;
}

.board {
    padding: 0;
}

.land {
    padding: 0 10% 0 10%;
    margin: auto;
}

.smooth-300 {
    transition: .3s;
}

.smooth-100 {
    transition: .1s;
}

.shadow-one {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
}

.shadow-dynamic {
    transition: .2s;
    box-shadow: 0px 0px 10px rgba(var(--black-color-rgb), var(--shadow-opacity));
}

.shadow-dynamic:hover {
    transition: .2s;
    box-shadow: 0px 2px 13px rgba(var(--black-color-rgb), var(--shadow-opacity-hover));
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

/* Focus */

.over-mark {
    opacity: .7;
}

.over-mark:hover {
    opacity: 1;
}

/* Overflow managing */

.overflow-hidden {
    overflow: hidden;
}

.overflow-auto {
    overflow: auto;
}

.overflow-scroll {
    overflow: scroll;
}

/* View parameters */

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
    /* Remove bullets */
}

.no-padded {
    padding: 0;
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

.xs-margin {
    padding: 5px;
}

.s-margin {
    padding: 10px;
}

.margin {
    padding: 20px;
}

.x-margin {
    padding: 30px;
}

/* Positions */

.stick-top {
    position: sticky;
    top: 0;
}

.stick-bottom {
    position: sticky;
    bottom: 0;
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

/* Colors */

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

.bg-primary {
    background-color: var(--primary-color);
}

.bg-secondary {
    background-color: var(--secondary-color);
}

.bg-tertiary {
    background-color: var(--tertiary-color);
}

.hover-fill-tint:hover {
    fill: var(--tint-color) !important;
}

.hover-color-tint:hover {
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

/* Font styles, sizes & weights */

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

.ultra-over-mark {
    background-color: rgba(255, 87, 69, 0);
}

.ultra-over-mark:hover {
    background-color: var(--tertiary-color);
}

.ultra-over-mark:focus {
    background-color: var(--tint-color);
}

.ultra-over-mark:active {
    background-color: var(--tint-color) !important;
    color: var(--white-color) !important;
}

.flex-wrap {
    flex-wrap: wrap;
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

.dropdown {
    text-decoration: none;
    position: relative;
    display: inline-block;
    align-self: center;
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

.dropdown-left {
    left: 0;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    z-index: 1;
}

.dropdown-right {
    right: 0;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    z-index: 1;
}

.dropdown-element {
    padding: 5px 10px 5px 10px;
}

.selected {
    background-color: var(--tint-color) !important;
    color: var(--white-color) !important;
}

.dropdown:hover .dropdown-left {
    visibility: visible;
    opacity: 1;
}

.dropdown:hover .dropdown-right {
    visibility: visible;
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

.height-50 {
    height: 50vh;
}

.height-100 {
    height: 100vh;
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

.badge {
    padding: 2px 7px 3px 7px;
}

.btn {
    background: transparent;
    display: flex;
    text-decoration: none;
    border: none;
    font-size: medium;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}

.btn:hover {
    opacity: .8;
}



.btn-primary {
    background-color: var(--primary-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--bg-body-color);
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
    color: var(--primary-color);
}

.btn-rock {
    background-color: var(--violet-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--white-color);
}

.btn-secondary {
    background-color: var(--secondary-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--bg-body-color);
}

.btn-tertiary {
    background-color: var(--tertiary-color);
    padding: 10px;
    border-radius: var(--rounded-s);
    color: var(--primary-color);
}

.underlined {
    text-decoration: underline;
}

.grayscale {
    filter: grayscale(100%);
}

.border-none {
    border: none;
}

.border-solid-xs {
    border-width: .5px;
    border-style: solid;
}

.border-solid {
    border-width: 1px;
    border-style: solid;
}

.border-dashed-xs {
    border-width: .5px;
    border-style: dashed;
}

.border-dashed {
    border-style: dashed;
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

.absolute {
    position: absolute;
}

.placeholder-secondary::placeholder {
    color: var(--secondary-color);
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
                console.log(`Building ${attributeName} brik.`);
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

