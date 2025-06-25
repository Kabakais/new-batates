
const infoDiv = document.getElementById("info");

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "📱 هاتف محمول";
  if (/Tablet|iPad/i.test(ua)) return "📱 جهاز لوحي";
  return "💻 كمبيوتر مكتبي/محمول";
}

function updateInfo() {
  const info = [];

  info.push("🖥️ نوع الجهاز: " + getDeviceType());
  info.push("🌐 اللغة: " + navigator.language);
  info.push("🌍 جميع اللغات المدعومة: " + navigator.languages.join(", "));
  info.push("🔐 الاتصال آمن: " + (location.protocol === 'https:' ? "نعم" : "لا"));
  info.push("🧠 JavaScript مفعّل: نعم");

  if (navigator.deviceMemory)
    info.push("💾 الرام: " + navigator.deviceMemory + " GB");

  if (navigator.hardwareConcurrency)
    info.push("🧮 عدد الأنوية: " + navigator.hardwareConcurrency);

  if (window.screen) {
    info.push("🖥️ دقة الشاشة: " + screen.width + "x" + screen.height);
  }

  if (navigator.connection) {
    info.push("📶 نوع الشبكة: " + navigator.connection.effectiveType);
    info.push("📡 سرعة الاتصال: " + navigator.connection.downlink + " ميجابت/ث");
  }

  const perf = performance.timing;
  const loadTime = perf.domContentLoadedEventEnd - perf.navigationStart;
  info.push("⏱️ زمن استجابة الصفحة: " + loadTime + " ms");

  const devtools = /./;
  devtools.toString = function() {
    info.push("🛠️ أدوات المطور مفتوحة؟ نعم");
  };
  console.log(devtools);

  let last = performance.now(), frames = 0;
  function countFPS() {
    const now = performance.now();
    frames++;
    if (now > last + 1000) {
      document.getElementById("fps").textContent = "🎮 معدل الإطارات: " + frames + " FPS";
      frames = 0;
      last = now;
    }
    requestAnimationFrame(countFPS);
  }
  requestAnimationFrame(countFPS);

  infoDiv.innerHTML = info.map(i => "<p>" + i + "</p>").join("");
}

function shareInfo() {
  const text = infoDiv.innerText;
  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

function vibrateDevice() {
  if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
}

setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = "🕒 الساعة الآن: " + now.toLocaleTimeString();
}, 1000);

updateInfo();
