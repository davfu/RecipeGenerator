from app.models import Recipe

"""
get_recipes()
Input: Dictionary, 
Output: Array

Finds the recipes based on number of ingredients, calories, protein, 
carbs, fat, and if they want the value to be a maximum or minimum.
"""
def get_recipes(form):
    # get user-selected values
    num_ing = form.get("slider-ingredients")
    cals = form.get("slider-calories")
    protein = form.get("slider-protein")
    carbs = form.get("slider-carbohydrates")
    fat = form.get("slider-fat")

    # map form field names to corresponding SQLAlchemy model attributes
    attributes = {
        "slider-ingredients": Recipe.num_ingredients,
        "slider-calories": Recipe.cals,
        "slider-protein": Recipe.protein,
        "slider-carbohydrates": Recipe.carbs,
        "slider-fat": Recipe.fat,
    }

    # map form field names to comparison operators
    operators = {
        "slider-ingredients": "__le__" if form.get("attr-ingredients") == 'atMost' else "__ge__",
        "slider-calories": "__le__" if form.get("attr-calories") == 'atMost' else "__ge__",
        "slider-protein": "__le__" if form.get("attr-protein") == 'atMost' else "__ge__",
        "slider-carbohydrates": "__le__" if form.get("attr-carbohydrates") == 'atMost' else "__ge__",
        "slider-fat": "__le__" if form.get("attr-fat") == 'atMost' else "__ge__",
    }

    # dynamic filter conditions
    filter_conditions = [
        # gets the SQLAlchemy model and comparison operator, then calls with user-selected value
        getattr(attributes[field], operators[field])(value)
        for field, value in {
            "slider-ingredients": num_ing,
            "slider-calories": cals,
            "slider-protein": protein,
            "slider-carbohydrates": carbs,
            "slider-fat": fat,
        }.items()
        if value is not None
    ]

    # apply the dynamic filter conditions to the query
    # * passes each element in filter list into the parameters
    recipes = Recipe.query.filter(*filter_conditions).with_entities(Recipe.title, 
                                                                    Recipe.url, 
                                                                    Recipe.cals, 
                                                                    Recipe.carbs, 
                                                                    Recipe.fat, 
                                                                    Recipe.protein,
                                                                    Recipe.num_ingredients,
                                                                    Recipe.rating,
                                                                    Recipe.rev_count,
                                                                    Recipe.image_url,
                                                                    Recipe.time).all()

    return recipes
