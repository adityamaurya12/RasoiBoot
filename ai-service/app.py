from flask import Flask, request, jsonify
from model import get_recommendations  # Your KNN function

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    if not request.is_json:
        return jsonify({"error": "Expected application/json"}), 400

    try:
        data = request.get_json()
        ingredients = data.get("ingredients")

        if not ingredients or not isinstance(ingredients, list):
            return jsonify({"error": "Invalid or missing 'ingredients' list"}), 400

        # Clean input
        cleaned = [i.strip().lower() for i in ingredients if i.strip()]
        ingredient_str = ",".join(cleaned)

        # Get recommendations from ML model
        results = get_recommendations(ingredient_str)  # Expects str, returns list of tuples
        dish_names = [dish for dish, _ in results]

        return jsonify(dish_names)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
