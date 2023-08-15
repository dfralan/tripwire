
(function () {

    // if privatekey exist on local storage redirects dashboard
    const privKey = localStorage.getItem("privKey")
    if (privKey){
        if (isValidHexKey(privKey)){
            window.location.href = 'dashboard.html';
        } else {
            return
        }
    }

    // All the sections as elements and the triggers
    const welcomeSection = document.getElementById('welcomeSection')
    const loginSection = document.getElementById('loginSection')
    const registerSection = document.getElementById('registerSection')
    const showLoginSectionButton = document.getElementById('showLoginSectionButton')
    const showRegisterSectionButton = document.getElementById('showRegisterSectionButton')
    const showWelcomeSectionButton1 = document.getElementById('showWelcomeSectionButton1')
    const showWelcomeSectionButton2 = document.getElementById('showWelcomeSectionButton2')

    // Hide all sections
    function hideAllSections() {
        welcomeSection.classList.add("display-none");
        welcomeSection.classList.remove("display-block");
        loginSection.classList.add("display-none");
        loginSection.classList.remove("display-block");
        registerSection.classList.add("display-none");
        registerSection.classList.remove("display-block");
    }

    // Show login section
    showLoginSectionButton.addEventListener("click", function() {
        hideAllSections()
        loginSection.classList.add("display-block");
        loginSection.classList.remove("display-none");
    });

    // Show register section
    showRegisterSectionButton.addEventListener("click", function() {
        hideAllSections()
        registerSection.classList.add("display-block");
        registerSection.classList.remove("display-none");
    });

    // Show register section from login
    showWelcomeSectionButton1.addEventListener("click", function() {
        hideAllSections()
        welcomeSection.classList.add("display-block");
        welcomeSection.classList.remove("display-none");
    });

    // Show welcome section from register zone
    showWelcomeSectionButton2.addEventListener("click", function() {
        hideAllSections()
        welcomeSection.classList.add("display-block");
        welcomeSection.classList.remove("display-none");
    });

})();