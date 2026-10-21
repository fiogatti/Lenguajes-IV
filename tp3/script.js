
let archivo = document.getElementById("archivo");

archivo.addEventListener("change", function() {
    let file = archivo.files[0];

    if (file) {
        // Mostrar la imagen
        let imagen = document.getElementById("imagen");
        imagen.src = URL.createObjectURL(file);

        // Mostrar información del archivo
        document.getElementById("informacion").innerHTML =
            "Nombre: " + file.name + "\n" +
            "Tipo: " + file.type + "\n" +
            "Tamaño: " + file.size + " bytes";
    }
});
