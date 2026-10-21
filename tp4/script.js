
let archivoBlob = null;

// CREAR ARCHIVO
function crearArchivo() {
    let texto = document.getElementById("texto").value;

    if (texto.trim() === "") {
        document.getElementById("mensaje").textContent =
            "Primero escribí algo en el cuadro de texto.";
        return;
    }

    // Creamos el Blob
    archivoBlob = new Blob([texto], {
        type: "text/plain"
    });

    document.getElementById("mensaje").textContent =
        "Archivo creado correctamente. Tamaño: " +
        archivoBlob.size + " bytes.";

    document.getElementById("sliceResultado").textContent = "";
}

// DESCARGAR ARCHIVO
function descargarArchivo() {
    if (archivoBlob === null) {
        document.getElementById("mensaje").textContent =
            "Primero tenés que crear el archivo.";
        return;
    }

    // Creamos una dirección temporal
    let url = URL.createObjectURL(archivoBlob);

    // Creamos un enlace
    let enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "mi_archivo.txt";

    // Descargamos el archivo
    enlace.click();

    // Eliminamos la dirección temporal
    setTimeout(function() {
        URL.revokeObjectURL(url);
    }, 1000);

    document.getElementById("mensaje").textContent =
        "El archivo fue descargado correctamente.";
}

// USAR SLICE
function usarSlice() {
    if (archivoBlob === null) {
        document.getElementById("mensaje").textContent =
            "Primero tenés que crear el archivo.";
        return;
    }

    // Obtenemos el tamaño del Blob
    let tamaño = archivoBlob.size;

    // Calculamos la mitad
    let mitad = Math.floor(tamaño / 2);

    // Obtenemos la primera mitad del Blob
    let parteBlob = archivoBlob.slice(0, mitad);

    // Convertimos la parte en texto
    parteBlob.text().then(function(texto) {
        document.getElementById("sliceResultado").textContent =
            "Parte obtenida con Slice:\n\n" +
            texto +
            "\n\nTamaño de la parte: " +
            parteBlob.size +
            " bytes.";
    });
}
