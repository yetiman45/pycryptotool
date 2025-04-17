const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

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

// Prompt to delete the Python source file
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('The file "encryptor.py" exists. Do you want to delete it? (y/n): ', (answer) => {
  if (answer.toLowerCase() === "y") {
    fs.unlink(scriptPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log('File "encryptor.py" deleted successfully.');
      }
      rl.close();
    });
  } else {
    console.log("File not deleted.");
    rl.close();
  }
});
