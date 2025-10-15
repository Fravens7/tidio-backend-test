export async function handler(event) {
  try {
    // 1️⃣ Intentar leer mensaje desde POST
    let message = "";
    if (event.body) {
      const body = JSON.parse(event.body);
      message = body.message || "";
    }

    // 2️⃣ Si no hay mensaje en POST, buscar en query string (GET)
    if (!message && event.queryStringParameters) {
      message = event.queryStringParameters.message || "";
    }

    const text = message.toLowerCase() || "sin mensaje";

    let reply = "No entiendo tu mensaje aún.";

    // --- Ejemplos simples ---
    if (text.includes("hola")) {
      reply = "👋 ¡Hola! ¿Cómo estás?";
    } else if (text.includes("adiós")) {
      reply = "👋 ¡Hasta luego!";
    } else if (text.match(/\d+\s*\+\s*\d+/)) {
      const result = eval(text);
      reply = `El resultado es ${result}`;
    } else if (text.includes("hora")) {
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
