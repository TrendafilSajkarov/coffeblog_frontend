import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../../../lib/sanity";

export default function ProductWithFeaturesComponent(props) {
  return (
    <div className="py-6">
      <div className="bg-white w-full shadow-md">
        {props.node.productWithFeaturesLabel && (
          <div className="flex flex-col justify-center bg-yellow-600">
            <span className="text-center text-white drop-shadow-xl selection:bg-white selection:text-yellow-600">
              {props.node.productWithFeaturesLabel}
            </span>
          </div>
        )}
        <div className="w-full grid grid-flow-row auto-rows-max sm:grid-cols-5 sm:grid-rows-1 gap-3 py-4 px-3">
          <div className="prose-sm order-last sm:order-first sm:col-span-3 text-center prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-headings:text-gray-600 prose-headings:drop-shadow-md prose-headings:font-extralight">
            {props.node.productWithFeaturesNameImportance == "H2" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h2 className="[text-shadow:_0_1px_2px_rgb(0_0_0_/40%)]">
                    {props.node.productWithFeaturesName}
                  </h2>
                </a>
              </Link>
            ) : props.node.productWithFeaturesNameImportance == "H3" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h3 className="[text-shadow:_0_1px_2px_rgb(0_0_0_/40%)]">
                    {props.node.productWithFeaturesName}
                  </h3>
                </a>
              </Link>
            ) : props.node.productWithFeaturesNameImportance == "H4" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h4 className="[text-shadow:_0_1px_2px_rgb(0_0_0_/40%)]">
                    {props.node.productWithFeaturesName}
                  </h4>
                </a>
              </Link>
            ) : props.node.productWithFeaturesNameImportance == "H5" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h5 className="font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/40%)] text-3xl mt-4 mb-2 font-serif text-gray-700">
                    {props.node.productWithFeaturesName}
                  </h5>
                </a>
              </Link>
            ) : (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h6 className="font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/40%)] text-3xl mt-4 mb-2 font-serif text-gray-700">
                    {props.node.productWithFeaturesName}
                  </h6>
                </a>
              </Link>
            )}
            <p className="text-justify">
              {props.node.productWithFeaturesDescription}
            </p>
          </div>
          <div className="relative sm:col-span-2 flex flex-col justify-center content-center">
            {/* <div
              className=""
              dangerouslySetInnerHTML={{
                __html: `${props.node.productWithFeaturesAmazonImage}`,
              }}
            /> */}
            <Link href={props.node.affiliateLink} passHref>
              <a
                target={props.node.targetBlank && "_blank"}
                rel={`${props.node.nofollow ? "nofollow" : ""} ${
                  props.node.noopener ? "noopener" : ""
                } ${props.node.noreferrer ? "noreferrer" : ""}`}
              >
                <img
                  src={props.node.imageLink}
                  alt={props.node.productWithFeaturesName || ""}
                ></img>
              </a>
            </Link>
            {/* <Image
              src={urlFor(props.node.productImageObject.url)
                .width(350)
                .quality(100)
                .auto("format")
                .url()}
              objectFit="contain"
              layout="fill"
              alt={
                props.node.productWithFeaturesImage.productWithFeaturesImageAlt
              }
            /> */}
          </div>
        </div>

        <div className="bg-gradient-to-t from-amber-100 to-white">
          <div className="">
            <div className="">
              {props.node.productFeatures && (
                <ul className="w-full px-1 grid grid-flow-row-dense grid-cols-1 prose prose-ul:p-1 prose-li:font-semibold prose-li:text-base prose-li:marker:text-yellow-600 prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-a:no-underline prose-a:hover:underline prose-a:text-slate-800 prose-headings:text-center prose-headings:text-gray-600 gap-2 text-gray-900">
                  {props.node.productFeatures.map((feature, i) => {
                    return (
                      <li
                        className="list-inside m-0 marker:bg-yellow-600"
                        key={i}
                      >
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="py-3 flex justify-center">
            <Link href={props.node.affiliateLink} passHref>
              <a
                target={props.node.targetBlank && "_blank"}
                rel={`${props.node.nofollow && "nofollow"} ${
                  props.node.noopener && "noopener"
                } ${props.node.noreferrer && "noreferrer"}`}
              >
                <button className="border [text-shadow:_0_1px_2px_rgb(0_0_0_/40%)] border-gray-900 bg-yellow-300 uppercase hover:bg-amber-300 hover:text-black hover:underline shadow-md px-4 py-1 text-gray-900 text-sm font-medium">
                  {props.node.buttonText}
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
