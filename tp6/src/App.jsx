import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState(
    "Todavía no se creó ningún Blob."
  );
  const [blobUrl, setBlobUrl] = useState("");
  const [textoDividido, setTextoDividido] = useState("");

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  function crearBlob() {
    const contenido =
      "Hola. Este texto fue creado utilizando el concepto de Blob en JavaScript.";

    const blob = new Blob([contenido], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    setBlobUrl((anterior) => {
      if (anterior) {
        URL.revokeObjectURL(anterior);
      }
      return url;
    });

    setTextoDividido("");

    setMensaje(
      `Blob creado correctamente. Tipo: ${blob.type}. Tamaño: ${blob.size} bytes.`
    );
  }

  function descargarBlob() {
    if (!blobUrl) {
      setMensaje("Primero creá el Blob de texto.");
      return;
    }

    const enlace = document.createElement("a");
    enlace.href = blobUrl;
    enlace.download = "texto-blob.txt";

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setMensaje("Se descargó el archivo texto-blob.txt.");
  }

  async function usarSlice() {
    if (!blobUrl) {
      setMensaje("Primero creá el Blob de texto.");
      return;
    }

    try {
      const respuesta = await fetch(blobUrl);
      const blob = await respuesta.blob();

      const fragmento = blob.slice(0, 12, "text/plain");
      const texto = await fragmento.text();

      setTextoDividido(texto);

      setMensaje(
        `Fragmento creado con slice(). Tamaño: ${fragmento.size} bytes.`
      );
    } catch (error) {
      setMensaje("No se pudo obtener el fragmento.");
    }
  }

  return (
    <div className="pagina">
      <Header />

      <main className="contenido">
        <h1>Ejemplo de uso de Blobs</h1>

        <div className="botones">
          <button onClick={crearBlob}>
            Crear Blob de texto
          </button>

          <button onClick={descargarBlob}>
            Descargar Blob
          </button>

          <button onClick={usarSlice}>
            Usar slice()
          </button>
        </div>

        <section className="resultado">
          <h2>Resultado</h2>

          <p>{mensaje}</p>

          {textoDividido && (
            <div className="fragmento">
              <strong>Fragmento:</strong> {textoDividido}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;