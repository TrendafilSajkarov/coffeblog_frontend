export default function RecipeInfo(singleRecipe) {
  return (
    <div className="prose pt-4 w-full">
      {singleRecipe.singleRecipe.recipeInfo && (
        <div className="overflow-x-auto flex ">
          <table className="table-auto overflow-auto">
            <caption className="text-center border-b-2 border-yellow-600 text-2xl font-medium font-serif">
              Nutrition Info
            </caption>
            <tr className="">
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Calories
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.calories}
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Carbohydrates
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.carbohydrateContent}
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Total Fat
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.fatContent}
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Protein
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.proteinContent}
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Caffeine
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.caffeineContent}
              </td>
            </tr>
          </table>

          <table className="table-auto overflow-auto divide-x divide-yellow-600">
            <caption className="text-center border-b-2 border-yellow-600 text-2xl font-medium font-serif">
              Recipe Info
            </caption>
            <tr className="">
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Yield
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.recipeYield}
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Preparation Time
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.prepTime}min
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Cooking Time
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.cookTime}min
              </td>
            </tr>
            <tr>
              <th className="whitespace-nowrap text-right px-1 xs:px-3">
                Total Time
              </th>
              <td className="whitespace-nowrap text-left">
                {singleRecipe.singleRecipe.recipeInfo.totalTime}min
              </td>
            </tr>
          </table>
        </div>
      )}
      <p className="mt-0 text-sm text-gray-600">
        * We calculate nutrition info using a publicly available ingredient
        database, which should only be considered an estimate.
      </p>
    </div>
  );
}
