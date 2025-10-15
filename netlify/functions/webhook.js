
// netlify/functions/webhook.js
exports.handler = async function(event, context) {
    // Parsear el JSON que envía Tidio
    const body = JSON.parse(event.body || "{}");
    const visitorMessage = body.message || "No message";

    // Simular respuesta (como si fuera RPA o ChatGPT)
    const responseMessage = `Recibí tu mensaje: "${visitorMessage}"`;

    // Devolver la respuesta como JSON
    return {
        statusCode: 200,
        body: JSON.stringify({ reply: responseMessage }),
    };
};
