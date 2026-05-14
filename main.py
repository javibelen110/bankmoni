from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
usuarios_db = {}
 
class Usuario(BaseModel):
    username: str
    pin: int
 
@app.get("/")
def home():
    return {"funcionando"}
 
@app.post("/register")
def registrar(usuario: Usuario):
    if usuario.username in usuarios_db:
        return {"error": "El usuario ya existe."}
    usuarios_db[usuario.username] = usuario.pin
    return {"mensaje": f"Usuario {usuario.username} registrado exitosamente."}
 
@app.post("/login")
def login(usuario: Usuario):
    nombre = usuario.username.lower()
    if nombre not in usuarios_db or usuarios_db[nombre] != usuario.pin:
        return {"error": "Usuario o PIN incorrecto."}
    return {"mensaje": f"Bienvenido {nombre}"}