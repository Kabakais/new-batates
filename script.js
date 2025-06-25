// IP Address
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = `عنوان IP: ${data.ip}`;
  });

// Device Type
const userAgent = navigator.userAgent;
document.getElementById("device").textContent = `نوع الجهاز: ${userAgent}`;

// Battery
if ("getBattery" in navigator) {
  navigator.getBattery().then(battery => {
    const level = Math.round(battery.level * 100);
    document.getElementById("battery").textContent = `🔋 نسبة البطارية: ${level}%`;
  });
} else {
  document.getElementById("battery").textContent = "🔋 البطارية: غير مدعومة";
}

// Location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById("location").textContent = `📍 خط العرض: ${latitude.toFixed(4)}, خط الطول: ${longitude.toFixed(4)}`;
    },
    err => {
      document.getElementById("location").textContent = "🌍 الموقع الجغرافي: تم رفض الإذن أو غير متاح";
    }
  );
} else {
  document.getElementById("location").textContent = "🌍 الموقع غير مدعوم";
}

// Network
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  document.getElementById("network").textContent = `📶 نوع الشبكة: ${connection.effectiveType}`;
} else {
  document.getElementById("network").textContent = "📶 نوع الشبكة: غير مدعوم";
}