import Image from "next/image";
import Link from "next/link";
import Pagination from "../Pagination/Pagination";

import { urlFor } from "../../lib/sanity";
import { useNextSanityImage } from "next-sanity-image";
import configuredSanityClient from "../../lib/configuredSanityClient";

import { getDate } from "../../utils/utils";

export default function MainContent({
  latestPost,
  latestPosts,
  pages,
  currentPage,
}) {
  const imageProps = useNextSanityImage(
    configuredSanityClient,
    latestPost.mainImage
  );

  return (
    <main className="col-span-2 grid grid-cols-1 auto-rows-auto h-fit">
      {currentPage === 0 ? (
        <div className="flex flex-wrap justify-between items-baseline px-1 mb-2">
          <h1 className="uppercase font-serif text-yellow-600 text-xs mb-3 px-1 ">
            Home Page
          </h1>
          <h4 className="uppercase font-serif text-yellow-600 text-xs mb-3 px-1 ">
            Latest Posts
          </h4>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between items-baseline px-1 mb-2">
          <div className="flex flex-wrap items-baseline">
            <Link href="/">
              <a className="uppercase text-xs font-serif hover:underline hover:text-yellow-600 text-slate-600">
                HOME
              </a>
            </Link>
            <span className="text-slate-500 font-semibold px-1">{">"}</span>
            <h1 className="uppercase font-serif text-yellow-600 text-xs">
              Page{" "}
              <span className="text-base font-semibold">{`${currentPage}`}</span>
            </h1>
          </div>
          <h4 className="uppercase font-serif text-yellow-600 text-xs">
            Latest Posts
          </h4>
        </div>
      )}
      {latestPost && (
        <article className="prose-sm px-1 group text-center row-span-1 h-screen max-h-1000 min-h-600 flex flex-col items-center">
          <div className="relative w-full h-2/3 shadow-md">
            <Image
              unoptimized
              src={urlFor(latestPost.mainImage).width(400).quality(100).url()}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt={latestPost.mainImage.altText}
            />
            {/* <div className="absolute top-4 flex flex-col items-center bg-gray-100 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
              <div className="text-4xl font-extrabold text-gray-700 ">
                {getDate(latestPost._createdAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-gray-700">
                {getDate(latestPost._createdAt)[1]}
              </div>
            </div> */}
          </div>
          <div className="flex flex-col items-center font-serif border-t-2 border-yellow-600">
            <h4 className="uppercase text-white bg-yellow-600 px-2 -translate-y-1/2 text-xs m-0 ">
              {latestPost.categories.title}
            </h4>
            <Link href={`/${latestPost.categories.slug}/${latestPost.slug}`}>
              <a>
                <h3 className="font-light group-hover:underline mt-0">
                  {latestPost.title}
                </h3>
              </a>
            </Link>

            <p className="text-xs text-gray-400 m-0">
              By {latestPost.author.name} | {latestPost.estimatedReadingTime}{" "}
              min read
            </p>
            <p className="text-base font-sans line-clamp-5">
              {latestPost.excerpt}
            </p>
            <Link
              href={`/${latestPost.categories.slug}/${latestPost.slug}`}
              as={`/${latestPost.categories.slug}/${latestPost.slug}`}
            >
              <a>
                <button className="border-2 border-yellow-600 uppercase hover:underline shadow-md px-6 py-1 text-gray-600 text-xs">
                  Read Post
                </button>
              </a>
            </Link>
          </div>
        </article>
      )}
      <section className="row-span-2 pt-5 flex flex-col sm:flex-row sm:flex-wrap md:items-center items-center">
        {latestPosts.map((post, i) => {
          if (latestPost !== null && i === 0) {
            return null;
          }
          let aspectRatio = post.mainImageMeta.dimensions.aspectRatio;
          let dimentions;
          if (aspectRatio >= 1.2) {
            dimentions = { width: 500, height: 400 };
          } else if (aspectRatio <= 0.8) {
            dimentions = { width: 400, height: 600 };
          } else {
            dimentions = { width: 500, height: 500 };
          }

          return (
            <div
              key={post._id}
              className="relative max-w-lg w-full sm:w-2/4 pt-5 px-1 group"
            >
              <div className={`relative w-full flex justify-center`}>
                <Image
                  unoptimized
                  src={urlFor(post.mainImage).width(400).quality(100).url()}
                  width={dimentions.width}
                  height={dimentions.height}
                  layout="intrinsic"
                  objectFit="cover"
                  alt={post.mainImage.altText}
                />
              </div>
              {/* <div
                className={`absolute top-8 ${
                  post.mainImageMeta.dimensions.aspectRatio <= 1 &&
                  "left-1 top-3"
                } flex flex-col items-center bg-gray-100 bg-opacity-70 px-3 mx-3 shadow-md`}
              >
                <div className="text-2xl font-extrabold text-gray-700">
                  {getDate(post._createdAt)[0]}
                </div>
                <div className="text-base font-medium h-auto text-gray-700">
                  {getDate(post._createdAt)[1]}
                </div>
              </div> */}
              <div className="flex flex-col items-center font-serif mb-5 border-t-2 border-yellow-600">
                <h4 className="uppercase text-xs -translate-y-1/2 bg-yellow-600 text-white px-3 whitespace-nowrap">
                  {post.categories.title}
                </h4>
                <Link href={`/${post.categories.slug}/${post.slug}`}>
                  <a>
                    <h3 className="text-lg text-center font-medium group-hover:underline">
                      {post.title}
                    </h3>
                  </a>
                </Link>

                <p className="text-xs text-gray-400">
                  By {post.author.name} | {post.estimatedReadingTime} min read
                </p>
                <p className="text-base font-sans line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/${post.categories.slug}/${post.slug}`}
                  as={`/${post.categories.slug}/${post.slug}`}
                >
                  <a>
                    <button className="border-2 border-yellow-600 uppercase hover:underline shadow-md px-6 py-1 mt-3 text-gray-600 text-xs">
                      Read Post
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
