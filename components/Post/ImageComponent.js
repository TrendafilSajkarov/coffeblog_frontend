import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import configuredSanityClient from "../../lib/configuredSanityClient";

export default function ImageComponent(props) {
  const imageProps = useNextSanityImage(
    configuredSanityClient,
    props.node.asset
  );

  return (
    <figure className="flex flex-col items-center justify-center">
      <Image
        src={imageProps.src}
        width={imageProps.width}
        height={imageProps.height}
        objectFit="contain"
        layout="intrinsic"
        alt={props.node.altText}
      />
      {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
    </figure>
  );
}
