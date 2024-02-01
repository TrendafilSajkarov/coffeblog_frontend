import Image from "next/image";
import Link from "next/link";
import RecipeTagPagination from "../Pagination/RecepieTagPagination";

import { urlFor } from "../../lib/sanity";

import { getDate } from "../../utils/utils";

export default function RecipesTagsMainContent({
  latestRecipes,
  currentPage,
  pages,
  basURL,
  currentTagTitle,
}) {
  return (
    <main className="col-span-3 flex flex-col px-1">
      <div className="uppercase font-serif text-white px-3 text-xs bg-yellow-600 flex flex-wrap justify-between items-baseline">
        <div className="flex flex-wrap items-baseline">
          <Link href="/">
            <a className="uppercase text-xs font-serif hover:underline text-white pr-1">
              HOME
            </a>
          </Link>
          <span className="text-white font-semibold px-1">{">"}</span>
          <Link href="/recipes">
            <a className="uppercase px-1 text-xs font-serif hover:underline text-white">
              Recipes
            </a>
          </Link>
          <span className="text-white font-semibold px-1">{">"}</span>
          <Link href={`/recipes/${basURL}`}>
            <a className="uppercase px-1 text-xs font-serif hover:underline text-white">
              {currentTagTitle}
            </a>
          </Link>
          <span className="text-white font-semibold px-1">{">"}</span>
          <h1 className="whitespace-nowrap uppercase px-1 text-xs font-serif text-yellow-600 bg-white">
            {`Page `}
            <span className="font-bold font-sans">{currentPage}</span>
          </h1>
        </div>
        <h4 className="uppercase font-serif text-white text-xs bg-yellow-600 flex justify-between">
          Latest Recipes
        </h4>
      </div>

      <section className="">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-2 gap-y-4 place-items-center mt-4">
          {latestRecipes.map((recipe, i) => {
            return (
              <li
                key={recipe._id}
                className="flex flex-col w-full h-80 max-w-xs max-h-760 group"
              >
                <div className="relative h-full w-full flex-1 mr-3">
                  <Image
                    src={urlFor(recipe.mainImage.asset)
                      .width(550)
                      .height(500)
                      .url()}
                    layout="fill"
                    objectFit="cover"
                    alt={recipe.mainImage.altText}
                  />
                  {/* <div className="absolute top-2 flex flex-col items-center bg-gray-100 bg-opacity-50 px-3 mx-3 shadow-lg">
                    <div className="text-2xl font-extrabold text-gray-700 ">
                      {getDate(post._createdAt)[0]}
                    </div>
                    <div className="text-base font-medium h-auto text-gray-700">
                      {getDate(post._createdAt)[1]}
                    </div>
                  </div> */}
                </div>
                <div className="flex flex-col items-center justify-end text-center font-serif border-t-2 border-t-yellow-600">
                  <h4 className="uppercase text-white text-xs bg-yellow-600 px-2 -translate-y-1/2">
                    {recipe.recipeTags.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Recipe By {recipe.author.name}
                  </p>
                  <Link
                    href={`/recipes/${recipe.recipeTags.slug}/${recipe.slug}`}
                  >
                    <a>
                      <h3 className="line-clamp-3 sm:line-clamp-3 text-lg font-medium group-hover:underline">
                        {recipe.title}
                      </h3>
                    </a>
                  </Link>
                  <Link
                    href={`/recipes/${recipe.recipeTags.slug}/${recipe.slug}`}
                  >
                    <a>
                      <button className="whitespace-nowrap px-5 border-2 border-yellow-600 uppercase hover:underline shadow-md xs:px-6 xs:py-1 xs:mt-1 text-gray-600 text-xs">
                        View Recipe
                      </button>
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      {pages > 0 && (
        <RecipeTagPagination
          pages={pages}
          currentPage={currentPage}
          category={basURL}
        />
      )}
    </main>
  );
}
