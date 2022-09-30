from cryptography.fernet import Fernet

def load_key():
    return open('path de la key.key','rb').read()

def generate_key():
    key = Fernet.generate_key()
    with open('path de la key.key','wb') as file_key:
        file_key.write(key)

def encript(file_name,key):
    f = Fernet(key)
    with open(file_name, 'rb') as file:
        file_info = file.read()
    encrypted_data = f.encrypt(file_info)
    with open(file_name, 'wb') as file:
        file.write(encrypted_data)

generate_key()
key = load_key()

file_name = 'path de tu archivo'
encript(file_name,key)