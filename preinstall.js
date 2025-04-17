const { execSync } = require("child_process");
const os = require("os");

function hasCommand(command) {
  try {
    execSync(`${command} --version`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function installPython3() {
  console.log("Python3 not found. Attempting to install...");

  try {
    if (os.platform() === "linux") {
      execSync("apt update && apt install -y python3", { stdio: "inherit" });
    } else if (os.platform() === "darwin") {
      execSync("brew install python@3", { stdio: "inherit" });
    } else {
      console.error("Automatic Python3 installation not supported on this platform.");
      process.exit(1);
    }
  } catch (err) {
    console.error("Failed to install Python3:", err.message);
    process.exit(1);
  }
}

function installPip() {
  console.log("pip not found. Attempting to install...");

  try {
    execSync("curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py", { stdio: "inherit" });
    execSync("python3 get-pip.py", { stdio: "inherit" });
  } catch (err) {
    console.error("Failed to install pip:", err.message);
    process.exit(1);
  }
}

// 1. Check Python3
if (!hasCommand("python3")) {
  installPython3();
} else {
  console.log("Python3 is already installed.");
}

// 2. Check pip
if (!hasCommand("pip")) {
  installPip();
} else {
  console.log("pip is already installed.");
}

