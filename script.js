
const infoDiv = document.getElementById("info");

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "📱 هاتف";
  if (/Tablet|iPad/i.test(ua)) return "📱 تابلت";
  return "💻 كمبيوتر";
}

function updateInfo() {
  const info = [];

  info.push("🖥️ نوع الجهاز: " + getDeviceType());
  info.push("🌐 اللغة: " + navigator.language);
  info.push("🧠 JavaScript: مفعّل");
  info.push("📱 نظام التشغيل والمتصفح: " + navigator.userAgent);
  if (navigator.deviceMemory) info.push("💾 الرام: " + navigator.deviceMemory + " GB");
  if (navigator.hardwareConcurrency) info.push("🧮 الأنوية: " + navigator.hardwareConcurrency);
  if (navigator.connection) {
    info.push("📶 نوع الشبكة: " + navigator.connection.effectiveType);
    info.push("📡 سرعة الاتصال: " + navigator.connection.downlink + " ميجابت/ث");
  }
  if (navigator.getBattery) {
    navigator.getBattery().then(b => {
      info.push("🔋 نسبة البطارية: " + Math.round(b.level * 100) + "%");
      info.push("⚡ الشحن: " + (b.charging ? "نعم" : "لا"));
      infoDiv.innerHTML = info.map(i => "<p>" + i + "</p>").join("");
    });
  } else {
    infoDiv.innerHTML = info.map(i => "<p>" + i + "</p>").join("");
  }
}

function vibrateDevice() {
  if ("vibrate" in navigator) navigator.vibrate([300, 100, 300]);
}

function shareInfo() {
  const text = infoDiv.innerText;
  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      infoDiv.innerHTML += `<p>📍 خط العرض: ${lat}, خط الطول: ${lon}</p>`;

      const map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(map);
      L.marker([lat, lon]).addTo(map).bindPopup("موقعك الحالي").openPopup();
    }, () => {
      infoDiv.innerHTML += "<p>🚫 لم يتم السماح بالموقع.</p>";
    });
  } else {
    infoDiv.innerHTML += "<p>🚫 الموقع غير مدعوم.</p>";
  }
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById("preview");
    img.src = e.target.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function downloadReport() {
  const blob = new Blob([infoDiv.innerText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "device-info.txt";
  a.click();
}

setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = "🕒 الساعة: " + now.toLocaleTimeString();
}, 1000);

(function trackFPS(){
  let last = performance.now(), frames = 0;
  function loop(){
    const now = performance.now();
    frames++;
    if (now > last + 1000) {
      document.getElementById("fps").textContent = "🎮 معدل الإطارات: " + frames + " FPS";
      frames = 0;
      last = now;
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

updateInfo();
