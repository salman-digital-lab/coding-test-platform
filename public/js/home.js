document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tokenForm");
  const tokenInput = document.getElementById("token");
  const alert = document.getElementById("alert");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");

  // Auto-uppercase token input
  tokenInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.toUpperCase();
  });

  function showAlert(message, type) {
    alert.textContent = message;
    alert.className = `alert alert-${type} show`;
  }

  function hideAlert() {
    alert.className = "alert";
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.style.display = loading ? "none" : "inline";
    btnSpinner.style.display = loading ? "block" : "none";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert();

    const token = tokenInput.value.trim().toUpperCase();

    if (!token || token.length !== 8) {
      showAlert("Please enter a valid 8-character token", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/validate-token/${token}`);
      const data = await response.json();

      if (response.ok && data.valid) {
        // Store token and redirect to test page
        sessionStorage.setItem("testToken", token);
        sessionStorage.setItem("userEmail", data.email);
        window.location.href = "/test";
      } else {
        showAlert(data.error || "Invalid token", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to validate token. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  });
});
