import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../../lib/sanity";

import { getDate } from "../../utils/utils";

export default function Latest({ featuredPosts, featuredRecipes }) {
  return (
    <main className="xl:container mx-auto py-8 grid md:grid-rows-2 min-h-700 h-xxxxl md:h-xxxl lg:grid-cols-2 lg:grid-rows-1 gap-2 lg:h-screen lg:max-h-760 w-full">
      <div className="relative group">
        <Image
          unoptimized
          objectFit="cover"
          src={urlFor(featuredPosts[0].mainImage).width(800).height(800).url()}
          layout="fill"
          alt={featuredPosts[0].mainImage.altText}
          priority
        />
        <div className="absolute bottom-0 min-h-1/4 h max-h-full w-full flex items-start bg-slate-600 bg-opacity-40 py-3">
          <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
            <div className="text-3xl font-extrabold text-white ">
              {getDate(featuredPosts[0]._updatedAt)[0]}
            </div>
            <div className="text-base font-medium h-auto text-white whitespace-nowrap">
              {getDate(featuredPosts[0]._updatedAt)[1]}{" "}
              {getDate(featuredPosts[0]._updatedAt)[3]}
            </div>
          </div>
          <div className="pl-2 md:pl-0 flex flex-col items-start">
            <div className="bg-gray-100 bg-opacity-90 shadow-lg">
              <h4 className="uppercase text-yellow-600 text-xs px-2">
                {featuredPosts[0].categories.title}
              </h4>
            </div>
            <Link
              href={`/${featuredPosts[0].categories.slug}/${featuredPosts[0].slug}`}
            >
              <a>
                <h3 className="text-xl font-light font-serif text-white prose-sm group-hover:underline">
                  {featuredPosts[0].title}
                </h3>
              </a>
            </Link>
            {featuredPosts[0].excerpt && (
              <div>
                <p className="md:max-w-screen-sm prose-sm text-base font-sans text-white font-extralight line-clamp-6">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="flex">
                  <p className="text-xs prose-sm px-1 bg-opacity-50 bg-gray-600 text-gray-100">
                    By {featuredPosts[0].author.name} |{" "}
                    {featuredPosts[0].estimatedReadingTime} min read
                  </p>
                  <p className="md:hidden text-xs prose-sm px-1 bg-opacity-50 bg-gray-600 text-gray-100">
                    Updated On: {getDate(featuredPosts[0]._updatedAt)[1]}{" "}
                    {getDate(featuredPosts[0]._updatedAt)[0]}{" "}
                    {getDate(featuredPosts[0]._updatedAt)[2]}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row grid-rows-3 md:grid-flow-col grid-cols-2 md:grid-rows-2 gap-2">
        <div className="relative group">
          <Image
            unoptimized
            objectFit="cover"
            src={urlFor(featuredRecipes[0].mainImage)
              .width(800)
              .height(800)
              .url()}
            layout="fill"
            alt={featuredRecipes[0].mainImage.altText}
          />
          <div className="absolute overflow-clip bottom-0 min-h-2/5 max-h-full w-full flex items-start bg-slate-600 bg-opacity-40 py-3">
            <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-1 px-4 mx-4 shadow-lg">
              <div className="text-3xl font-extrabold text-white">
                {getDate(featuredRecipes[0]._updatedAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-white whitespace-nowrap">
                {getDate(featuredRecipes[0]._updatedAt)[1]}{" "}
                {getDate(featuredRecipes[0]._updatedAt)[3]}
              </div>
            </div>
            <div className="pl-2 md:pl-0 flex flex-col items-start">
              <div className="shadow-lg flex">
                <h4 className="uppercase text-white bg-yellow-600 text-xs px-2">
                  RECIPES
                </h4>
                <h4 className="uppercase bg-gray-100 bg-opacity-90  text-yellow-600 text-xs px-2">
                  {featuredRecipes[0].recipeTags.title}
                </h4>
              </div>
              <Link
                href={`/recipes/${featuredRecipes[0].recipeTags.slug}/${featuredRecipes[0].slug}`}
              >
                <a>
                  <h3 className="line-clamp-5 md:line-clamp-none text-xl font-light font-serif text-white prose-sm group-hover:underline">
                    {featuredRecipes[0].title}
                  </h3>
                </a>
              </Link>
              <p className="text-xs prose-sm px-1 bg-gray-600 bg-opacity-50 text-gray-100">
                Recipe By {featuredRecipes[0].author.name}
              </p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <Image
            unoptimized
            objectFit="cover"
            src={urlFor(featuredRecipes[1].mainImage)
              .width(800)
              .height(800)
              .url()}
            layout="fill"
            alt={featuredRecipes[1].mainImage.altText}
          />
          <div className="absolute overflow-clip bottom-0 min-h-2/5 max-h-full w-full flex items-start bg-slate-600 bg-opacity-40 py-3">
            <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-1 px-4 mx-4 shadow-lg">
              <div className="text-3xl font-extrabold text-white">
                {getDate(featuredRecipes[1]._updatedAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-white whitespace-nowrap">
                {getDate(featuredRecipes[1]._updatedAt)[1]}{" "}
                {getDate(featuredRecipes[1]._updatedAt)[3]}
              </div>
            </div>
            <div className="pl-2 md:pl-0 flex flex-col items-start">
              <div className="shadow-lg flex">
                <h4 className="uppercase text-white bg-yellow-600 text-xs px-2">
                  RECIPES
                </h4>
                <h4 className="uppercase bg-gray-100 bg-opacity-90 text-yellow-600 text-xs px-2">
                  {featuredRecipes[1].recipeTags.title}
                </h4>
              </div>
              <Link
                href={`/recipes/${featuredRecipes[1].recipeTags.slug}/${featuredRecipes[1].slug}`}
              >
                <a>
                  <h3 className="line-clamp-5 md:line-clamp-none text-xl font-light font-serif text-white group-hover:underline">
                    {featuredRecipes[1].title}
                  </h3>
                </a>
              </Link>
              <p className="text-xs prose-sm px-1 bg-gray-600 bg-opacity-50 text-gray-100">
                Recipe By {featuredRecipes[1].author.name}
              </p>
            </div>
          </div>
        </div>

        <div className="relative col-span-2 row-span-2 md:col-span-1 group">
          <Image
            unoptimized
            objectFit="cover"
            src={urlFor(featuredPosts[1].mainImage).width(800).url()}
            layout="fill"
            alt={featuredPosts[1].mainImage.altText}
          />
          <div className="absolute bottom-0 right-0 min-h-1/4 max-h-full w-full flex items-start bg-slate-600 bg-opacity-40 py-3">
            <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-1 px-4 mx-4 shadow-lg">
              <div className="text-3xl font-extrabold text-white">
                {getDate(featuredPosts[1]._updatedAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-white whitespace-nowrap">
                {getDate(featuredPosts[1]._updatedAt)[1]}{" "}
                {getDate(featuredPosts[1]._updatedAt)[3]}
              </div>
            </div>
            <div className="pl-2 md:pl-0 flex flex-col items-start">
              <div className="bg-gray-100 bg-opacity-90 shadow-lg">
                <h4 className="uppercase text-yellow-600 text-xs px-2">
                  {featuredPosts[1].categories.title}
                </h4>
              </div>
              <Link
                href={`/${featuredPosts[1].categories.slug}/${featuredPosts[1].slug}`}
              >
                <a>
                  <h3 className="text-xl font-light font-serif text-white text-shadow group-hover:underline">
                    {featuredPosts[1].title}
                  </h3>
                </a>
              </Link>

              <p className="prose-sm text-base font-sans text-white font-extralight line-clamp-6">
                {featuredPosts[1].excerpt}
              </p>
              <div className="flex">
                <p className="text-xs prose-sm px-1 bg-opacity-50 bg-gray-600 text-gray-100">
                  By {featuredPosts[1].author.name} |{" "}
                  {featuredPosts[1].estimatedReadingTime} min read
                </p>
                <p className="md:hidden text-xs prose-sm px-1 bg-opacity-50 bg-gray-600 text-gray-100">
                  Updated On: {getDate(featuredPosts[1]._updatedAt)[1]}{" "}
                  {getDate(featuredPosts[1]._updatedAt)[0]}{" "}
                  {getDate(featuredPosts[1]._updatedAt)[2]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
