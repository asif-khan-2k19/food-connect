function goBack() {
  window.history.back();
}

function handleNotification() {
  // if (Notification in window) {
  Notification.requestPermission().then((result) => {
    console.log("permission result: " + result);
    // If user granted permission then open the notification panel
    if (result === "granted") {
      let notif = new Notification("New donation", {
        body: "Food donation from Asif!",
        icon: "/images/dish.png",
        requireInteraction: true,
      });
    }
  });
}
