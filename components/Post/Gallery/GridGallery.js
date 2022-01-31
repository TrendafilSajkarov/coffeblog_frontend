import { urlFor } from "../../../lib/sanity";

export default ({ imgArr }) => {
  const img = imgArr.length;
  const rows = Math.ceil(img / 2);
  return (
    <figure className={`w-full grid grid-cols-2 grid-rows-${rows}`}>
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
};