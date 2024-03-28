function goBack() {
  window.history.back();
}

function handleNotification() {
  Notification.requestPermission().then((result) => {
    console.log("permission result: " + result);
    if (result === "granted") {
      let notif = new Notification("New donation", {
        body: "Food donation from Asif!",
        icon: "/images/dish.png",
        requireInteraction: true,
      });
    }
  });
}