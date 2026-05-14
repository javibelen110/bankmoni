const btnIngresar = document.getElementById("btnLogin")
const btnOperacion = document.getElementById("btnEjecucion")
const btnSalir = document.getElementById("btnsalir")
const section1 = document.getElementById("sectionLogin")
const section2 = document.getElementById("sectionOperacion")
const section3 = document.getElementById("sectionRegister")

const temaOscuro = () => {
    document.querySelector("html").setAttribute("data-bs-theme","dark");
    document.querySelector("#dl-icon").setAttribute("class","bi bi-sun-fill");
}

const temaClaro = () => {
    document.querySelector("html").setAttribute("data-bs-theme","light");
    document.querySelector("#dl-icon").setAttribute("class","bi bi-moon-fill");
}

const cambiarTema = () => {
    document.querySelector("html").getAttribute("data-bs-theme") === "light"?
    temaOscuro() : temaClaro()
}

let saldoActual = Number(document.getElementById("saldo").innerText);
let intentosClave = 3
let bloqueado = false

const API_URL = "https://bankmoni.onrender.com" 


//http://127.0.0.1:8000

btnIngresar.addEventListener("click", verificarUsuario)
btnOperacion.addEventListener("click", ejecucion)
btnSalir.addEventListener("click", salir)

section2.style.display = "none";
section3.style.display = "none";

document.getElementById("irARegistro").addEventListener("click", (e) => {
    e.preventDefault()
    section1.style.display = "none"
    section3.style.display = "block"
})
 
document.getElementById("irALogin").addEventListener("click", (e) => {
    e.preventDefault()
    section3.style.display = "none"
    section1.style.display = "block"
})

document.getElementById("btnRegister").addEventListener("click", async (e) => {
    e.preventDefault()
    const username = document.getElementById("reg-user").value.trim()
    const pinStr   = document.getElementById("reg-pin").value.trim()
 
    if (!username || !/^\d{4}$/.test(pinStr)) {
        alert("Ingrese un usuario y un PIN de 4 dígitos.")
        return
    }
 
    try {
        const respuesta = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, pin: Number(pinStr) })
        })
        const datos = await respuesta.json()
 
        if (datos.error) {
            alert(datos.error)
        } else {
            alert("Cuenta creada.")
            document.getElementById("reg-user").value = ""
            document.getElementById("reg-pin").value  = ""
            section3.style.display = "none"
            section1.style.display = "block"
        }
    } catch {
        alert("No se pudo conectar con el servidor.")
    }
})
 
async function verificarUsuario(){
    const inputUserName = document.getElementById("user-name").value
    const inputPassword = document.getElementById("user-password").value
 
    if (bloqueado == true) {
        alert("Está bloqueado.");
        return;
    }
 
    try {
        const respuesta = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: inputUserName, pin: Number(inputPassword) })
        })
        const datos = await respuesta.json()
 
        if (datos.error) {
            intentosClave--;
            if (intentosClave > 0) {
                alert(`Clave incorrecta. Le quedan ${intentosClave} intentos.`);
            } else {
                alert("Ha alcanzado el número máximo de intentos.");
                bloqueado = true;
            }
        } else {
            console.log("Nombre usuario: ", inputUserName)
            section1.style.display = "none";
            section2.style.display = "block";
        }
    } catch {
        alert("No se pudo conectar con el servidor.")
    }
}
 
function ejecucion(){
    let inputMonto = Number(document.getElementById("user-monto").value)
    let selectOperacion = document.getElementById("seleccion-operacion").value
 
    console.log("monto: ", inputMonto)
    console.log("eleccion: ", selectOperacion)
    if (selectOperacion === "1"){
        deposito(inputMonto)
    } else {
        retiro(inputMonto)
    }
}
 
function deposito(inputMonto){
    if (isNaN(inputMonto) || inputMonto <= 0) {
        alert("Ingrese un monto válido.");
    } else {
        saldoActual += inputMonto;
        document.getElementById("saldo").innerText = saldoActual.toLocaleString();
    }
}
 
function retiro(inputMonto){
    if (isNaN(inputMonto) || inputMonto <= 0) {
        alert("Ingrese un monto válido.");
    } else if (inputMonto > saldoActual) {
        alert("Saldo insuficiente.");
    } else {
        saldoActual -= inputMonto;
        document.getElementById("saldo").innerText = saldoActual.toLocaleString();
    }
}
 
function salir(){
    location.reload()
}