import { urlFor } from "../../../lib/sanity";

export default function InlineGallery({ imgArr }) {
  return (
    <figure className="w-full flex justify-around">
      {imgArr.map((img) => {
        return (
          <div key={img._key} className="px-1">
            <img
              src={urlFor(img.asset.url)
                .width(250)
                .height(250)
                .quality(100)
                .url()}
              layout="fill"
              alt={img.alt}
            />
            <figcaption>{img.caption}</figcaption>
          </div>
        );
      })}
    </figure>
  );
}
