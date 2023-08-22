
// Ephemeral notifications modal
const ephemeralNotificationsModal = document.getElementById("ephemeralNotificationsModal");

// Notification Trigger
function ephemeralNotification(message) {
    localStorage.setItem("newEphemeralNotification", message);
    window.dispatchEvent(new Event("newEphemeralNotification"));
}

(function() {

    window.addEventListener("newEphemeralNotification", function() {

        // Gen hash for notification identification
        let ephemeralHash = genHex(7);
        
        // Notification element constructor
        var notification = document.createElement("p");
        notification.id = ephemeralHash;
        notification.className = "bg-body z-2 s-padded text-center rounded color-primary shadow-one";
        notification.setAttribute("loom", localStorage.getItem("newEphemeralNotification"));
        ephemeralNotificationsModal.appendChild(notification);
        
        // Remove notification
        setTimeout(function() {
            const elementToDelete = document.getElementById(ephemeralHash);
            elementToDelete.remove();
        }, 5000);

    });

})();