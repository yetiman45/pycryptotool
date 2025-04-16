// postinstall.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'py', 'encryptor.py');

if (fs.existsSync(filePath)) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    `The file ${filePath} exists. Do you want to delete it? (y/n): `,
    (answer) => {
      if (answer.trim().toLowerCase() === 'y') {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted.");
          }
          rl.close();
        });
      } else {
        console.log("File not deleted.");
        rl.close();
      }
    }
  );
}
