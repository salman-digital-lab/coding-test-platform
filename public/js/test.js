// LeetCode-style JavaScript Coding Problems
const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9",
      },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
      { input: [[1, 5, 3, 7, 2], 9], expected: [3, 4] },
    ],
    functionName: "twoSum",
  },
  {
    id: 2,
    title: "Palindrome Number",
    difficulty: "Easy",
    description: `Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.

A palindrome is a number that reads the same backward as forward.`,
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads 121 from left to right and right to left",
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "Reads -121 from left to right, 121- from right to left",
      },
      { input: "x = 10", output: "false" },
    ],
    starterCode: `function isPalindrome(x) {
  // Your code here
  
}`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [12321], expected: true },
      { input: [0], expected: true },
    ],
    functionName: "isPalindrome",
  },
  {
    id: 3,
    title: "Reverse String",
    difficulty: "Easy",
    description: `Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.

You must do this by modifying the input array in-place.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    starterCode: `function reverseString(s) {
  // Your code here - modify s in-place
  
}`,
    testCases: [
      {
        input: [["h", "e", "l", "l", "o"]],
        expected: ["o", "l", "l", "e", "h"],
      },
      {
        input: [["H", "a", "n", "n", "a", "h"]],
        expected: ["h", "a", "n", "n", "a", "H"],
      },
      { input: [["a", "b", "c"]], expected: ["c", "b", "a"] },
    ],
    functionName: "reverseString",
    mutatesInput: true,
    inputIndex: 0,
  },
  {
    id: 4,
    title: "FizzBuzz",
    difficulty: "Easy",
    description: `Given an integer <code>n</code>, return a string array <code>answer</code> (1-indexed) where:
<ul>
  <li><code>answer[i] == "FizzBuzz"</code> if i is divisible by 3 and 5</li>
  <li><code>answer[i] == "Fizz"</code> if i is divisible by 3</li>
  <li><code>answer[i] == "Buzz"</code> if i is divisible by 5</li>
  <li><code>answer[i] == i</code> (as a string) if none of the above</li>
</ul>`,
    examples: [
      { input: "n = 3", output: '["1","2","Fizz"]' },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' },
    ],
    starterCode: `function fizzBuzz(n) {
  // Your code here
  
}`,
    testCases: [
      { input: [3], expected: ["1", "2", "Fizz"] },
      { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
      {
        input: [15],
        expected: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz",
        ],
      },
    ],
    functionName: "fizzBuzz",
  },
  {
    id: 5,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.

A string is valid if:
<ul>
  <li>Open brackets are closed by the same type of brackets</li>
  <li>Open brackets are closed in the correct order</li>
  <li>Every close bracket has a corresponding open bracket</li>
</ul>`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    starterCode: `function isValid(s) {
  // Your code here
  
}`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
      { input: [""], expected: true },
    ],
    functionName: "isValid",
  },
];

// State
let currentProblemIndex = 0;
let userCode = {};
let testResults = {};
let userEmail = sessionStorage.getItem("userEmail");
let monacoEditor = null;

const STORAGE_KEY = `coding_test_backup_${userEmail}`;

// Save state to sessionStorage
function saveState() {
  if (!userEmail) return;
  const state = {
    currentProblemIndex,
    userCode,
    testResults,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Load state from sessionStorage
function loadState() {
  if (!userEmail) return;
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const state = JSON.parse(saved);
      currentProblemIndex = state.currentProblemIndex || 0;

      // Merge saved code
      if (state.userCode) {
        Object.keys(state.userCode).forEach((id) => {
          if (problems.find((p) => p.id == id)) {
            userCode[id] = state.userCode[id];
          }
        });
      }

      // Merge test results
      if (state.testResults) {
        Object.keys(state.testResults).forEach((id) => {
          if (problems.find((p) => p.id == id)) {
            testResults[id] = state.testResults[id];
          }
        });
      }
    } catch (e) {
      console.error("Error loading saved state:", e);
    }
  }
}

// Initialize code for each problem
problems.forEach((p) => {
  userCode[p.id] = p.starterCode;
  testResults[p.id] = null;
});

// Load saved state (overwrites defaults if exists)
loadState();

// DOM Elements
const problemNav = document.getElementById("problemNav");
const problemTitle = document.getElementById("problemTitle");
const problemDifficulty = document.getElementById("problemDifficulty");
const problemDescription = document.getElementById("problemDescription");
const examplesContainer = document.getElementById("examplesContainer");
const editorContainer = document.getElementById("editorContainer");
const runBtn = document.getElementById("runBtn");
const submitBtn = document.getElementById("submitBtn");
const testOutput = document.getElementById("testOutput");
const testSection = document.getElementById("testSection");
const resultSection = document.getElementById("resultSection");
const userEmailSpan = document.getElementById("userEmail");

// Initialize the application
function initApp() {
  console.log("Initializing app...");

  if (!userEmail) {
    window.location.href = "/";
    return;
  }

  if (userEmailSpan) {
    userEmailSpan.textContent = userEmail;
  }

  // Clear the loading message
  editorContainer.innerHTML = "";

  // Initialize Monaco Editor
  monacoEditor = monaco.editor.create(editorContainer, {
    value:
      userCode[problems[currentProblemIndex].id] ||
      problems[currentProblemIndex].starterCode,
    language: "javascript",
    theme: "vs-dark",
    fontSize: 14,
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', monospace",
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    lineNumbers: "on",
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    renderLineHighlight: "line",
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
    padding: { top: 16, bottom: 16 },
    tabSize: 2,
  });

  console.log("Monaco editor created");

  // Save code when editor changes
  monacoEditor.onDidChangeModelContent(() => {
    userCode[problems[currentProblemIndex].id] = monacoEditor.getValue();
    saveState();
  });

  renderProblemNav();
  renderProblem();
}

// Wait for Monaco to be ready
if (window.monacoReady) {
  initApp();
} else {
  window.addEventListener("monaco-ready", initApp);
}

function renderProblemNav() {
  problemNav.innerHTML = problems
    .map((p, idx) => {
      const status = testResults[p.id];
      let statusClass = "";
      if (status === "passed") statusClass = "passed";
      else if (status === "failed") statusClass = "failed";

      return `
      <button class="problem-nav-item ${
        idx === currentProblemIndex ? "active" : ""
      } ${statusClass}" 
              data-index="${idx}">
        ${p.id}
      </button>
    `;
    })
    .join("");

  problemNav.querySelectorAll(".problem-nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Save current code
      if (monacoEditor) {
        userCode[problems[currentProblemIndex].id] = monacoEditor.getValue();
      }

      currentProblemIndex = parseInt(btn.dataset.index);
      saveState();
      renderProblem();
      renderProblemNav();
    });
  });
}

function renderProblem() {
  const problem = problems[currentProblemIndex];

  problemTitle.textContent = `${problem.id}. ${problem.title}`;
  problemDifficulty.textContent = problem.difficulty;
  problemDifficulty.className = `difficulty ${problem.difficulty.toLowerCase()}`;
  problemDescription.innerHTML = problem.description;

  examplesContainer.innerHTML = problem.examples
    .map(
      (ex, idx) => `
    <div class="example">
      <div class="example-title">Example ${idx + 1}:</div>
      <div class="example-content">
        <div><strong>Input:</strong> ${ex.input}</div>
        <div><strong>Output:</strong> ${ex.output}</div>
        ${
          ex.explanation
            ? `<div><strong>Explanation:</strong> ${ex.explanation}</div>`
            : ""
        }
      </div>
    </div>
  `
    )
    .join("");

  // Update Monaco Editor content
  if (monacoEditor) {
    monacoEditor.setValue(userCode[problem.id]);
  }

  testOutput.innerHTML =
    '<span class="text-muted">Click "Run Tests" to test your solution</span>';
}

// Run tests for current problem
runBtn.addEventListener("click", () => {
  const problem = problems[currentProblemIndex];
  if (monacoEditor) {
    userCode[problem.id] = monacoEditor.getValue();
  }

  runBtn.disabled = true;
  runBtn.innerHTML = '<div class="spinner"></div> Running...';
  testOutput.innerHTML = '<span class="text-muted">Running tests...</span>';

  setTimeout(() => {
    const code = monacoEditor ? monacoEditor.getValue() : userCode[problem.id];
    const results = runTests(problem, code);
    displayResults(problem, results);
    runBtn.disabled = false;
    runBtn.innerHTML = "▶ Run Tests";
  }, 500);
});

function runTests(problem, code) {
  const results = [];

  try {
    // Create function from user code
    const userFunction = new Function(`
      ${code}
      return ${problem.functionName};
    `)();

    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i];
      try {
        // Deep clone input to avoid mutation issues
        const inputClone = JSON.parse(JSON.stringify(testCase.input));
        const result = userFunction(...inputClone);

        let actual;
        if (problem.mutatesInput) {
          // For functions that mutate input (like reverseString)
          actual = inputClone[problem.inputIndex];
        } else {
          actual = result;
        }

        const passed =
          JSON.stringify(actual) === JSON.stringify(testCase.expected);
        results.push({
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual,
          error: null,
        });
      } catch (error) {
        results.push({
          passed: false,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          error: error.message,
        });
      }
    }
  } catch (error) {
    // Syntax error in code
    return [{ passed: false, error: `Syntax Error: ${error.message}` }];
  }

  return results;
}

function displayResults(problem, results) {
  const allPassed = results.every((r) => r.passed);
  testResults[problem.id] = allPassed ? "passed" : "failed";
  saveState();
  renderProblemNav();

  let html = `<div class="results-summary ${allPassed ? "success" : "error"}">
    ${
      allPassed
        ? "✓ All test cases passed!"
        : `✗ ${results.filter((r) => !r.passed).length} of ${
            results.length
          } test cases failed`
    }
  </div>`;

  html += '<div class="test-cases">';
  results.forEach((result, idx) => {
    if (result.error && !result.input) {
      html += `<div class="test-case failed">
        <div class="test-case-header">Error</div>
        <div class="test-case-body"><code>${result.error}</code></div>
      </div>`;
    } else {
      html += `<div class="test-case ${result.passed ? "passed" : "failed"}">
        <div class="test-case-header">
          ${result.passed ? "✓" : "✗"} Test Case ${idx + 1}
        </div>
        <div class="test-case-body">
          <div><strong>Input:</strong> <code>${JSON.stringify(
            result.input
          )}</code></div>
          <div><strong>Expected:</strong> <code>${JSON.stringify(
            result.expected
          )}</code></div>
          ${
            result.error
              ? `<div><strong>Error:</strong> <code class="error">${result.error}</code></div>`
              : `<div><strong>Output:</strong> <code class="${
                  result.passed ? "" : "error"
                }">${JSON.stringify(result.actual)}</code></div>`
          }
        </div>
      </div>`;
    }
  });
  html += "</div>";

  testOutput.innerHTML = html;
}

// Modal Elements
const confirmModal = document.getElementById("confirmModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelSubmitBtn = document.getElementById("cancelSubmitBtn");
const confirmSubmitBtn = document.getElementById("confirmSubmitBtn");

// Modal Functions
function openModal() {
  confirmModal.classList.add("active");
}

function closeModal() {
  confirmModal.classList.remove("active");
}

// Modal Event Listeners
closeModalBtn.addEventListener("click", closeModal);
cancelSubmitBtn.addEventListener("click", closeModal);
confirmModal.addEventListener("click", (e) => {
  if (e.target === confirmModal) closeModal();
});

// Trigger Modal on Submit Click
submitBtn.addEventListener("click", () => {
  // Save current code before showing modal
  if (monacoEditor) {
    userCode[problems[currentProblemIndex].id] = monacoEditor.getValue();
  }
  openModal();
});

// Actual Submission Logic on Confirm Click
confirmSubmitBtn.addEventListener("click", async () => {
  closeModal();

  // Run all tests and calculate score
  let passedProblems = 0;

  problems.forEach((problem) => {
    const results = runTests(problem, userCode[problem.id]);
    const allPassed = results.every((r) => r.passed);
    testResults[problem.id] = allPassed ? "passed" : "failed";
    if (allPassed) passedProblems++;
  });

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="spinner"></div> Submitting...';

  // Also disable modal confirm button to prevent double clicks if modal re-opens (though it shouldn't)
  confirmSubmitBtn.disabled = true;

  try {
    const response = await fetch("/api/submit-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        score: passedProblems,
        totalQuestions: problems.length,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showResult(passedProblems);
    } else {
      alert(data.error || "Failed to submit");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submitting..."; // Keep it as text or revert to button
      confirmSubmitBtn.disabled = false;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to submit. Please try again.");
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Submit All";
    confirmSubmitBtn.disabled = false;
  }
});

function showResult(score) {
  testSection.style.display = "none";
  resultSection.style.display = "block";

  document.getElementById("scoreValue").textContent = score;
  document.getElementById("scoreTotal").textContent = problems.length;

  const percentage = (score / problems.length) * 100;
  let message = "";

  if (percentage === 100) {
    message = "Perfect score! Excellent problem-solving skills!";
  } else if (percentage >= 80) {
    message = "Great job! You solved most problems correctly.";
  } else if (percentage >= 60) {
    message = "Good effort! Keep practicing to improve.";
  } else if (percentage >= 40) {
    message = "You're making progress. Review the concepts and try again.";
  } else {
    message = "Keep practicing! Focus on understanding the fundamentals.";
  }

  document.getElementById("scoreMessage").textContent = message;

  // Clear session
  sessionStorage.removeItem("userEmail");
  sessionStorage.removeItem(STORAGE_KEY);
}
