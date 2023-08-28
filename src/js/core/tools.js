// Check key validation
const isValidHexKey = (key = '') => {
    const hexPattern = /^[0-9a-fA-F]+$/;
    return hexPattern.test(key) && (key.length % 2 === 0);
}

// Tags to Array: 'naranja, banana' => ['naranja','banana']
const isValidUrl = (url = '') => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

// Email matcher
const isValidEmail = (email = '') => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phonenumber matcher
const isValidPhoneNumber = (phoneNumber = '') => {
    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
    return phoneRegex.test(phoneNumber);
};

// Convert tags from forms to Array like: 'naranja, banana' => ['naranja','banana']
const arrayTags = (x = '') => {
    const values = x.split(', ');
    const output = values.map(value => `"${encodeURIComponent(value)}"`);
    const arrayedTags = `[${output.join(', ')}]`;
    return arrayedTags
}

function arrayToCommaString(inputArray) {
    var decodedArray = inputArray.map(item => decodeURIComponent(item));
    var result = decodedArray.join(', ');
    return result;
}

// Timestamp human readable format
const formatTimeAgo = (timestamp = '') => {
    const now = Math.floor(Date.now() / 1000);
    const diffInSeconds = now - timestamp;

    if (diffInSeconds < 30) {
        return `now`;
    }else if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
        const startDate = new Date(timestamp * 1000);
        const endDate = new Date(now * 1000);

        const startYear = startDate.getUTCFullYear();
        const startMonth = startDate.getUTCMonth();
        const endYear = endDate.getUTCFullYear();
        const endMonth = endDate.getUTCMonth();

        const diffInMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
        
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }
}

// Timestamp formatter update
const updateTimestampDisplay = () => {
    const timestampElements = document.querySelectorAll('.timestamp');
    timestampElements.forEach(element => {
        const timestamp = parseInt(element.dataset.timestamp);
        const formattedTimeAgo = formatTimeAgo(timestamp);
        element.textContent = formattedTimeAgo;
    });
}

// Timestamp formatter update trigger every minute
setInterval(updateTimestampDisplay, 60000);

// Expand sheet
function expandSheet(id){
    let targettedSheet = document.getElementById(id)
    let expansionZone = targettedSheet.querySelector('.sheetExpansion')
    if (expansionZone.classList.contains("display-none")){
        expansionZone.classList.remove("display-none");
    } else {
        expansionZone.classList.add("display-none");
    }
}

// Toggle board visibility
function toggleBoardVisibility(boardIdentificator, buttonIdentificator){
    let targettedBoard = document.getElementById(boardIdentificator)
    let targettedButton = document.getElementById(buttonIdentificator)
    if (targettedBoard.classList.contains("display-none")){
        targettedBoard.classList.remove("display-none")
        targettedBoard.classList.add("display-block")
        targettedButton.classList.remove('bg-lighter', 'color-primary')
        targettedButton.classList.add('bg-secondary', 'color-secondary')
    } else {
        targettedBoard.classList.add("display-none")
        targettedButton.classList.add('bg-lighter', 'color-primary')
        targettedButton.classList.remove('bg-secondary', 'color-secondary')
    }
}

// Hide all dropdowns
function hideAllDropdowns() {
    var allDropContents = document.querySelectorAll('.dropdown-content')
    allDropContents.forEach(function(element) {
        element.classList.remove('display-block');
    });
}

// Toggle dropdown by id and hide all others
function toggleDropdown(id){
    let targettedSheet = document.getElementById(id)
    let dropContent = targettedSheet.querySelector('.dropdown-content')
    if (dropContent.classList.contains("display-block")){
        hideAllDropdowns()
    } else {
        hideAllDropdowns()
        dropContent.classList.add("display-block");
    }
}

// Add a global click event listener
document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const dropdowns = document.querySelectorAll('.dropdown-content');

    // Check if the clicked element is not within any dropdown
    if (!clickedElement.closest('.dropdown')) {
        dropdowns.forEach(function(dropContent) {
            hideAllDropdowns()
        });
    }
});

// Ephemeral Hash
const genHex = (a) => Math.random().toString(16).slice(2, (a + 2));
