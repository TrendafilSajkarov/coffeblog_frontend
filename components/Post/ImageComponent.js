import Image from "next/image";
import { urlFor } from "../../lib/sanity";
import { useNextSanityImage } from "next-sanity-image";
import configuredSanityClient from "../../lib/configuredSanityClient";

export default function ImageComponent(props) {
  const imageProps = useNextSanityImage(
    configuredSanityClient,
    props.node.asset
  );

  return (
    // <pre>{JSON.stringify(props.node, null, 2)}</pre>
    <figure className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 shadow-md p-1 pb-2">
      <Image
        src={urlFor(props.node.asset)
          .width(
            imageProps.width <= 1500
              ? imageProps.width
              : Math.floor(imageProps.width / 3)
          )
          .height(
            imageProps.width <= 1500
              ? imageProps.height
              : Math.floor(imageProps.height / 3)
          )
          .url()}
        width={imageProps.width}
        height={imageProps.height}
        objectFit="contain"
        layout="intrinsic"
        alt={props.node.altText || ""}
      />
      {props.node.caption && (
        <figcaption className="text-black font-medium">
          {props.node.caption}
        </figcaption>
      )}
      {props.node.attribution && (
        <figcaption className="text-slate-500">
          {props.node.attribution}
        </figcaption>
      )}
      {props.node.attribution
        ? null
        : props.node.metadata?.creditLine && (
            <figcaption className="text-slate-500">
              {`${props.node.metadata?.creditLine}${
                props.node.metadata?.source?.name === "unsplash"
                  ? "  -  " + props.node.metadata?.source.url
                  : ""
              }`}
            </figcaption>
          )}
    </figure>
  );
}
