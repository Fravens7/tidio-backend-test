exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Backend activo desde Netlify!" }),
  };
};
