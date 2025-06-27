# from flask import Flask, request, render_template
# from model import get_recommendations
# import pandas as pd
#
#  app = Flask(__name__)
#
#  @app.route('/')
#  def index():
#      return render_template('index.html')
#  @app.route('/recommend', methods=['POST'])
#  def recommend():
#      ingredients = request.form.get('ingredients', '')
#      results = get_recommendations(ingredients)
#
#      formatted = [
#          {"dish": name, "match_score": round(score, 2)}
#          for name, score in results
#      ]
#
#      return render_template("index.html", recommendations=formatted)
#
#  if __name__ == '__main__':
#      app.run(debug=True)
#
#
#

from flask import Flask, request, render_template
from model import get_recommendations

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    ingredients = request.form.get('ingredients', '')
    ingredient_list = [i.strip().lower() for i in ingredients.split(',') if i.strip()]

    ingredient_str = ','.join(ingredient_list)
    results = get_recommendations(ingredient_str)

    # ✅ Only dish names (no score)
    dish_names = [name for name, _ in results]

    return render_template("index.html", recommendations=dish_names, entered_ingredients=ingredient_list)

if __name__ == '__main__':
    app.run(debug=True)
