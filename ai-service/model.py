import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# -----------------------------
# Step 1: Load and Clean Data
# -----------------------------
df = pd.read_csv("RasoiBot.csv")

# Drop rows with missing ingredients
df = df.dropna(subset=['Ingredient'])

# Lowercase and remove punctuation
df['Ingredient'] = df['Ingredient'].str.lower().str.replace(r'[^\w\s,]', '', regex=True)

# -----------------------------
# Step 2: Synonym Normalization
# -----------------------------
synonyms = {
    'green chili': 'green chilli',
    'green chillies': 'green chilli',
    'chilli': 'green chilli',
    'chili': 'green chilli',
    'garlic cloves': 'garlic',
    'onions': 'onion',
    'curd': 'yogurt'
}

def normalize_ingredients(text):
    for k, v in synonyms.items():
        text = text.replace(k, v)
    return text

df['Ingredient'] = df['Ingredient'].apply(normalize_ingredients)

# -----------------------------
# Step 3: Remove Common Ingredients
# -----------------------------
stop_ingredients = {'salt', 'water', 'oil', 'sugar'}

def remove_stop_ingredients(text):
    ingredients = [i.strip() for i in text.split(',')]
    filtered = [i for i in ingredients if i not in stop_ingredients]
    return ','.join(filtered)

df['Cleaned_Ingredient'] = df['Ingredient'].apply(remove_stop_ingredients)

# -----------------------------
# Step 4: TF-IDF Vectorization
# -----------------------------
vectorizer = TfidfVectorizer(tokenizer=lambda x: x.split(','))
ingredient_matrix = vectorizer.fit_transform(df['Cleaned_Ingredient'])

# -----------------------------
# Step 5: KNN Model
# -----------------------------
knn_model = NearestNeighbors(n_neighbors=15, metric='cosine')
knn_model.fit(ingredient_matrix)

# -----------------------------
# Step 6: Recommendation Function (No Cuisine Boost)
# -----------------------------
def recommend_from_ingredients(user_input, top_n=10):
    # Clean and normalize user input
    if isinstance(user_input, list):
        user_input = ','.join(user_input)
    user_input = user_input.lower().replace('\n', '').replace(';', ',').replace(' and ', ',')
    user_input = normalize_ingredients(user_input)
    user_input = remove_stop_ingredients(user_input)

    # Transform to vector
    user_vector = vectorizer.transform([user_input])

    # Get nearest neighbors
    distances, indices = knn_model.kneighbors(user_vector, n_neighbors=top_n)

    # Prepare recommendations
    results = []
    for i, dist in zip(indices[0], distances[0]):
        similarity = 1 - dist  # cosine distance → similarity
        if similarity == 0:
            continue  # skip completely dissimilar dishes
        dish = df.iloc[i]['Dish Name']
        results.append((dish, round(similarity, 3)))

    return sorted(results, key=lambda x: x[1], reverse=True)

# -----------------------------
# Step 7: Interface Function
# -----------------------------
def get_recommendations(user_input):
    recommendations = recommend_from_ingredients(user_input)
    print("\nTop Recipe Recommendations:\n")
    for dish, score in recommendations:
        print(f"{dish} — Similarity Score: {score}")
    return recommendations


