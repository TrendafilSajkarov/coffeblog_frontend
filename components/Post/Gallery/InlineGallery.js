import { urlFor } from "../../../lib/sanity";
import Image from "next/image";

export default function InlineGallery({ imgArr }) {
  return (
    <figure className="w-full flex flex-col bg-gradient-to-b from-white to-slate-50 shadow-md p-1 pb-2">
      <div className="w-full flex justify-between">
        {imgArr.map((img, i) => {
          return (
            <div key={img._key} className="relative px-1">
              <Image
                unoptimized
                src={urlFor(img.asset.url)
                  .width(250)
                  .height(250)
                  .quality(100)
                  .auto("format")
                  .url()}
                width={250}
                height={250}
                objectFit="contain"
                layout="intrinsic"
                alt={img.alt}
              />
              {img.caption && (
                <figcaption key={i} className="text-black font-medium">
                  {img.caption}
                </figcaption>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col place-items-end">
        {imgArr.map((img, i) => {
          if (img.attribution) {
            return (
              <figcaption key={i} className="text-slate-500 overflow-x-clip">
                {img.attribution}
              </figcaption>
            );
          } else if (img.asset?.creditLine) {
            return (
              <figcaption
                key={img.asset._id}
                className="text-slate-500 overflow-x-clip"
              >{`${img.asset?.creditLine}${
                img.asset?.source?.name === "unsplash"
                  ? "  -  " + img.asset?.source.url
                  : ""
              }`}</figcaption>
            );
          }
          return null;
        })}
      </div>
    </figure>
  );
}
