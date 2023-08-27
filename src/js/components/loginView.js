var login =
`
<section id="loginSection" class="display-none">
    <div class="full-center flex-col m-gap height-100">
        <button id="showWelcomeSectionButton1" class="btn color-primary underlined">Go back</button>
        <div>
            <form id="loginForm" class="display-flex flex-row s-gap">
                <input id="pkInput" class="s-padded bg-tertiary border-secondary 
                border-solid rounded-s placeholder-secondary font-m color-primary" 
                type="password" autocomplete="new-password" placeholder="Your private key" value='6bf248b2f0c5e1e5b1743b666b6577c8431edbb6371f2c3c7527c651193be9be'>
                <button class="btn btn-primary" type="submit">Login</button>
            </form>
            <p class="color-alert" id="loginFormInfo"></p>
            <label class="color-primary grayscale"><input type="checkbox" id="showPassword"> Show Password</label>
        </div>
    </div>
</section>
`
