import Image from "next/image";
import Link from "next/link";

import { useNextSanityImage } from "next-sanity-image";
import configuredSanityClient from "../../lib/configuredSanityClient";

export default function Footer({ footer }) {
  const imageProps = useNextSanityImage(configuredSanityClient, footer[0].logo);
  let date = new Date();
  return (
    <footer className="bg-gray-50 w-full mt-10 py-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="container mx-auto my-3 flex h-auto justify-around items-center">
          <Link href="/" passHref>
            <div className="relative h-full w-48 cursor-pointer">
              <Image
                unoptimized
                className="object-fill"
                width={imageProps.width}
                height={imageProps.height}
                src={imageProps.src}
                loader={imageProps.loader}
                layout="intrinsic"
                alt={footer[0].logo.altText}
              />
            </div>
          </Link>
        </div>
        <div className="flex mx-auto space-x-6 pb-3 prose-sm prose-a:text-sky-600 ">
          <Link href="/terms-and-conditions" passHref>
            <a rel="noopener nofollow noreferrer">Terms and Conditions</a>
          </Link>
          <Link href="/privacy-policy" passHref>
            <a rel="noopener nofollow noreferrer">Privacy Policy</a>
          </Link>
        </div>
        <p className="prose-sm font-serif text-xs lg:w-2/5 xs:w-3/4 text-center">
          {footer[0].content}
        </p>
        <div className="prose-sm text-xs mb-3 text-center border-b-2 border-gray-300 pb-4">
          <div className="">
            <div className="px-4 py-1 font-serif">
              <strong className="font-sans">Affiliate Disclaimer:</strong>{" "}
              CoffeenatedStories.com is a member of the Amazon Associates
              Program, and as an Amazon Associate, we earn from qualifying
              purchases.
            </div>
          </div>
        </div>
        <p className="py-4 text-center">
          Copyright ©{date.getFullYear()} Coffeenated Stories. All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
