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
        <figure>
          <img src={urlFor(props.node.asset).url()} alt={props.node.altText} />
          {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
        </figure>
      );
    },
  },
};

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
