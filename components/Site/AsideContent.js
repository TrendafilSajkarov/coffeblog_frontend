import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../../lib/sanity";

export default function AsideContent({
  aboutUs,
  olderFeaturedPosts,
  categories,
  recipeNavbar,
  featuredRecipes,
}) {
  return (
    <aside className="flex px-1 my-5 col-span-2 flex-col lg:flex lg:col-span-1 lg:flex-col ">
      {aboutUs && (
        <article className="sm:w-2/3 mx-auto lg:w-full">
          <Link href="/about-us" passHref>
            <h3 className="uppercase hover:cursor-pointer hover:text-red-300 font-serif text-yellow-600 text-xs mb-3">
              About Us
            </h3>
          </Link>
          <div className="prose-sm text-base font-medium">
            <div className="relative w-full h-52">
              <Image
                unoptimized
                src={urlFor(aboutUs.mainImage)
                  .width(300)
                  .height(300)
                  .auto("format")
                  .url()}
                layout="fill"
                objectFit="cover"
                alt={aboutUs.mainImage.altText}
              />
            </div>
            <div className="">
              <p>{aboutUs.shortText}</p>
            </div>
          </div>
        </article>
      )}
      <section className="mt-9 mx-auto">
        <h3 className="uppercase font-serif text-yellow-600 text-xs mb-3">
          Featured Posts
        </h3>
        <ul>
          {olderFeaturedPosts.map((post) => {
            return (
              <li
                key={post._id}
                className="min-h-max w-full py-2 group border-b-2 border-yellow-600 last:border-none"
              >
                <div className="h-full grid grid-cols-3">
                  <div className="relative col-span-1 h-full w-full">
                    <Image
                      unoptimized
                      src={urlFor(post.mainImage)
                        .width(150)
                        .height(150)
                        .auto("format")
                        .url()}
                      layout="fill"
                      objectFit="cover"
                      alt={post.mainImage.altText}
                    />
                  </div>
                  <div className="col-start-2 col-end-4 min-h-100 flex flex-col justify-between font-serif pl-3">
                    <h4 className="uppercase text-yellow-600 text-xs whitespace-nowrap ">
                      {post.categories.title}
                    </h4>
                    <Link
                      href={`/${post.categories.slug}/${post.slug}`}
                      passHref
                    >
                      <a className="flex-grow">
                        <h3 className="line-clamp-3 font-light group-hover:underline prose-sm text-base">
                          {post.title}
                        </h3>
                      </a>
                    </Link>

                    <p className="text-xs prose-sm text-gray-400 ">
                      By {post.author.name} | {post.estimatedReadingTime} min
                      read
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-9 w-full sm:w-2/3 lg:w-full bg-slate-50 p-3 shadow-md h-content mx-auto">
        <h3 className="uppercase font-serif text-yellow-600 text-xs mb-3">
          Categories
        </h3>
        <ul>
          <li>
            <Link href="/" passHref>
              <a className="pt-3 prose flex font-serif justify-between group border-b-2 border-red-300">
                <h3 className=" group-hover:text-red-300 font-light prose text-base ">
                  Home
                </h3>
              </a>
            </Link>
          </li>
          {categories.map((category) => {
            return (
              <li key={category._id}>
                <Link
                  href={{
                    pathname: "/[category]",
                    query: { category: category.slug },
                  }}
                  passHref
                >
                  <a className="pt-3 flex font-serif justify-between group border-b-2 border-red-300">
                    <h3 className=" group-hover:text-red-300 font-light text-base ">
                      {category.title}
                    </h3>
                    <h3 className="font-light group-hover:text-red-300 text-xs prose text-gray-500 self-end">
                      {category.posts.length} posts
                    </h3>
                  </a>
                </Link>
              </li>
            );
          })}
          <li>
            <ul>
              <li>
                <Link href="/recipes" passHref>
                  <a className="pt-3 flex font-serif justify-between group border-b-2 border-red-300">
                    <h3 className=" group-hover:text-red-300 font-light text-base ">
                      Recipes
                    </h3>
                    <h3 className="font-light group-hover:text-red-300 text-xs prose text-gray-500 self-end">
                      {recipeNavbar && recipeNavbar[0].totalRecipes} total
                      recipes
                    </h3>
                  </a>
                </Link>
              </li>
              {recipeNavbar &&
                recipeNavbar.map((recipeTag) => {
                  return (
                    <li key={recipeTag._id}>
                      <Link
                        href={{
                          pathname: "/recipes/[recipeTag]",
                          query: { recipeTag: recipeTag.slug.current },
                        }}
                        passHref
                      >
                        <a className="pt-3 flex font-serif justify-between group border-b-2 border-red-300">
                          <h3 className=" group-hover:text-red-300 font-light text-base ">
                            - {recipeTag.title}
                          </h3>
                          <h3 className="font-light group-hover:text-red-300 text-xs prose text-gray-500 self-end">
                            {recipeTag.recipesInThisTag} recipes
                          </h3>
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </li>
        </ul>
      </section>
      {featuredRecipes && (
        <section className="my-5 mx-auto">
          <h3 className="uppercase font-serif text-yellow-600 text-xs mb-3">
            Featured Recipes
          </h3>
          <ul className="grid grid-cols-2 gap-2 gap-y-6">
            {featuredRecipes.map((recipe) => {
              return (
                <li
                  key={recipe._id}
                  className="flex flex-col w-full h-80 max-w-xs max-h-760 group"
                >
                  <div className="relative h-full w-full flex-1 mr-3">
                    <Image
                      unoptimized
                      src={urlFor(recipe.mainImage.asset)
                        .width(550)
                        .height(500)
                        .url()}
                      layout="fill"
                      objectFit="cover"
                      alt={recipe.mainImage.altText}
                    />
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
      )}
      {/* <section className="mt-12 max-w-screen-sm self-center">
        <h4 className="uppercase font-serif text-yellow-600 text-xs mb-3">
          Subscribe
        </h4>
        <div className="prose-sm font-serif font-light bg-gray-50 p-4 rounded-md shadow">
          <p>
            Subscribe to our newsletter and get our newest updates right on your
            inbox.
          </p>
          <form>
            <input
              className="border-gray-300 rounded-lg shadow-sm w-full focus:ring-1 "
              type="email"
              placeholder="Your Email"
            />
            <label htmlFor="terms" className="block mt-3">
              <input
                className="border-gray-300 rounded shadow-sm mr-2 focus:ring-1 focus:ring-yellow-400"
                id="terms"
                type="checkbox"
              />
              I agree to the terms & conditions
            </label>
            <button className="border-2 border-yellow-600 bg-yellow-600 text-white uppercase shadow-md px-6 py-1 mt-6">
              Subscribe
            </button>
          </form>
        </div>
      </section> */}
    </aside>
  );
}
