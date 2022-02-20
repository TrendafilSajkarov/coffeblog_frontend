import Image from "next/image";
import Link from "next/link";
import Pagination from "../Pagination/Pagination";

import { urlFor } from "../../lib/sanity";

import { getDate } from "../../utils/utils";

export default function MainContent({
  latestPost,
  latestPosts,
  pages,
  currentPage,
}) {
  return (
    <main className="col-span-2 grid grid-cols-1 auto-rows-auto">
      <h4 className="uppercase font-serif text-yellow-600 text-xs mb-3 px-4">
        Latest Posts
      </h4>
      {latestPost && (
        <article className="prose-sm px-1 group text-center row-span-1 h-screen max-h-1000 min-h-600 flex flex-col items-center justify-center">
          <div className="relative w-full h-2/3 shadow-md">
            <Image
              src={urlFor(latestPost.mainImage).width(800).height(800).url()}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt={latestPost.mainImage.altText}
            />
            <div className="absolute top-4 flex flex-col items-center bg-gray-100 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
              <div className="text-4xl font-extrabold text-gray-700 ">
                {getDate(latestPost._createdAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-gray-700">
                {getDate(latestPost._createdAt)[1]}
              </div>
            </div>
          </div>
          <div className="flex-col items-center font-serif">
            <h4 className="uppercase text-yellow-600 text-xs ">
              {latestPost.categories.title}
            </h4>
            <Link href={`/${latestPost.categories.slug}/${latestPost.slug}`}>
              <a>
                <h3 className="text- font-light group-hover:underline">
                  {latestPost.title}
                </h3>
              </a>
            </Link>

            <p className="text-xs text-gray-400">
              By {latestPost.author.name} | {latestPost.estimatedReadingTime}{" "}
              min read
            </p>
            <p className="text-base line-clamp-5">{latestPost.excerpt}</p>
            <Link
              href={`/${latestPost.categories.slug}/${latestPost.slug}`}
              as={`/${latestPost.categories.slug}/${latestPost.slug}`}
            >
              <a>
                <button className="border-2 border-yellow-600 uppercase hover:underline shadow-md px-6 py-1 text-gray-600 text-xs">
                  Read More
                </button>
              </a>
            </Link>
          </div>
        </article>
      )}
      <section className="row-span-2 pt-5 flex flex-col md:flex-row md:flex-wrap md:justify-between md:items-center">
        {latestPosts.map((post, i) => {
          if (latestPost !== null && i === 0) {
            return null;
          }
          let aspectRatio = post.mainImageMeta.dimensions.aspectRatio;
          let dimentions;
          if (aspectRatio >= 1.2) {
            dimentions = { width: 800, height: 500 };
          } else if (aspectRatio <= 0.8) {
            dimentions = { width: 500, height: 800 };
          } else {
            dimentions = { width: 500, height: 500 };
          }

          return (
            <div key={post._id} className="w-full md:w-2/4 mt-9 px-1 group">
              <div
                className={`relative h-80 ${
                  post.mainImageMeta.dimensions.aspectRatio >= 1
                    ? "md:h-60"
                    : "md:h-96"
                } w-full`}
              >
                <Image
                  src={urlFor(post.mainImage)
                    .width(dimentions.width)
                    .height(dimentions.height)
                    .quality(100)
                    .url()}
                  layout="fill"
                  objectFit="contain"
                  alt={post.mainImage.altText}
                />
                <div
                  className={`absolute top-2 ${
                    post.mainImageMeta.dimensions.aspectRatio <= 1 && "left-12"
                  } flex flex-col items-center bg-gray-100 bg-opacity-50 px-3 mx-3 shadow-lg`}
                >
                  <div className="text-2xl font-extrabold text-gray-700">
                    {getDate(post._createdAt)[0]}
                  </div>
                  <div className="text-base font-medium h-auto text-gray-700">
                    {getDate(post._createdAt)[1]}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center font-serif">
                <h4 className="uppercase text-yellow-600 text-xs ">
                  {post.categories.title}
                </h4>
                <Link href={`/${post.categories.slug}/${post.slug}`}>
                  <a>
                    <h3 className="text-lg font-medium group-hover:underline">
                      {post.title}
                    </h3>
                  </a>
                </Link>

                <p className="text-xs text-gray-400">
                  By {post.author.name} | {post.estimatedReadingTime} min read
                </p>
                <p className="text-base line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/${post.categories.slug}/${post.slug}`}
                  as={`/${post.categories.slug}/${post.slug}`}
                >
                  <a>
                    <button className="border-2 border-yellow-600 uppercase hover:underline shadow-md px-6 py-1 mt-3 text-gray-600 text-xs">
                      Read More
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
      {pages > 0 && <Pagination pages={pages} currentPage={currentPage} />}
    </main>
  );
}
