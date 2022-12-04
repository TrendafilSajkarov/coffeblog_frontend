import { urlFor } from "../lib/sanity";
import { MinutesToDuration } from "../utils/utils";

export function loadCaroselSchema(recipes) {
  return {
    __html: `
            {
                "@context":"https://schema.org",
                "@type":"ItemList",
                "itemListElement": [${recipes.map((recipe, i) => {
                  return `{   
                        "@type": "ListItem",
                        "position": "${i + 1}",
                        "url": "https://www.coffeenatedstories.com/recipes/${
                          recipe.recipeTags.slug
                        }/${recipe.slug}"
                    }`;
                })}]
            }
        `,
  };
}

export function loadRecipeSchema(recipe) {
  function tipString(tip) {
    return `"itemListElement": [
      {
        "@type": "HowToTip",
        "text": "${tip}"
      }
    ],`;
  }

  let recipeCat = recipe.recipeCategory.map((cat) => `"${cat}"`);
  let recipeCui = recipe.recipeCuisine.map((catCui) => `"${catCui}"`);
  let recipeIng = recipe.recipeIngredient.map((recIng) => `"${recIng}"`);
  let recipeIns = recipe.recipesSteps.ingredients.map((ing) => {
    return `{
      "@type": "HowToSection",
      "name": "${ing.singleIngredientName}",
      "itemListElement": [${ing.steps.map((step) => {
        return `{
          "@type": "HowToStep",
          "name": "${step.seoName}",
          "text": "${step.seoText}",
          "url": "https://coffeenatedstories.com/recipes/${
            recipe.categories.slug
          }/${recipe.slug.current}#${step._key}",
          ${step.seoHowToTip && tipString(step.seoHowToTip)}
          "image": "${urlFor(step.seoImage.asset).url()}"
        }`;
      })}]
    }`;
  });

  return {
    __html: `
      {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": "${recipe.title}",
        "image": ["${urlFor(recipe.mainImage.asset).url()}"],
        "author": {
          "@type": "Organization",
          "name": "${recipe.author.name}"
        },
        "datePublished": "${recipe._createdAt}",
        "description": "${recipe.description}",
        "prepTime": "${MinutesToDuration(recipe.recipeInfo.prepTime)}",
        "cookTime": "${MinutesToDuration(recipe.recipeInfo.cookTime)}",
        "totalTime": "${MinutesToDuration(recipe.recipeInfo.totalTime)}",
        "keywords": "${recipe.keywords.map((keyword) => keyword)}",
        "recipeYield": "${recipe.recipeInfo.recipeYield.split(" ")[0]}",
        "recipeCategory": [${recipeCat}],
        "recipeCuisine": [${recipeCui}],
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "${recipe.recipeInfo.calories}",
          "carbohydrateContent": "${recipe.recipeInfo.carbohydrateContent}",
          "proteinContent": "${recipe.recipeInfo.proteinContent}",
          "fatContent": "${recipe.recipeInfo.fatContent}"
        },
        "recipeIngredient": [${recipeIng}],
        "recipeInstructions": [${recipeIns}]
      }
    `,
  };
}
