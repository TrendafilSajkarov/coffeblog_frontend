import Link from "next/link";
import Image from "next/image";

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
<<<<<<< HEAD
        <figure>
          <img
<<<<<<< HEAD
            src={urlFor(props.node.asset).url()}
            // src={urlFor(props.node.asset).fit("max").width(560).url()}
=======
            src={urlFor(props.node.asset).width(800).url()}
>>>>>>> c1b021b2192adfcf06eb13b5cc0c04766df4acbd
            alt={props.node.altText}
          />
          {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
        </figure>
=======
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
>>>>>>> 35c79cbdd3cbbe8a3881931271ff8a6a002a3f9e
      );
    },
  },
};

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
