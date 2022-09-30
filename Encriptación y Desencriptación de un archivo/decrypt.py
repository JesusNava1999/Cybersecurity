from cryptography.fernet import Fernet

def load_key():
    return open('path de la llave','rb').read()

def decript(file_name,key):
    f = Fernet(key)
    with open(file_name, 'rb') as file:
        encrypted_data = file.read()
    decrypted_data = f.decrypt(encrypted_data)
    with open(file_name, 'wb') as file:
        file.write(decrypted_data)

key = load_key()

file_name = 'path del archivo'
decript(file_name,key)