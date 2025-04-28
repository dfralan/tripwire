// Ephemeral Hash
const genHex = (a) => Math.random().toString(16).slice(2, (a + 2));

// Check key validation
const isValidHexKey = (key = '') => {
    const hexPattern = /^[0-9a-fA-F]+$/;
    return hexPattern.test(key) && (key.length % 2 === 0);
}

const isValidUrl = (url = '') => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

function getDateTimeFromTimestamp(timestamp) {
    const dateObj = new Date(timestamp * 1000);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const dateValue = `${year}-${month}-${day}`;
    const timeValue = `${hours}:${minutes}`;

    return [dateValue, timeValue];
}

// Match Youtube Video (Only the last one to be beauty)
const transformYouTubeLinks = (input = '') => {
    const regex = /(https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)(?:\S+)?)/g;
    let transformedUrl = '';
    const transformed = input.replace(regex, (match, url) => {
        if (url.includes('youtu.be') || url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('/').pop().split('?')[0];
            transformedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtube.com/embed')) {
            transformedUrl = url;
        } else {
            transformedUrl = url;
        }
    });
    return transformedUrl;
}

const replaceUrlsWithLinks = (text) => {
    const urlRegex = /((http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*)/g;
    
    const replacedText = text.replace(urlRegex, (url) => {
        if (isValidEmail(url)) {
            return `<a class='color-tint' target="_blank" href="mailto:${url}">${url}</a>`;
        }
        else if (isValidPhoneNumber(url)) {
            return `<a class='color-tint' target="_blank" href="tel:${url}">${url}</a>`;
        }
        else if (isValidUrl(url)) {
            return `<a class='color-tint' target="_blank" href="${url}">${url}</a>`;
        }
        return url;
    });

    return replacedText;
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

// Convert 
function arrayToCommaString(inputArray) {
    console.log('inputArray')
    console.log(inputArray)
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
    } else if (diffInSeconds < 60) {
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
const expandSheet = (id = '') => {
    let targettedSheet = document.getElementById(id)
    let expansionZone = targettedSheet.querySelector('.sheetExpansion')
    if (expansionZone.classList.contains("display-none")) {
        expansionZone.classList.remove("display-none");
    } else {
        expansionZone.classList.add("display-none");
    }
}

// Toggle board visibility
function toggleBoardVisibility(boardIdentificator, buttonIdentificator) {
    let targettedBoard = document.getElementById(boardIdentificator)
    let targettedButton = document.getElementById(buttonIdentificator)
    if (targettedBoard.classList.contains("display-none")) {

        targettedBoard.classList.remove("display-none")
        targettedButton.style.opacity = '0.5'
    } else {

        targettedBoard.classList.add("display-none")
        targettedButton.style.opacity = '1'
    }
}

// Hide all dropdowns
function hideAllDropdowns() {
    var allDropContents = document.querySelectorAll('.dropdown-content')
    allDropContents.forEach(function (element) {
        element.classList.remove('display-block');
    });
}

// Toggle dropdown by id and hide all others
function toggleDropdown(id) {
    let targettedSheet = document.getElementById(id)
    let dropContent = targettedSheet.querySelector('.dropdown-content')
    if (dropContent.classList.contains("display-block")) {
        hideAllDropdowns()
    } else {
        hideAllDropdowns()
        dropContent.classList.add("display-block");
    }
}

// Add a global click event listener
document.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const dropdowns = document.querySelectorAll('.dropdown-content');

    // Check if the clicked element is not within any dropdown
    if (!clickedElement.closest('.dropdown')) {
        dropdowns.forEach(function (dropContent) {
            hideAllDropdowns()
        });
    }
});

function hideSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.add('hided')
    sidebar.classList.remove('showed')
    sidebar.style.transform = 'translateX(-350px)';
}

function showSideBar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('hided')
    sidebar.classList.add('showed')
    sidebar.style.transform = 'translateX(0px)';
}

function toggleSideBar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('hided')) {
        showSideBar()
    } else {
        hideSideBar()
    }
}

// Minimal bech32 decoder
const BECH32_CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

function bech32Decode(bechString) {
    const lower = bechString.toLowerCase();
    const pos = lower.lastIndexOf('1');
    if (pos < 1 || pos + 7 > lower.length || lower.length > 90) {
        throw new Error("Invalid bech32 string");
    }

    const words = [];
    for (let i = pos + 1; i < lower.length; i++) {
        const c = lower[i];
        const idx = BECH32_CHARSET.indexOf(c);
        if (idx === -1) throw new Error("Invalid character in bech32 string");
        words.push(idx);
    }
    return words;
}

function fromWords(words) {
    let buffer = [];
    let bits = 0;
    let value = 0;
    for (let i = 0; i < words.length; ++i) {
        value = (value << 5) | words[i];
        bits += 5;
        while (bits >= 8) {
            bits -= 8;
            buffer.push((value >> bits) & 0xff);
        }
    }
    return buffer;
}

function bytesToHex(bytes) {
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

function nsecToHex(nsec) {
    const words = bech32Decode(nsec);
    const bytes = fromWords(words);
    return bytesToHex(bytes);
}

