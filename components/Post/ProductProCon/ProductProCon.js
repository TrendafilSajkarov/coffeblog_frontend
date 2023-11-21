import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../../../lib/sanity";

export default function ProductProConComponent(props) {
  return (
    <div className="py-6">
      <div className="bg-white w-full border-2 border-yellow-700">
        {props.node.productProConLabel && (
          <div className="flex flex-col justify-center bg-yellow-600 border-b-2 border-yellow-700">
            <span className="text-center text-white drop-shadow-xl selection:bg-white selection:text-yellow-600">
              {props.node.productProConLabel}
            </span>
          </div>
        )}
        <div className="w-full grid grid-rows-2 sm:grid-cols-5 sm:grid-rows-1 gap-3 py-4 px-3">
          <div className="prose-sm order-last sm:order-first sm:col-span-3 text-center prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-headings:text-gray-600 prose-headings:drop-shadow-md prose-headings:font-extralight">
            {props.node.productNameImportance == "H2" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h2>{props.node.productName}</h2>
                </a>
              </Link>
            ) : props.node.productNameImportance == "H3" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h3>{props.node.productName}</h3>
                </a>
              </Link>
            ) : props.node.productNameImportance == "H4" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h4>{props.node.productName}</h4>
                </a>
              </Link>
            ) : props.node.productNameImportance == "H5" ? (
              <Link href={props.node.affiliateLink} passHref>
                <a
                  className="no-underline hover:underline-offset-2 hover:underline decoration-black"
                  target={props.node.targetBlank && "_blank"}
                  rel={`${props.node.nofollow && "nofollow"} ${
                    props.node.noopener && "noopener"
                  } ${props.node.noreferrer && "noreferrer"}`}
                >
                  <h5 className="font-medium mt-4 mb-2 text-3xl font-serif text-gray-700">
                    {props.node.productName}
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
                  <h6 className="font-medium mt-4 mb-2 text-3xl font-serif text-gray-700">
                    {props.node.productName}
                  </h6>
                </a>
              </Link>
            )}
            <p className="text-justify">{props.node.productDescription}</p>
          </div>
          <div className="relative sm:col-span-2">
            {/* <div
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
                  alt={props.node.productName || ""}
                ></img>
              </a>
            </Link>
            {/* <Image
              src={urlFor(props.node.productImageObject.url)
                .width(350)
                .quality(90)
                .auto("format")
                .url()}
              objectFit="contain"
              layout="fill"
              alt={props.node.productImage.productImageAlt}
            /> */}
          </div>
        </div>

        <div className="w-full shadow-lg border-t-2 border-yellow-700 grid grid-cols-2 prose prose-ul:p-1 text-white">
          <div className="bg-gradient-to-bl from-yellow-600 to-lime-900 border-r-2 border-yellow-700">
            <span className="text-center bg-gradient-to-br from-yellow-900 to-lime-600 font-medium text-lg drop-shadow-2xl w-full block border-b-2 border-yellow-700">
              Pros:
            </span>
            <ul>
              {props.node.productPros.map((pro, i) => {
                return (
                  <li key={i} className="list-none">
                    <div className="relative translate-y-1 w-5 h-5 inline-block px-2 drop-shadow-2xl">
                      <Image
                        src="/CheckWhite.png"
                        alt="Check Icon"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="px-2 drop-shadow-2xl">{pro}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-gradient-to-tl from-red-900 to-yellow-600">
            <span className="text-center bg-gradient-to-tl from-red-600 to-yellow-900 font-medium text-lg drop-shadow-2xl w-full block border-b-2 border-yellow-700">
              Cons:
            </span>
            <ul>
              {props.node.productCons.map((con, i) => {
                return (
                  <li key={i} className="list-none">
                    <div className="relative translate-y-1 w-5 h-5 inline-block px-2 drop-shadow-lg">
                      <Image
                        src="/CrossWhite.png"
                        alt="Cross Icon"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span className="px-2 drop-shadow-2xl">{con}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="bg-white py-2 border-t-2 border-yellow-700 flex justify-center">
          <Link href={props.node.affiliateLink} passHref>
            <a
              target={props.node.targetBlank && "_blank"}
              rel={`${props.node.nofollow && "nofollow"} ${
                props.node.noopener && "noopener"
              } ${props.node.noreferrer && "noreferrer"}`}
            >
              <button className="border border-gray-900 bg-yellow-300 uppercase hover:bg-amber-300 hover:text-black hover:underline shadow-md px-4 py-1 text-gray-900 text-sm font-medium">
                {props.node.buttonText}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
