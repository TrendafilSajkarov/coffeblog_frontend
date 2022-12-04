import { PortableText } from "../../lib/sanity";
import { serializers } from "../../lib/serializers";

export default function PreparationSteps(recipe) {
  return (
    <div className="prose w-full prose-li:marker:text-yellow-600 prose-th:text-base prose-th:font-medium prose-th:py-1 prose-img:mx-auto prose-figcaption:italic prose-figcaption:text-xs prose-figcaption:text-center prose-a:text-blue-600 font-sans prose-headings:font-medium prose-headings:text-3xl prose-headings:font-serif prose-blockquote:font-serif">
      {recipe.recipe && (
        <div>
          <h2 className="border-b-2 border-yellow-600">Preparation Steps</h2>
          {recipe.recipe.map((ingredient) => {
            return (
              <div key={ingredient._key}>
                <h3>{ingredient.singleIngredientName}</h3>
                <ol className="border-b border-b-yellow-600">
                  {ingredient.steps.map((step) => {
                    return (
                      <li
                        key={step._key}
                        id={step._key}
                        className="marker:text-3xl border-b last:border-0"
                      >
                        {
                          <PortableText
                            blocks={step.stepText}
                            serializers={serializers}
                          />
                        }
                        {step.seoHowToTip && (
                          <div className="px-4 w-full flex flex-col border-2 bg-slate-50 shadow-sm shadow-yellow-600 mb-5">
                            <h3 className="mt-3 text-yellow-600 flex">Tip</h3>
                            <p className="text-center italic">
                              {step.seoHowToTip}
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
