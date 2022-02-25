import { urlFor } from "../../../lib/sanity";
import Image from "next/image";

export default function GridGallery({ imgArr }) {
  const img = imgArr.length;
  const rows = Math.ceil(img / 2);
  return (
    <figure className={`w-full grid gap-y-3 grid-cols-2 grid-rows-${rows}`}>
      {imgArr.map((img) => {
        return (
          <div
            key={img._key}
            className="px-1 flex flex-col justify-items-center"
          >
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
            {img.caption && <figcaption>{img.caption}</figcaption>}
          </div>
        );
      })}
    </figure>
  );
}
