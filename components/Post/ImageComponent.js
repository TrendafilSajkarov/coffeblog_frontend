import { urlFor } from "../../lib/sanity";

export default function ImageComponent(props) {
  return (
    <div>
      {props.node.metadata.metadata.dimensions.aspectRatio <= 0.9 ? (
        <figure>
          <img
            src={urlFor(props.node.asset).width(400).url()}
            alt={props.node.altText}
          />
          {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
        </figure>
      ) : (
        <figure>
          <img
            src={urlFor(props.node.asset).width(600).url()}
            alt={props.node.altText}
          />
          {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}
