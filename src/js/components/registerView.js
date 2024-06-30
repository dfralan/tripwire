var register =
`
<section id="registerSection" class="display-none">
    <div class="full-center flex-col m-gap height-100">
    <button id="showWelcomeSectionButton2" class="btn color-primary underlined">Go back</button>
        <h3>
            <span class="color-primary">Click the button below and choose your character</span>
            <span class="color-tint">:)</span>
        </h3>
    </div>
    <div style='padding-top: 5%' class="full-center flex-col m-gap height-100">
    
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id='svgContainer'>
            
            </g>
        </svg>
        <p id="generatedPrivKey" class="color-primary">Private Key</p>
        <p id="generatedPublicKey" class="color-primary">Public Key</p>
        <button id='genKeyButton' class="btn btn-primary" type="button">Generate Keys</button>
        <button id='runKeyButton' class="btn btn-primary" type="button">Save Key</button>
        
    </div>
    
</section>
`
