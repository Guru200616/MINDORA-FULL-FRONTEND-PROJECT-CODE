const input = document.getElementById("thoughtInput");
const clearBtn = document.getElementById("clearBtn");
const exportBtn = document.getElementById("exportBtn");
const counter = document.getElementById("counter");
const status = document.getElementById("status");
const toggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved content and theme
window.onload = () => {
  input.value = localStorage.getItem("mindora_text") || "";
  body.className = localStorage.getItem("mindora_theme") || "";
  updateCounter();
};

// Auto-save and count words
input.addEventListener("input", () => {
  localStorage.setItem("mindora_text", input.value);
  status.textContent = "Saved locally";
  updateCounter();
});

function updateCounter() {
  const words = input.value.trim().split(/\s+/).filter(Boolean).length;
  counter.textContent = `${words} words`;
}

// Clear thoughts
clearBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  if (confirm("Clear all thoughts?")) {
    input.value = "";
    localStorage.removeItem("mindora_text");
    status.textContent = "Mind cleared";
    updateCounter();
  }
});

// Export to text file
exportBtn.addEventListener("click", () => {
  const blob = new Blob([input.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "mindora.txt";
  link.click();
});

// Theme toggle
toggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("mindora_theme", body.className);
});
