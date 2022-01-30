import Link from "next/link";
import Image from "next/image";
import getVideoId from "get-video-id";

import { urlFor } from "./sanity";

export const serializers = {
  marks: {
    sup: (props) => <sup>{props.children}</sup>,
    sub: (props) => <sub>{props.children}</sub>,
    link: (props) => (
      <Link href={props.mark.href}>
        <a target="_blanc" rel="noopener noreferer">
          {props.children}
        </a>
      </Link>
    ),
    internalLink: (props) => (
      <Link
        href={{
          pathname: `/[category]/[post]`,
          query: {
            post: props.mark.postSlug,
            category: props.mark.categorySlug,
          },
        }}
      >
        <a>{props.children}</a>
      </Link>
    ),
  },
  types: {
    image: (props) => {
      return (
        <div>
          {props.node.metadata.metadata.dimensions.aspectRatio <= 0.9 ? (
            <figure>
              <img
                src={urlFor(props.node.asset).width(400).url()}
                alt={props.node.altText}
              />
              {props.node.caption && (
                <figcaption>{props.node.caption}</figcaption>
              )}
            </figure>
          ) : (
            <figure>
              <img
                src={urlFor(props.node.asset).width(600).url()}
                alt={props.node.altText}
              />
              {props.node.caption && (
                <figcaption>{props.node.caption}</figcaption>
              )}
            </figure>
          )}
        </div>
      );
    },
    youtube: (props) => {
      const { id } = getVideoId(props.node.url || "");
      return (
        <iframe
          width="100%"
          height="306"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    },
    gallery: (props) => {
      return (
        <figure className="w-full flex justify-around">
          {props.node.images.map((img) => {
            return (
              <div key={img._key} className="px-1">
                <img
                  className="max-w-xs"
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
    },
  },
};

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
