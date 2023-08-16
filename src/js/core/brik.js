
// Ephemeral Hash
const genHex = (a) => Math.random().toString(16).slice(2, (a + 2));

let brikStyleSheet = ``;

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

