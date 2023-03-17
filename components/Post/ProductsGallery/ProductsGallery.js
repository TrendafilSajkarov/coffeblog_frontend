import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../lib/sanity";

export default function ProguctsGalleryComponent(props) {
  return (
    <div>
      <div>
        <div className="flex align-sub">
          {props.node.headingImportance == "H2" ? (
            <h2 className="text-left flex">
              <div className="relative w-10 h-10">
                <Image
                  src="/Scroll.png"
                  alt="Horizontal Scroll"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="pr-3">{props.node.productGalleryName}</div>
            </h2>
          ) : props.node.headingImportance == "H3" ? (
            <h3 className="text-left flex">
              <div className="relative w-10 h-10">
                <Image
                  src="/Scroll.png"
                  alt="Horizontal Scroll"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="pr-3">{props.node.productGalleryName}</div>
            </h3>
          ) : props.node.headingImportance == "H4" ? (
            <h4 className="text-left flex">
              <div className="relative w-10 h-10">
                <Image
                  src="/Scroll.png"
                  alt="Horizontal Scroll"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="pr-3">{props.node.productGalleryName}</div>
            </h4>
          ) : props.node.headingImportance == "H5" ? (
            <h5 className="text-left flex mt-4 mb-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/Scroll.png"
                  alt="Horizontal Scroll"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="pr-3 font-medium px-1 text-3xl font-serif text-gray-700">
                {props.node.productGalleryName}
              </div>
            </h5>
          ) : (
            <h6 className="text-left flex mt-4 mb-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/Scroll.png"
                  alt="Horizontal Scroll"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="pr-3 font-medium px-1 text-3xl font-serif text-gray-700">
                {props.node.productGalleryName}
              </div>
            </h6>
          )}
        </div>
        <div className="flex snap-x content-between overflow-x-scroll space-x-3 shadow-lg">
          {props.node.allProducts.map((product, i) => {
            return (
              <div
                key={product._key}
                className="flex snap-start flex-col justify-between items-center shadow-lg max-w-sm"
              >
                <div className="flex flex-col space-y-4">
                  <span
                    className={`text-center bg-yellow-600 text-white selection:bg-white selection:text-yellow-600`}
                  >
                    {product.cardCaption}
                  </span>
                  <div className="relative w-64 h-72">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${product.productWithFeaturesAmazonImage}`,
                      }}
                    />
                    {/* <Image
                      src={urlFor(product.asset.url)
                        .width(250)
                        .quality(100)
                        .auto("format")
                        .url()}
                      objectFit="contain"
                      layout="fill"
                      alt={product.alt}
                    /> */}
                  </div>
                  <div className="prose-sm prose-ul:px-1 prose-li:font-medium prose-li:marker:text-yellow-600 prose-li:marker:text-lg prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-a:no-underline prose-a:hover:underline prose-a:text-slate-800 prose-headings:text-center prose-headings:text-gray-600 prose-headings:drop-shadow-md prose-headings:font-extralight">
                    <Link href={product.affiliateLink} passHref>
                      <a
                        target={product.targetBlank && "_blank"}
                        rel={`${product.nofollow && "nofollow"} ${
                          product.noopener && "noopener"
                        } ${product.noreferrer && "noreferrer"}`}
                      >
                        {props.node.headingImportance == "H2" ? (
                          <h3 className="text-center">{product.productName}</h3>
                        ) : props.node.headingImportance == "H3" ? (
                          <h4 className="text-center">{product.productName}</h4>
                        ) : props.node.headingImportance == "H4" ? (
                          <h5 className="font-medium px-1 text-center text-3xl font-serif text-gray-700">
                            {product.productName}
                          </h5>
                        ) : props.node.headingImportance == "H5" ? (
                          <h6 className="font-medium px-1 text-center text-3xl font-serif text-gray-700">
                            {product.productName}
                          </h6>
                        ) : (
                          <h6 className="font-medium px-1 text-center text-3xl font-serif text-gray-700">
                            {product.productName}
                          </h6>
                        )}
                      </a>
                    </Link>
                    <p className="p-1 text-justify">
                      {product.productDescription}
                    </p>
                    {product.productFeatures && (
                      <ul>
                        {product.productFeatures.map((feature, i) => {
                          return (
                            <li className="list-inside" key={i}>
                              {feature}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="pb-4">
                  <Link href={product.affiliateLink} passHref>
                    <a
                      target={product.targetBlank && "_blank"}
                      rel={`${product.nofollow && "nofollow"} ${
                        product.noopener && "noopener"
                      } ${product.noreferrer && "noreferrer"}`}
                    >
                      <button className="border border-gray-900 bg-yellow-300 uppercase hover:bg-amber-300 hover:text-black hover:underline shadow-md px-4 py-1 text-gray-900 text-sm font-medium">
                        {product.buttonText}
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
