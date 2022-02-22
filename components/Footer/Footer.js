import Image from "next/image";
import Link from "next/link";

import { useNextSanityImage } from "next-sanity-image";
import configuredSanityClient from "../../lib/configuredSanityClient";

export default function Footer({ footer }) {
  const imageProps = useNextSanityImage(configuredSanityClient, footer[0].logo);
  return (
    <footer className="bg-gray-50 w-full mt-10 py-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="container mx-auto my-3 flex h-24 justify-around items-center">
          <Link href="/" passHref>
            <div className="relative h-full w-48 cursor-pointer">
              <Image
                className="object-fill"
                src={imageProps.src}
                loader={imageProps.loader}
                layout="fill"
                alt={footer[0].logo.altText}
              />
            </div>
          </Link>
        </div>
        <p className="prose-sm font-serif text-xs w-2/5 text-center border-b-2 border-gray-300 pb-4">
          {footer[0].content}
        </p>
        <p className="py-4">Copyright ©2021 All rights reserved</p>
      </div>
    </footer>
  );
}
