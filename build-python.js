const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs"); // Required for deleting files

const scriptPath = path.join(__dirname, "py", "encryptor.py");

try {
  console.log("Ensuring pyinstaller is installed...");
  execSync(`pip install pyinstaller`, { stdio: "inherit" });

  console.log("Installing Python dependency: pycryptodome...");
  execSync(`pip install pycryptodome`, { stdio: "inherit" });

  console.log("Building Python binary with pyinstaller...");
  execSync(`pyinstaller --onefile ${scriptPath}`, { stdio: "inherit" });

  console.log("Python binary built at ./dist/encryptor");

} catch (err) {
  console.error("Build failed:", err.message);
  process.exit(1);
}
