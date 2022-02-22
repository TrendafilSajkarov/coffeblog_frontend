import GridGallery from "./GridGallery";
import InlineGallery from "./InlineGallery";

export default function GalleryComponent(props) {
  return (
    <div>
      {props.node.display == "inline" && (
        <InlineGallery imgArr={props.node.images} />
      )}
      {props.node.display == undefined && (
        <InlineGallery imgArr={props.node.images} />
      )}
      {props.node.display == "grid" && (
        <GridGallery imgArr={props.node.images} />
      )}
    </div>
  );
}
