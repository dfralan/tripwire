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
        } else if (pkInput.startsWith('nsec')) {
            try {
                const hexKey = nsecToHex(pkInput); // function to decode nsec
                
                // Verificar que el hexKey es una clave privada válida (de 64 caracteres hexadecimales)
                if (isValidHexKey(hexKey)) {
                    localStorage.setItem("privKey", hexKey);
                    window.location.href = 'dashboard.html';
                } else {
                    loginFormInfo.innerHTML = "Invalid nsec key (invalid hex after conversion)";
                }
            } catch (error) {
                loginFormInfo.innerHTML = "Invalid nsec key";
            }
        } else {
            const response = (pkInput === "") ? "Insert a key" : "Invalid key";
            loginFormInfo.innerHTML = response;
        }
    });

    // Toggle password
    const showPasswordCheckbox = document.getElementById("showPassword");
    showPasswordCheckbox.addEventListener("change", function () {
        const pkInput = document.getElementById('pkInput')
        pkInput.type = this.checked ? "text" : "password";
    });

})();