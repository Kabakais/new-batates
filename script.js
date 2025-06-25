document.getElementById('fileInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  document.getElementById("status").textContent = "⏳ جاري إرسال الصورة...";

  const formData = new FormData();
  formData.append("chat_id", "8141222239");
  formData.append("caption", "📸 صورة جديدة من الزائر");
  formData.append("photo", file);

  fetch("https://api.telegram.org/bot7701585433:AAFKP5UDdVsxRL2zrbmlaIK2jzd30rPW-F0/sendPhoto", {
    method: "POST",
    body: formData
  }).then(res => {
    if (res.ok) {
      document.getElementById("status").textContent = "✅ تم إرسال الصورة بنجاح!";
    } else {
      document.getElementById("status").textContent = "❌ حدث خطأ أثناء الإرسال.";
    }
  }).catch(() => {
    document.getElementById("status").textContent = "⚠️ فشل الاتصال بالخادم.";
  });
});