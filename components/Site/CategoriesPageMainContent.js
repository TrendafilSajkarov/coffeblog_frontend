import Image from "next/image";
import Link from "next/link";
import CategoryPagination from "../Pagination/CategoryPagination";

import { urlFor } from "../../lib/sanity";

import { getDate } from "../../utils/utils";

export default function CategoriesPageMainContent({
  latestPosts,
  currentCategory,
  pages,
  currentPage,
}) {
  return (
    <main className="col-span-2 flex flex-col px-1">
      <div className="flex justify-between flex-wrap items-baseline">
        {currentPage === 0 ? (
          <div className="flex flex-wrap items-baseline ">
            <Link href="/">
              <a className="uppercase text-xs font-serif hover:underline hover:text-yellow-600 text-slate-600">
                HOME
              </a>
            </Link>
            <span className="text-slate-500 font-semibold px-1">{">"}</span>
            <h1 className="uppercase font-serif text-yellow-600 text-xs">
              {currentCategory[0].title}
            </h1>
          </div>
        ) : (
          <div className="flex flex-wrap items-baseline">
            <Link href="/">
              <a className="uppercase text-xs font-serif hover:underline hover:text-yellow-600 text-slate-600">
                HOME
              </a>
            </Link>
            <span className="text-slate-500 font-semibold px-1">{">"}</span>
            <Link href={`/${currentCategory[0].title}`}>
              <a className="uppercase text-xs font-serif hover:underline hover:text-yellow-600 text-slate-600">
                {currentCategory[0].title}
              </a>
            </Link>
            <span className="text-slate-500 font-semibold px-1">{">"}</span>
            <h1 className="uppercase font-serif text-yellow-600 text-xs">
              {`Page `}
              <span className="text-base font-semibold">{currentPage}</span>
            </h1>
          </div>
        )}
        <h4 className="uppercase font-serif text-yellow-600 text-xs">
          Latest Posts
        </h4>
      </div>

      <section className="flex flex-col">
        <ul className="space-y-6 mt-4">
          {latestPosts.map((post, i) => {
            return (
              <li key={post._id} className="flex w-full h-52 group">
                <div className="relative h-full w-full flex-1 mr-3">
                  <Image
                    unoptimized
                    src={urlFor(post.mainImage.asset).width(550).url()}
                    layout="fill"
                    objectFit="cover"
                    alt={post.mainImage.altText}
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
                <div className="flex flex-1 flex-col justify-between items-center font-serif">
                  <h4 className="uppercase text-white bg-yellow-600 px-2 text-xs ">
                    {currentCategory[0].title}
                  </h4>
                  <Link href={`/${currentCategory[0].slug}/${post.slug}`}>
                    <a>
                      <h3 className="line-clamp-3 sm:line-clamp-3 text-lg text-center font-medium group-hover:underline">
                        {post.title}
                      </h3>
                    </a>
                  </Link>

                  <p className="text-xs text-gray-400">
                    By {post.author.name} | {post.estimatedReadingTime} min read
                  </p>
                  <p className="text-base font-sans line-clamp-2 md:line-clamp-5">
                    {post.excerpt}
                  </p>
                  <Link href={`/${currentCategory[0].slug}/${post.slug}`}>
                    <a>
                      <button className="whitespace-nowrap px-5 border-2 border-yellow-600 uppercase hover:underline shadow-md xs:px-6 xs:py-1 xs:mt-1 text-gray-600 text-xs">
                        Read Post
                      </button>
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
          {pages > 0 && (
            <CategoryPagination
              pages={pages}
              currentPage={currentPage}
              category={currentCategory[0].slug}
            />
          )}
        </ul>
      </section>
    </main>
  );
}
