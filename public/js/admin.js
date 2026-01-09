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
    showLoginAlert("ERROR: AUTHENTICATION FAILED", "error");
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
  const statTotal = document.getElementById("statTotal");
  const statAvg = document.getElementById("statAvg");
  const statHigh = document.getElementById("statHigh");

  async function loadResults() {
    resultsBody.innerHTML =
      '<tr><td colspan="4" class="empty-state">LOADING DATA...</td></tr>';

    try {
      const response = await fetch("/api/admin/results");
      const results = await response.json();

      if (results.length === 0) {
        resultsBody.innerHTML =
          '<tr><td colspan="4" class="empty-state">NO RECORDS FOUND</td></tr>';
        statTotal.textContent = "0";
        statAvg.textContent = "0%";
        statHigh.textContent = "0%";
        return;
      }

      // Calculate stats
      const percentages = results.map((r) =>
        Math.round((r.score / r.total_questions) * 100)
      );
      const avgPercentage = Math.round(
        percentages.reduce((a, b) => a + b, 0) / percentages.length
      );
      const highestPercentage = Math.max(...percentages);

      statTotal.textContent = results.length;
      statAvg.textContent = avgPercentage + "%";
      statHigh.textContent = highestPercentage + "%";

      resultsBody.innerHTML = results
        .map((result) => {
          const percentage = Math.round(
            (result.score / result.total_questions) * 100
          );
          let badgeClass = "badge-danger";
          let statusText = "FAIL";
          if (percentage >= 80) {
            badgeClass = "badge-success";
            statusText = "PASS";
          } else if (percentage >= 60) {
            badgeClass = "badge-warning";
            statusText = "OKAY";
          }

          const date = new Date(result.submitted_at);
          const timestamp = date
            .toISOString()
            .replace("T", " ")
            .substring(0, 19);

          return `
          <tr>
            <td>${result.email}</td>
            <td>${result.score}/${result.total_questions}</td>
            <td>
              <div class="percentage-bar">
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="bar-value ${badgeClass}">${percentage}%</span>
              </div>
            </td>
            <td>${timestamp}</td>
          </tr>
        `;
        })
        .join("");
    } catch (error) {
      console.error("Error:", error);
      resultsBody.innerHTML =
        '<tr><td colspan="4" class="empty-state">CONNECTION ERROR</td></tr>';
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
