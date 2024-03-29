import { urlFor } from "../lib/sanity";
import { MinutesToDuration } from "../utils/utils";

export function loadRecipeBreadcrumbsSchema(tagTitle, tagSlug, recipeTitle) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Recipes",
        "item": "https://www.coffeenatedstories.com/recipes"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "${tagTitle}",
        "item": "https://www.coffeenatedstories.com/recipes/${tagSlug}"
      },{
        "@type": "ListItem",
        "position": 4,
        "name": "${recipeTitle}"
      }]
    }
    `,
  };
}

export function loadRecipeTagNumberBreadcrumbsSchema(
  tagTitle,
  tagSlug,
  currentPage,
  siteTitle
) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Recipes",
        "item": "https://www.coffeenatedstories.com/recipes"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "${tagTitle}",
        "item": "https://www.coffeenatedstories.com/recipes/${tagSlug}"
      },{
        "@type": "ListItem",
        "position": 4,
        "name": "${tagTitle} - Page ${currentPage} | ${siteTitle}"
      }]
    }
    `,
  };
}

export function loadRecipeTagHomePageBreadcrumbsSchema(tagTitle, siteTitle) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Recipes",
        "item": "https://www.coffeenatedstories.com/recipes"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "${tagTitle} | ${siteTitle}"
      }]
    }
    `,
  };
}

export function loadRecipesNumberBreadcrumbSchema(currentPage, siteTitle) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Recipes",
        "item": "https://www.coffeenatedstories.com/recipes"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "Recipes - Page ${currentPage} | ${siteTitle}"
      }]
    }
    `,
  };
}

export function loadRecipesHomePageBreadcrumbsSchema(siteTitle) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Recipes | ${siteTitle}"
      }]
    }
    `,
  };
}

export function loadPostBreadcrumbSchema(
  categoryTitle,
  categorySlug,
  postTitle
) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "${categoryTitle}",
        "item": "https://www.coffeenatedstories.com/${categorySlug}"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "${postTitle}"
      }]
    }
    `,
  };
}

export function loadCategoryNumberBreadcrumbSchema(
  categoryTitle,
  categorySlug,
  currentPage
) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "${categoryTitle}",
        "item": "https://www.coffeenatedstories.com/${categorySlug}"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "${categoryTitle} - Page ${currentPage} | Coffeenated Stories"
      }]
    }
    `,
  };
}

export function loadCategoryHomePageBreadcrumbSchema(categoryTitle, siteTitle) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "${categoryTitle} | ${siteTitle}"
      }]
    }
    `,
  };
}

export function loadHomePageNumberBreadcrumbSchema(currentPage, title) {
  return {
    __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home Page",
        "item": "https://www.coffeenatedstories.com/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Page ${currentPage} | ${title}"
      }]
    }
    `,
  };
}

export function loadHomePageBreadcrumbSchema() {
  return {
    __html: `
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                "@type": "ListItem",
                "position": 1,
                "name": "Home Page"
                }
              ]
            }
    `,
  };
}

export function loadWebSiteSchema(webSiteData) {
  return {
    __html: `
            {
              "@context" : "https://schema.org",
              "@type" : "WebSite",
              "name" : "${webSiteData}",
              "alternateName" : "CS",
              "url" : "https://www.coffeenatedstories.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.coffeenatedstories.com/api/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }
    `,
  };
}

export function loadOrganisationSchema(webSiteData) {
  return {
    __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "${webSiteData}",
              "url": "https://www.coffeenatedstories.com/",
              "logo": "https://cdn.sanity.io/images/7hvwvfev/production/297a44b30dcf560719975e4a37d1bde34ce10848-500x500.png",
              "sameAs": ["https://www.youtube.com/@coffeenatedstories", "https://www.pinterest.com/coffeenatedstories/"],
              "foundingDate": "20220421T000000-0400",
              "description": "Coffeenated Stories is a little piece of the web where we publish our coffee-stained sheets of writings about everything that is coffee-related. Such as the coffee industry and history, the coffee preparation and brewing methods, and even the coffee plant itself. We also offer honest reviews about the equipment and tools to brew our favorite beverage. Here you can read about the latest and greatest coffee gear, coffee makers, grinders, etc. Discover many recipes and guides for making coffee and many other coffee drinks. Read through our pages to find out how the rest of the world prepares and enjoys their cup of coffee. Stay Coffeenated - Cheers.",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "coffeenatedstories@gmail.com"
              }
    }
    `,
  };
}

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
    return `,"itemListElement": [
      {
        "@type": "HowToTip",
        "text": "${tip}"
      }
    ]`;
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
          "image": "${urlFor(step.seoImage.asset).url()}"          
          ${step.seoHowToTip ? tipString(step.seoHowToTip) : ""}
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
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "${recipe.author.name}",
          "url": "https://www.coffeenatedstories.com/",
          "logo": "https://cdn.sanity.io/images/7hvwvfev/production/297a44b30dcf560719975e4a37d1bde34ce10848-500x500.png",
          "sameAs": ["https://www.youtube.com/@coffeenatedstories", "https://www.pinterest.com/coffeenatedstories/"],
          "foundingDate": "20220421T000000-0400",
          "description": "Coffeenated Stories is a little piece of the web where we publish our coffee-stained sheets of writings about everything that is coffee-related. Such as the coffee industry and history, the coffee preparation and brewing methods, and even the coffee plant itself. We also offer honest reviews about the equipment and tools to brew our favorite beverage. Here you can read about the latest and greatest coffee gear, coffee makers, grinders, etc. Discover many recipes and guides for making coffee and many other coffee drinks. Read through our pages to find out how the rest of the world prepares and enjoys their cup of coffee. Stay Coffeenated - Cheers.",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "coffeenatedstories@gmail.com"
          }
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
        ${recipe.recipeVideo ? `, "video": ${recipe.recipeVideo}` : ""}
      }
    `,
  };
}
