
function checkOnlineStatusWithRetries(callback) {
  let attempts = 0;

  function checkAndRetry() {
      if (navigator.onLine) {
          console.log("Estás en línea.")
          attempts = 0;
          callback(true);
      } else if (++attempts >= 5) {
          console.log("Sigues sin conectarte después de 5 intentos.")
          callback(false);
      } else {
          console.log(`Intentos de conexión: ${attempts}.`);
          setTimeout(checkAndRetry, 10000);
      }
  }

  checkAndRetry();
}

(function() {

    function checkConnectionStatus() {
      if (navigator.onLine) {
        return "Online";
      } else {
        return "Offline";
      }
    }
  
    let currentStatus = checkConnectionStatus();
    console.log("Initial connection status:", currentStatus);
  
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
  