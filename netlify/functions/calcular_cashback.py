
import json

def handler(event, context):
    # Leer body del request
    try:
        data = json.loads(event['body'])
        promocion = data.get("promocion", "").lower()
        monto = float(data.get("monto", 0))
    except:
        return {"statusCode": 400, "body": json.dumps({"error": "Formato inválido"})}

    # Cargar reglas
    with open("promociones.json") as f:
        reglas = json.load(f)

    if promocion == "chicken dash":
        porcentaje = reglas["chicken_dash"]["porcentaje"]
        maximo = reglas["chicken_dash"]["maximo"]
        minimo = reglas["chicken_dash"]["minimo"]
        cashback = monto * porcentaje
        if cashback > maximo:
            cashback = maximo
        if cashback < minimo:
            cashback = minimo
        return {"statusCode": 200, "body": json.dumps({
            "promocion": "Chicken Dash",
            "monto_ingresado": monto,
            "porcentaje_aplicado": porcentaje*100,
            "cashback": cashback
        })}
    
    elif promocion == "slots":
        slots_rules = reglas["slots"]
        porcentaje = 0
        for r in slots_rules:
            if r["max"] is None and monto >= r["min"]:
                porcentaje = r["porcentaje"]
            elif r["min"] <= monto <= r["max"]:
                porcentaje = r["porcentaje"]
        cashback = monto * porcentaje
        if cashback < 10:
            cashback = 10
        return {"statusCode": 200, "body": json.dumps({
            "promocion": "Slots Weekly",
            "monto_ingresado": monto,
            "porcentaje_aplicado": porcentaje*100,
            "cashback": cashback
        })}

    else:
        return {"statusCode": 400, "body": json.dumps({"error": "Promoción no válida"})}
