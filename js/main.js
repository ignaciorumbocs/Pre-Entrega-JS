function promedioEdades() {
    let suma = 0;
    for (let cantidadEdades = 1; cantidadEdades <= 5; cantidadEdades++) {
        let edadIngresada = parseInt(prompt("Ingrese Edad"));

        if (bandera = isNaN(edadIngresada)) {
            alert("La edad ingresada no es valida")
            cantidadEdades--
        
        }
        if (edadIngresada > 0 && edadIngresada <= 100) {


            suma += edadIngresada


        } 
    }
    return suma / 5;
}

let promedio = promedioEdades()

alert("El promedio de las edades es " + promedio)




