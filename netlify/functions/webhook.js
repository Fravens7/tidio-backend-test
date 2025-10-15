export async function handler(event) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const message = body.message?.toLowerCase() || "sin mensaje";

    let reply = "No entiendo tu mensaje aún.";

    // --- Ejemplos simples ---
    if (message.includes("hola")) {
      reply = "👋 ¡Hola! ¿Cómo estás?";
    } else if (message.includes("adiós")) {
      reply = "👋 ¡Hasta luego!";
    } else if (message.match(/\d+\s*\+\s*\d+/)) {
      // Detecta operaciones simples tipo "2 + 3"
      const result = eval(message);
      reply = `El resultado es ${result}`;
    } else if (message.includes("hora")) {
      reply = `🕒 La hora actual es: ${new Date().toLocaleTimeString()}`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
