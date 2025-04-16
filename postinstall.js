const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'py', 'encryptor.py');

// Ensure the file exists before asking for deletion
if (fs.existsSync(filePath)) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('The file "encryptor.py" exists. Do you want to delete it? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File "encryptor.py" deleted successfully.');
                }
                rl.close();
            });
        } else {
            console.log('File not deleted.');
            rl.close();
        }
    });
} else {
    console.log('File "encryptor.py" does not exist.');
}
