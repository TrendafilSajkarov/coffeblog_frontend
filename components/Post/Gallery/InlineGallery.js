import { urlFor } from "../../../lib/sanity";
import Image from "next/image";

export default function InlineGallery({ imgArr }) {
  return (
    <figure className="w-full flex justify-around">
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
            {img.caption && <figcaption>{img.caption}</figcaption>}
          </div>
        );
      })}
    </figure>
  );
}
