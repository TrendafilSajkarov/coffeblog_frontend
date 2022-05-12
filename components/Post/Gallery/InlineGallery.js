import { urlFor } from "../../../lib/sanity";
import Image from "next/image";

export default function InlineGallery({ imgArr }) {
  return (
    <figure className="w-full flex flex-col">
      <div className="w-full flex justify-around">
        {imgArr.map((img) => {
          return (
            <div key={img._key} className="relative px-1">
              <Image
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
                <figcaption key={img._key} className="text-black">
                  {img.caption}
                </figcaption>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col place-items-end">
        {imgArr.map((img) => {
          if (img.attribution) {
            return (
              <figcaption key={img._id} className="text-slate-400">
                {img.attribution}
              </figcaption>
            );
          } else if (img.asset?.creditLine) {
            return (
              <figcaption key={img.asset._id} className="text-slate-400">{`${
                img.asset?.creditLine
              }${
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
