(function () {

    // Form variables
    const loginForm = document.getElementById('loginForm');
    const loginFormInfo = document.getElementById('loginFormInfo')

    // Submit login listener
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const pkInput = document.getElementById('pkInput').value;
    
        if (isValidHexKey(pkInput)) {
            localStorage.setItem("privKey", pkInput);
            window.location.href = 'dashboard.html';
        } else {
            response = (pkInput === "") ? "Insert a key" : "Invalid key"
            loginFormInfo.innerHTML = response 
        }
    });

    // Toggle password
    const showPasswordCheckbox = document.getElementById("showPassword");
    showPasswordCheckbox.addEventListener("change", function () {
        const pkInput = document.getElementById('pkInput')
        pkInput.type = this.checked ? "text" : "password";
    });

})();