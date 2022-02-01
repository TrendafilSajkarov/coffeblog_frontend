import Link from "next/link";
import Image from "next/image";
import getVideoId from "get-video-id";

import YoutubeComponent from "../components/Post/YoutubeComponent";
import ImageComponent from "../components/Post/ImageComponent";
import GalleryComponent from "../components/Post/Gallery/GalleryComponent";

import { urlFor } from "./sanity";
import Table from "../components/Post/Table";

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
    image: ImageComponent,
    youtube: YoutubeComponent,
    gallery: GalleryComponent,
    table: Table,
  },
};

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
