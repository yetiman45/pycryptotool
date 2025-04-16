import argparse
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

key = bytes.fromhex("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef")
iv = bytes.fromhex("abcdef9876543210abcdef9876543210")
BLOCK_SIZE = 16

def encrypt(data: str) -> str:
    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded_data = pad(data.encode(), BLOCK_SIZE)
    encrypted = cipher.encrypt(padded_data)
    return encrypted.hex()

def decrypt(hex_data: str) -> str:
    encrypted_data = bytes.fromhex(hex_data)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted = cipher.decrypt(encrypted_data)
    unpadded = unpad(decrypted, BLOCK_SIZE)
    return unpadded.decode()

def try_parse_json(data: str):
    try:
        return json.dumps(json.loads(data), separators=(',', ':'), sort_keys=True)
    except json.JSONDecodeError:
        return data

def main():
    parser = argparse.ArgumentParser(description="Encrypt or Decrypt data (JSON or string).")
    parser.add_argument("--mode", choices=["encrypt", "decrypt"], required=True)
    parser.add_argument("--data", required=True)
    args = parser.parse_args()

    if args.mode == "encrypt":
        normalized_data = try_parse_json(args.data)
        encrypted = encrypt(normalized_data)
        print(encrypted)
    elif args.mode == "decrypt":
        decrypted = decrypt(args.data)
        try:
            parsed = json.loads(decrypted)
            print(json.dumps(parsed, indent=2))
        except json.JSONDecodeError:
            print(decrypted)

if __name__ == "__main__":
    main()
