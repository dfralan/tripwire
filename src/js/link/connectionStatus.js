(function() {

    function checkConnectionStatus() {
      if (navigator.onLine) {
        return "Online";
      } else {
        return "Offline";
      }
    }
  
    let currentStatus = checkConnectionStatus();
    window.addEventListener("online", function() {
      if (checkConnectionStatus() !== currentStatus) {
        currentStatus = "Online";
        // Write notification with connection status on local storage and trigger an event
        ephemeralNotification("You are online again")
      }
    });
  
    window.addEventListener("offline", function() {
      if (checkConnectionStatus() !== currentStatus) {
        currentStatus = "Offline";
        // Write notification with connection status on local storage and trigger an event
        ephemeralNotification("Connection lost")
      }
    });

})();
  