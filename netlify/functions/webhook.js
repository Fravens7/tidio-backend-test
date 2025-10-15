import { evaluate } from "mathjs";

export async function handler(event) {
  try {
    let message = "";
    if (event.body) {
      const body = JSON.parse(event.body);
      message = body.message || "";
    }
    if (!message && event.queryStringParameters) {
      message = event.queryStringParameters.message || "";
    }

    const text = message.toLowerCase() || "sin mensaje";
    let reply = "No entiendo tu mensaje aún.";

    // --- Respuestas simples ---
    if (text.includes("hola")) {
      reply = "👋 ¡Hola! ¿Cómo estás?";
    } else if (text.includes("adiós")) {
      reply = "👋 ¡Hasta luego!";
    } else if (text.match(/[\d\s\+\-\*\/\(\)]+/)) {
      // Calculos avanzados
      try {
        const result = evaluate(text);
        reply = `El resultado es ${result}`;
      } catch (e) {
        reply = "⚠️ Error en el cálculo";
      }
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
