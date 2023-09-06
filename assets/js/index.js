const btnIngresar = document.getElementById("btnLogin")
const btnOperacion = document.getElementById("btnEjecucion")
const btnSalir = document.getElementById("btnsalir")
const section1 = document.getElementById("sectionLogin")
const section2 = document.getElementById("sectionOperacion")


const password = "1234"
const nomCliente = "luis"

let saldoActual = Number(document.getElementById("saldo").innerText);
let intentosClave = 3
let bloqueado = false

btnIngresar.addEventListener("click", verificarUsuario)
btnOperacion.addEventListener("click", ejecucion)
btnSalir.addEventListener("click", salir)

section2.style.display = "none";

function verificarUsuario(){
    const inputUserName = document.getElementById("user-name").value
    const inputPassword = document.getElementById("user-password").value

    if (bloqueado == true) {
        alert("Está bloqueado. No se permite el acceso.");
        return;
    }

    if (inputUserName === nomCliente && inputPassword === password || inputUserName === "Luis" && inputPassword === password){
        console.log("Nombre usuario: ", inputUserName)
        console.log("Contraseña: ", inputPassword)
        section1.style.display = "none";
        section2.style.display = "block";
    } else {
        intentosClave--;
        if (intentosClave > 0) {
            alert(`Clave incorrecta. Le quedan ${intentosClave} intentos.`);
            return
        } else {
            alert("Ha alcanzado el número máximo de intentos.");
            bloqueado = true;
        }
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