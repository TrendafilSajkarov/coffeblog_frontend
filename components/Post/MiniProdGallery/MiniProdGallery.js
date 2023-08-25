import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../lib/sanity";

export default function MiniProdGalleryComponent(props) {
  return (
    <div className="pb-6">
      <div>
        <div className="grid grid-cols-2 auto-rows-auto gap-2 space-x-3">
          {props.node.allMiniProducts.map((product, i) => {
            return (
              <div
                key={product._key}
                className="flex snap-start flex-col justify-between items-center shadow-lg max-w-sm"
              >
                <div className="flex flex-col">
                  <span
                    className={`text-center bg-yellow-600 text-white selection:bg-white selection:text-yellow-600`}
                  >
                    {product.cardCaption}
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center justify-center">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${product.miniProductAmazonImage}`,
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
                    <div className="flex align-middle items-center prose-sm prose-ul:px-1 prose-li:font-medium prose-li:marker:text-yellow-600 prose-li:marker:text-lg prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-a:no-underline prose-a:hover:underline prose-a:text-slate-800 prose-headings:text-center prose-headings:text-gray-600 prose-headings:drop-shadow-md prose-headings:font-extralight">
                      <Link href={product.affiliateLink} passHref>
                        <a
                          target={product.targetBlank && "_blank"}
                          rel={`${product.nofollow && "nofollow"} ${
                            product.noopener && "noopener"
                          } ${product.noreferrer && "noreferrer"}`}
                        >
                          {product.miniProductNameImportance === "H2" ? (
                            <h2 className="text-center">
                              {product.miniProductName}
                            </h2>
                          ) : product.miniProductNameImportance === "H3" ? (
                            <h3 className="text-center">
                              {product.miniProductName}
                            </h3>
                          ) : product.miniProductNameImportance === "H4" ? (
                            <h4 className="font-medium px-1 text-center text-3xl font-serif text-gray-700">
                              {product.miniProductName}
                            </h4>
                          ) : product.miniProductNameImportance === "H5" ? (
                            <h5 className="font-medium px-1 text-center text-3xl font-serif text-gray-700">
                              {product.miniProductName}
                            </h5>
                          ) : (
                            <h6 className="font-medium px-1 text-center text-3xl font-serif text-gray-700">
                              {product.miniProductName}
                            </h6>
                          )}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="prose-sm px-3 my-3">
                  {product.miniProductDescription}
                </p>
                <div className="pb-4">
                  <Link href={product.affiliateLink} passHref>
                    <a
                      target={product.targetBlank && "_blank"}
                      rel={`${product.nofollow && "nofollow"} ${
                        product.noopener && "noopener"
                      } ${product.noreferrer && "noreferrer"}`}
                    >
                      <button className="border whitespace-normal border-gray-900 bg-gradient-to-r from-yellow-300 to-yellow-400 uppercase hover:bg-amber-300 hover:text-black hover:underline shadow-md px-4 py-1 text-gray-900 text-sm font-medium">
                        Check Features and <br /> Price on Amazon
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
