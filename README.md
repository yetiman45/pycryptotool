# Node-Python Encryptor

A Node.js module that wraps a Python AES (CBC mode) encryption/decryption tool. Automatically installs dependencies and builds a Python binary on `npm install`.

## 🔐 Features

- AES-256-CBC encryption with static key and IV
- Handles JSON or plain string inputs
- Automatically installs `pycryptodome` and `pyinstaller`
- Compiles the Python script into a standalone binary
- Simple Node.js wrapper for encryption and decryption

---

## 🚀 Installation

```bash
npm install pycryptotool

```

### Optional Source File Cleanup
~~After successful compilation, you'll be prompted:~~

```bash
~~Python binary created.~~
~~Do you want to delete the source file (py/encryptor.py)? (y/n):~~
```

~~- Type y to remove the original Python script.~~
~~- Type n to keep it.~~

~~This setup ensures a clean environment while allowing you to control whether the original Python source is retained.~~

⚠️ Note: This feature is currently disabled and will be resolved soon.
As a temporary solution, the Python source file (py/encryptor.py) is always deleted automatically after building the binary.


## 🧪 Usage

```bash
const { encrypt, decrypt } = require("pycryptotool");

encrypt('{"foo":"bar"}', (err, encrypted) => {
  if (err) return console.error("Encrypt error:", err);
  console.log("Encrypted:", encrypted);

  decrypt(encrypted, (err, decrypted) => {
    if (err) return console.error("Decrypt error:", err);
    console.log("Decrypted:", decrypted);
  });
});
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Contributing

Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

## Author

Dipin Niroula - dipinniroula@hotmail.com, dipin@roqos.com  
www.roqos.com

