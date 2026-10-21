
document.getElementById('btn-abrir').addEventListener('click', () => {
    const inputNombre = document.getElementById('nombre-ubicacion');
    const inputLatitud = document.getElementById('latitud');
    const inputLongitud = document.getElementById('longitud');

    let nombre = inputNombre.value.trim();
    let latRaw = inputLatitud.value.trim();
    let lngRaw = inputLongitud.value.trim();

    // Si el nombre está vacío, utilizar el placeholder
    if (!nombre) {
        nombre = inputNombre.placeholder || "Ubicación";
    }

    // Si las coordenadas están vacías, utilizar el placeholder
    if (!latRaw) {
        latRaw = inputLatitud.placeholder;
    }

    if (!lngRaw) {
        lngRaw = inputLongitud.placeholder;
    }

    // Reemplazar coma decimal por punto
    const lat = latRaw.replace(',', '.');
    const lng = lngRaw.replace(',', '.');

    // Convertir los valores a números
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    // Comprobar que las coordenadas sean numéricas
    if (isNaN(latNum) || isNaN(lngNum)) {
        alert('Por favor, ingresa coordenadas numéricas válidas.');
        return;
    }

    // Comprobar los límites de las coordenadas
    if (
        latNum < -90 ||
        latNum > 90 ||
        lngNum < -180 ||
        lngNum > 180
    ) {
        alert(
            'La latitud debe estar entre -90 y 90. ' +
            'La longitud debe estar entre -180 y 180.'
        );
        return;
    }

    // Crear la URL de Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${latNum},${lngNum}`;

    // Abrir Google Maps en una nueva pestaña
    window.open(url, '_blank');
});
