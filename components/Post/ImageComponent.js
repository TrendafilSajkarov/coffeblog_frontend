import { urlFor } from "../../lib/sanity";
import Image from "next/image";

export default function ImageComponent(props) {
  return (
    <figure className="flex flex-col items-center justify-center">
      <Image
        src={urlFor(props.node.asset).width(400).auto("format").url()}
        width={500}
        height={400}
        objectFit="contain"
        layout="intrinsic"
        alt={props.node.altText}
      />
      {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
    </figure>
  );
}
