
import { useState } from 'react';
import './App.css';

function App() {
  const [texto, setTexto] = useState(
    'Este es un ejemplo de archivo de texto creado utilizando Blob en React.'
  );

  const [blob, setBlob] = useState(null);
  const [contenido, setContenido] = useState('');
  const [resultadoSlice, setResultadoSlice] = useState('');
  const [mensaje, setMensaje] = useState('');

  // 1. Crear Blob
  function crearBlob() {
    if (texto.trim() === '') {
      setMensaje('Por favor, escribí un texto.');
      return;
    }

    const nuevoBlob = new Blob([texto], {
      type: 'text/plain'
    });

    setBlob(nuevoBlob);
    setContenido(texto);
    setResultadoSlice('');

    setMensaje('¡Blob creado correctamente!');
  }

  // 2. Descargar archivo TXT
  function descargarBlob() {
    if (!blob) {
      setMensaje('Primero tenés que crear el Blob.');
      return;
    }

    const url = URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'archivo.txt';

    enlace.click();

    URL.revokeObjectURL(url);

    setMensaje('Archivo descargado correctamente.');
  }

  // 3. Utilizar Slice
  async function usarSlice() {
    if (!blob) {
      setMensaje('Primero tenés que crear el Blob.');
      return;
    }

    const mitad = Math.ceil(blob.size / 2);

    const parte = blob.slice(0, mitad, 'text/plain');

    const textoExtraido = await parte.text();

    setResultadoSlice(textoExtraido);

    setMensaje('Slice aplicado correctamente.');
  }

  return (
    <div className="pagina">

      <header>
        <h1>Ejemplo de uso de Blobs</h1>
        <p>Creación, descarga y extracción de archivos de texto</p>
      </header>

      <main className="contenedor">

        <section className="editor">
          <h2>Crear archivo de texto</h2>

          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribí tu texto aquí..."
          />

          <div className="botones">
            <button onClick={crearBlob}>
              Crear Blob
            </button>

            <button onClick={descargarBlob}>
              Descargar TXT
            </button>

            <button onClick={usarSlice}>
              Usar Slice()
            </button>
          </div>

          <p className="mensaje">{mensaje}</p>
        </section>

        <section className="resultados">

          <div className="caja">
            <h2>Contenido del Blob</h2>

            <pre>
              {contenido || 'Todavía no se creó ningún Blob.'}
            </pre>
          </div>

          <div className="caja">
            <h2>Resultado de Slice()</h2>

            <pre>
              {resultadoSlice || 'Aquí aparecerá la parte extraída.'}
            </pre>
          </div>

        </section>

      </main>

      <footer>
        Trabajo Práctico 5 - React | Conceptos Blob y Slice
      </footer>

    </div>
  );
}

export default App;
