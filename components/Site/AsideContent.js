import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../../lib/sanity";

export default function AsideContent({
  aboutUs,
  olderFeaturedPosts,
  categories,
}) {
  return (
    <aside className="flex px-1 my-5 col-span-2 flex-col md:col-span-2 md:grid md:grid-cols-2 md:auto-rows-auto md:space-y-5 md:space-x-3 lg:flex lg:col-span-1 lg:flex-col ">
      {aboutUs && (
        <article className="w-full">
          <h4 className="uppercase font-serif text-yellow-600 text-xs mb-3">
            About Us
          </h4>
          <div className="prose-sm text-base font-medium">
            <div className="relative w-full h-52">
              <Image
                src={urlFor(aboutUs.mainImage.asset).width(300).url()}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="">
              <p>{aboutUs.shortText}</p>
            </div>
          </div>
        </article>
      )}
      <section className="mt-9">
        <h4 className="uppercase font-serif text-yellow-600 text-xs mb-3">
          Featured Posts
        </h4>
        <ul>
          {olderFeaturedPosts.map((post) => {
            return (
              <li
                key={post._id}
                className="h-24 min-h-max w-full py-2 group border-b-2 border-red-300 last:border-none"
              >
                <div className="h-full flex">
                  <div className="relative h-full w-4/12">
                    <Image
                      src={urlFor(post.mainImage.asset).width(150).url()}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col font-serif pl-3">
                    <h4 className="uppercase text-yellow-600 text-xs ">
                      {post.categories.title}
                    </h4>
                    <Link href={`/${post.categories.slug}/${post.slug}`}>
                      <a>
                        <h3 className="line-clamp-2 font-light group-hover:underline prose-sm text-base">
                          {post.title}
                        </h3>
                      </a>
                    </Link>

                    <p className="text-xs prose-sm text-gray-400">
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
      <section className="mt-9">
        <h4 className="uppercase font-serif text-yellow-600 text-xs mb-3">
          Categories
        </h4>
        <ul>
          <li>
            <Link href="/">
              <a className="flex font-serif justify-between group border-b-2 border-red-300">
                <h3 className=" group-hover:text-red-300 font-light prose-sm text-base ">
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
                >
                  <a className="flex font-serif justify-between group border-b-2 border-red-300">
                    <h3 className=" group-hover:text-red-300 font-light prose-sm text-base ">
                      {category.title}
                    </h3>
                    <h3 className="font-light group-hover:text-red-300 text-xs prose-sm text-gray-500 self-end">
                      {category.posts.length} posts
                    </h3>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-12 max-w-screen-sm self-center">
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
      </section>
    </aside>
  );
}
