import Image from "next/image";
import { PortableText, urlFor } from "../../../lib/sanity";
import { serializers } from "../../../lib/serializers";

export default function RichParagraph(props) {
  return (
    <div className="">
      <div className="w-2/5 ml-1 float-right prose prose-figure:m-1">
        {props.node.paragraphImage && (
          <figure>
            <div className="bg-gradient-to-b from-white to-slate-50 shadow-md p-1">
              <Image
                unoptimized
                src={urlFor(props.node.paragraphImageMeta.url)
                  .width(250)
                  .height(250)
                  .quality(100)
                  .auto("format")
                  .url()}
                width={250}
                height={250}
                objectFit="cover"
                layout="intrinsic"
                alt={props.node.paragraphImage.alt}
              />
              {props.node.paragraphImage.caption && (
                <figcaption className="text-black font-medium">
                  {props.node.paragraphImage.caption}
                </figcaption>
              )}
              {props.node.paragraphImage.attribution && (
                <figcaption className="text-slate-500 overflow-x-clip text-xs">
                  {props.node.paragraphImage.attribution}
                </figcaption>
              )}
            </div>
          </figure>
        )}
      </div>
      <PortableText
        blocks={props.node.paragraphText}
        serializers={serializers}
      />
    </div>
  );
}
// (<pre>{JSON.stringify(props, null, 2)}</pre>)
