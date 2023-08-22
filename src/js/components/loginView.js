var login =
`
<section id="loginSection" class="display-none">
    <div class="full-center flex-col m-gap height-100">
        <button id="showWelcomeSectionButton1" class="btn color-primary underlined">Go back</button>
        <div>
            <form id="loginForm" class="display-flex flex-row s-gap">
                <input id="pkInput" class="s-padded bg-tertiary border-secondary 
                border-solid rounded-s placeholder-secondary font-m color-primary" 
                type="password" autocomplete="new-password" placeholder="Your private key" value='d2cc1a8d2fd059021dfd37be4bf872e3b378e63e6099f93746db879046956014'>
                <button class="btn btn-primary" type="submit">Login</button>
            </form>
            <p class="color-alert" id="loginFormInfo"></p>
            <label class="color-primary grayscale"><input type="checkbox" id="showPassword"> Show Password</label>
        </div>
    </div>
</section>
`
