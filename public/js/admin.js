// Hardcoded admin password
const ADMIN_PASSWORD = "admin123";

// Check if already authenticated
const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";

// DOM Elements
const loginOverlay = document.getElementById("loginOverlay");
const adminContent = document.getElementById("adminContent");
const loginForm = document.getElementById("loginForm");
const loginAlert = document.getElementById("loginAlert");
const logoutBtn = document.getElementById("logoutBtn");

function showLoginAlert(message, type) {
  loginAlert.textContent = message;
  loginAlert.className = `alert alert-${type} show`;
}

function hideLoginAlert() {
  loginAlert.className = "alert";
}

// Show admin content if authenticated
if (isAuthenticated) {
  loginOverlay.style.display = "none";
  adminContent.classList.add("visible");
  initAdmin();
}

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideLoginAlert();

  const password = document.getElementById("password").value;

  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem("adminAuth", "true");
    loginOverlay.style.display = "none";
    adminContent.classList.add("visible");
    initAdmin();
  } else {
    showLoginAlert("Incorrect password", "error");
  }
});

// Handle logout
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("adminAuth");
  window.location.reload();
});

// Initialize admin functionality
function initAdmin() {
  const resultsBody = document.getElementById("resultsBody");
  const refreshBtn = document.getElementById("refreshBtn");

  async function loadResults() {
    resultsBody.innerHTML =
      '<tr><td colspan="4" class="text-center text-muted">Loading...</td></tr>';

    try {
      const response = await fetch("/api/admin/results");
      const results = await response.json();

      if (results.length === 0) {
        resultsBody.innerHTML =
          '<tr><td colspan="4" class="text-center text-muted">No results yet</td></tr>';
        return;
      }

      resultsBody.innerHTML = results
        .map((result) => {
          const percentage = Math.round(
            (result.score / result.total_questions) * 100
          );
          let badgeClass = "badge-danger";
          if (percentage >= 80) badgeClass = "badge-success";
          else if (percentage >= 60) badgeClass = "badge-warning";

          const date = new Date(result.submitted_at).toLocaleString();

          return `
          <tr>
            <td>${result.email}</td>
            <td>${result.score} / ${result.total_questions}</td>
            <td><span class="badge ${badgeClass}">${percentage}%</span></td>
            <td>${date}</td>
          </tr>
        `;
        })
        .join("");
    } catch (error) {
      console.error("Error:", error);
      resultsBody.innerHTML =
        '<tr><td colspan="4" class="text-center text-muted">Failed to load results</td></tr>';
    }
  }

  // Export CSV
  const exportBtn = document.getElementById("exportBtn");
  exportBtn.addEventListener("click", () => {
    window.location.href = "/api/admin/export-csv";
  });

  refreshBtn.addEventListener("click", loadResults);

  // Load results on init
  loadResults();
}
