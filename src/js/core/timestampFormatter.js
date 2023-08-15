function formatTimeAgo(timestamp) {
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


function updateTimestampDisplay() {
    const timestampElements = document.querySelectorAll('.timestamp'); // Assuming you have elements with class "timestamp"

    timestampElements.forEach(element => {
        const timestamp = parseInt(element.dataset.timestamp);
        const formattedTimeAgo = formatTimeAgo(timestamp);
        element.textContent = formattedTimeAgo;
    });
}

// Update the time display every minute
setInterval(updateTimestampDisplay, 60000); // 60000 milliseconds = 1 minute

