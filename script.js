// DOM Elements
const newEntryBtn = document.getElementById("newEntryBtn");
const entryForm = document.getElementById("entryForm");
const entriesList = document.getElementById("entriesList");
const saveEntryBtn = document.getElementById("saveEntry");
const cancelEntryBtn = document.getElementById("cancelEntry");
const entryContent = document.getElementById("entryContent");
const dateHeader = document.querySelector(".date-header");

// Initialize entries from localStorage
let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

// Format date function
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Show entry form
function showEntryForm() {
  entryForm.classList.remove("hidden");
  dateHeader.textContent = formatDate(new Date());
  entryContent.value = "";
  entryContent.focus();
}

// Hide entry form
function hideEntryForm() {
  entryForm.classList.add("hidden");
  entryContent.value = "";
}

// Save entry
function saveEntry() {
  const content = entryContent.value.trim();
  if (!content) return;

  const entry = {
    id: Date.now(),
    date: new Date(),
    content: content,
  };

  entries.unshift(entry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  hideEntryForm();
  displayEntries();
}

// Display entries
function displayEntries() {
  entriesList.innerHTML = "";

  entries.forEach((entry) => {
    const entryElement = document.createElement("div");
    entryElement.className = "entry";
    entryElement.innerHTML = `
            <h2 class="date-header">${formatDate(new Date(entry.date))}</h2>
            <div class="entry-content">${entry.content}</div>
        `;
    entriesList.appendChild(entryElement);
  });
}

// Event Listeners
newEntryBtn.addEventListener("click", showEntryForm);
cancelEntryBtn.addEventListener("click", hideEntryForm);
saveEntryBtn.addEventListener("click", saveEntry);

// Initialize the display
displayEntries();

// Auto-save functionality (every 30 seconds)
let autoSaveInterval;
entryContent.addEventListener("input", () => {
  clearTimeout(autoSaveInterval);
  autoSaveInterval = setTimeout(() => {
    if (entryContent.value.trim()) {
      saveEntry();
    }
  }, 30000);
});
