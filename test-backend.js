const data = {
  promocion: "chicken dash",
  monto: 4000
};

fetch("https://tu-proyecto.netlify.app/.netlify/functions/calcular_cashback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
  console.log("Respuesta backend:", result);
})
.catch(error => console.error("Error:", error));
