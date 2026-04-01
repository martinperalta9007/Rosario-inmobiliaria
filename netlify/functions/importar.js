exports.handler = async (event) => {
  const { url } = JSON.parse(event.body);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `Extraé datos de fichas inmobiliarias argentinas de Xintel. Respondé SOLO con JSON válido sin markdown:
{"titulo":"tipo + ambientes + barrio","tipo":"Departamento/Casa/PH/Terreno/etc","operacion":"Venta o Emprendimiento","precio":"con moneda ej USD 180.000","barrio":"barrio o localidad","direccion":"calle y número","sup":"número solo","ambientes":"número solo","dorm":"número solo","banos":"número solo","descripcion":"2-3 oraciones atractivas","imagen":"","link":"la url recibida"}`,
      messages: [{ role: "user", content: `URL de ficha Xintel: ${url}` }]
    })
  });
  const data = await res.json();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data)
  };
};
