import Image from "next/image";
import Link from "next/link";

import { useNextSanityImage } from "next-sanity-image";
import configuredSanityClient from "../../lib/configuredSanityClient";

import { getDate } from "../../utils/utils";

export default function Latest({ featuredPosts }) {
  const imageProps0 = useNextSanityImage(
    configuredSanityClient,
    featuredPosts[0].mainImage
  );
  const imageProps1 = useNextSanityImage(
    configuredSanityClient,
    featuredPosts[1].mainImage
  );
  const imageProps2 = useNextSanityImage(
    configuredSanityClient,
    featuredPosts[2].mainImage
  );
  const imageProps3 = useNextSanityImage(
    configuredSanityClient,
    featuredPosts[3].mainImage
  );

  return (
    <main className="xl:container mx-auto py-8 grid md:grid-rows-2 min-h-700 h-xxxxl md:h-xxxl lg:grid-cols-2 lg:grid-rows-1 gap-2 lg:h-screen lg:max-h-760 w-full">
      <div className="relative group">
        <Image objectFit="cover" src={imageProps0.src} layout="fill" />
        <div className="absolute bottom-0 h-2/5 max-h-200 w-full flex items-start">
          <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-2 px-6 mx-6 shadow-lg">
            <div className="text-3xl font-extrabold text-white ">
              {getDate(featuredPosts[0]._createdAt)[0]}
            </div>
            <div className="text-base font-medium h-auto text-white">
              {getDate(featuredPosts[0]._createdAt)[1]}
            </div>
          </div>
          <div className="pl-2 md:pl-0 flex flex-col items-start">
            <div className="bg-gray-100 bg-opacity-70 shadow-lg">
              <h4 className="uppercase text-yellow-600 text-xs px-2">
                {featuredPosts[0].categories.title}
              </h4>
            </div>
            <Link
              href={`/${featuredPosts[0].categories.slug}/${featuredPosts[0].slug.current}`}
            >
              <a>
                <h3 className="text-xl font-light font-serif text-white prose-sm group-hover:underline">
                  {featuredPosts[0].title}
                </h3>
              </a>
            </Link>
            {featuredPosts[0].excerpt && (
              <div>
                <p className="md:max-w-screen-sm prose-sm text-base font-serif text-white font-extralight line-clamp-3">
                  {featuredPosts[0].excerpt}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row grid-rows-3 md:grid-flow-col grid-cols-2 md:grid-rows-2 gap-2">
        <div className="relative group">
          <Image
            objectFit="cover"
            src={featuredPosts[1].mainImg}
            layout="fill"
          />
          <div className="absolute bottom-0 h-2/5 max-h-36 w-full flex items-start">
            <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-1 px-4 mx-4 shadow-lg">
              <div className="text-3xl font-extrabold text-white">
                {getDate(featuredPosts[1]._createdAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-white">
                {getDate(featuredPosts[1]._createdAt)[1]}
              </div>
            </div>
            <div className="pl-2 md:pl-0 flex flex-col items-start">
              <div className="bg-gray-100 bg-opacity-70 shadow-lg">
                <h4 className="uppercase text-yellow-600 text-xs px-2">
                  {featuredPosts[1].categories.title}
                </h4>
              </div>
              <Link
                href={`/${featuredPosts[1].categories.slug}/${featuredPosts[1].slug.current}`}
              >
                <a>
                  <h3 className="text-xl font-light font-serif text-white prose-sm group-hover:underline">
                    {featuredPosts[1].title}
                  </h3>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative group">
          <Image objectFit="cover" src={imageProps2.src} layout="fill" />
          <div className="absolute bottom-0 h-2/5 max-h-36 w-full flex items-start">
            <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-1 px-4 mx-4 shadow-lg">
              <div className="text-3xl font-extrabold text-white">
                {getDate(featuredPosts[2]._createdAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-white">
                {getDate(featuredPosts[2]._createdAt)[1]}
              </div>
            </div>
            <div className="pl-2 md:pl-0 flex flex-col items-start">
              <div className="bg-gray-100 bg-opacity-70 shadow-lg">
                <h4 className="uppercase text-yellow-600 text-xs px-2">
                  {featuredPosts[2].categories.title}
                </h4>
              </div>
              <Link
                href={`/${featuredPosts[2].categories.slug}/${featuredPosts[2].slug.current}`}
              >
                <a>
                  <h3 className="text-xl font-light font-serif text-white group-hover:underline">
                    {featuredPosts[2].title}
                  </h3>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative col-span-2 row-span-2 md:col-span-1 group">
          <Image objectFit="cover" src={imageProps3.src} layout="fill" />
          <div className="absolute bottom-0 right-0 h-2/4 max-h-200 w-full flex items-start">
            <div className="hidden md:flex flex-col items-center bg-gray-600 bg-opacity-50 w py-1 px-4 mx-4 shadow-lg">
              <div className="text-3xl font-extrabold text-white">
                {getDate(featuredPosts[3]._createdAt)[0]}
              </div>
              <div className="text-base font-medium h-auto text-white">
                {getDate(featuredPosts[3]._createdAt)[1]}
              </div>
            </div>
            <div className="pl-2 md:pl-0 flex flex-col items-start">
              <div className="bg-gray-100 bg-opacity-70 shadow-lg">
                <h4 className="uppercase text-yellow-600 text-xs px-2">
                  {featuredPosts[3].categories.title}
                </h4>
              </div>
              <Link
                href={`/${featuredPosts[3].categories.slug}/${featuredPosts[3].slug.current}`}
              >
                <a>
                  <h3 className="text-xl font-light font-serif text-white text-shadow group-hover:underline">
                    {featuredPosts[3].title}
                  </h3>
                </a>
              </Link>

              <p className="prose-sm text-base font-serif text-white font-extralight line-clamp-3">
                {featuredPosts[3].excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
