document.addEventListener("DOMContentLoaded", function () {
  const commandInput = document.getElementById("command-input");
  const executeButton = document.getElementById("execute-button");
  const historyList = document.getElementById("history-list");
  const quickAccessApps = document.getElementById("quick-access-apps");
  const recentProgramsList = document.getElementById("recent-programs");
  const productivityCalendar = document.getElementById("productivity-calendar");
  const toggleThemeBtn = document.getElementById("toggle-theme");
  const body = document.body;

  let history = [];

  // Dark/Light Mode Toggle
  toggleThemeBtn.addEventListener("click", function () {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  });

  // Load Theme Preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else {
    body.classList.add("dark-mode");
  }

  executeButton.addEventListener("click", function () {
    const command = commandInput.value.trim();
    if (command) {
      processCommand(command);
      commandInput.value = "";
    }
  });

  function processCommand(command) {
    history.push(command);
    updateHistory();
    sendCommandToServer(command);
  }

  function updateHistory() {
    historyList.innerHTML = "";
    history.forEach((cmd) => {
      let listItem = document.createElement("li");
      listItem.textContent = cmd;
      historyList.appendChild(listItem);
    });
  }

  function sendCommandToServer(command) {
    fetch("server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
      })
      .catch((error) => console.error("Error:", error));
  }

  function loadQuickAccessApps() {
    const apps = [
      {
        name: "Google Docs",
        url: "https://docs.google.com",
        icon: "myicons/google-docs.png",
      },
      {
        name: "Spotify",
        url: "https://spotify.com",
        icon: "myicons/spotify.png",
      },
      { name: "Slack", url: "https://slack.com", icon: "myicons/slcak.png" },
    ];
    quickAccessApps.innerHTML = "";
    apps.forEach((app) => {
      let button = document.createElement("button");
      button.innerHTML = `<img src='${app.icon}' alt='${app.name}' style='width: 50px; height: 50px;'><br>${app.name}`;
      button.classList.add("quick-access-button");
      button.onclick = () => window.open(app.url, "_blank");
      quickAccessApps.appendChild(button);
    });
  }

  loadQuickAccessApps();

  // Load Recently Used Programs (Simulated for Now)
  function loadRecentPrograms() {
    const programs = [
      {
        name: "Visual Studio Code",
        path: "C:/Program Files/VSCode/Code.exe",
        icon: "myicons/vscode.png",
      },
      {
        name: "Adobe Photoshop",
        path: "C:/Program Files/Adobe/Photoshop.exe",
        icon: "myicons/photoshop.png",
      },
      {
        name: "Microsoft Word",
        path: "C:/Program Files/Microsoft Office/Word.exe",
        icon: "myicons/word.png",
      },
      {
        name: "Google Chrome",
        path: "C:/Program Files/Google/Chrome.exe",
        icon: "myicons/google-chrome.png",
      },
    ];
    recentProgramsList.innerHTML = "";
    programs.forEach((program) => {
      let button = document.createElement("button");
      button.innerHTML = `<img src='${program.icon}' alt='${program.name}' style='width: 50px; height: 50px;'><br>${program.name}`;
      button.classList.add("quick-access-button");
      button.onclick = () => openProgram(program.path);
      recentProgramsList.appendChild(button);
    });
  }
  loadRecentPrograms();

  function openProgram(path) {
    fetch("open-program.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Program Launch Response:", data);
      })
      .catch((error) => console.error("Error launching program:", error));
  }

  // Productivity Calendar (Dummy Data for Now)
  function loadProductivityCalendar() {
    const activeDays = ["2025-03-01", "2025-03-03", "2025-03-06"]; // Example active days
    let calendarHTML = "";
    for (let i = 1; i <= 31; i++) {
      let date = `2025-03-${i.toString().padStart(2, "0")}`;
      let active = activeDays.includes(date) ? "active-day" : "";
      calendarHTML += `<div class='calendar-day ${active}'>${i}</div>`;
    }
    productivityCalendar.innerHTML = calendarHTML;
  }
  loadProductivityCalendar();
});
