import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../lib/sanity";

export default function MiniProdGalleryComponent(props) {
  return (
    <div className="pb-6 sm:px-2 flex justify-center">
      {props.node?.allMiniProducts.length === 1 ? (
        <div>
          <div className="grid grid-cols-1 auto-rows-auto gap-4 sm:grid-cols-1 sm:gap-2">
            {props.node.allMiniProducts.map((product, i) => {
              return (
                <div
                  key={product._key}
                  className="flex snap-start flex-col justify-between items-center shadow-lg max-w-md bg-gradient-to-l from-amber-50 to-white sm:bg-gradient-to-l sm:from-white sm:to-white"
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-center bg-yellow-600 text-white selection:bg-white selection:text-yellow-600`}
                    >
                      {product.cardCaption}
                    </span>
                    <div className="grid grid-cols-5 grid-rows-1 ">
                      <div className="col-span-2 flex flex-col justify-around">
                        <div
                          className=""
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
                      <div className="px-1 col-span-3 flex flex-col justify-evenly align-middle items-center prose-sm prose-ul:px-1 prose-li:font-medium prose-li:marker:text-yellow-600 prose-li:marker:text-lg prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-a:no-underline prose-a:hover:underline prose-a:text-slate-800 prose-headings:text-2xl prose-headings:text-center prose-headings:text-gray-700 prose-headings:drop-shadow-md prose-headings:font-extralight">
                        <Link href={`${product.affiliateLink}`} passHref>
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
                        <p className="sm:hidden prose-sm px-3 my-3 grow justify-self-stretch font-medium">
                          {product.miniProductDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 flex grow snap-start flex-col justify-between items-center sm:bg-gradient-to-t sm:from-amber-100 sm:to-white">
                    <p className="hidden sm:block prose-sm px-3 my-3 grow justify-self-stretch font-medium">
                      {product.miniProductDescription}
                    </p>
                    <div className="pb-4">
                      <Link href={`${product.affiliateLink}`} passHref>
                        <a
                          target={product.targetBlank && "_blank"}
                          rel={`${product.nofollow && "nofollow"} ${
                            product.noopener && "noopener"
                          } ${product.noreferrer && "noreferrer"}`}
                        >
                          <button className="sm:mx-4 p-4 border whitespace-normal border-gray-900 bg-gradient-to-r from-yellow-300 to-yellow-400 uppercase hover:bg-amber-300 hover:text-black hover:underline shadow-md px-4 py-1 text-gray-900 text-sm font-medium">
                            Check Price on Amazon
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 auto-rows-auto gap-4 xs:grid-cols-2 xs:gap-2">
            {props.node.allMiniProducts.map((product, i) => {
              return (
                <div
                  key={product._key}
                  className="flex snap-start flex-col justify-between items-center shadow-lg max-w-sm bg-gradient-to-b from-white to-amber-50 sm:bg-gradient-to-l sm:from-white sm:to-white"
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-center bg-yellow-600 text-white selection:bg-white selection:text-yellow-600`}
                    >
                      {product.cardCaption}
                    </span>
                    <div className="grid grid-cols-5 grid-rows-1 row-auto">
                      <div className="col-span-5 sm:col-span-2 flex flex-col justify-around">
                        <div
                          className=""
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
                      <div className="px-1 col-span-5 sm:col-span-3 flex flex-col justify-evenly align-middle items-center prose-sm prose-ul:px-1 prose-li:font-medium prose-li:marker:text-yellow-600 prose-li:marker:text-lg prose-p:text-gray-800 prose-p:font-medium prose-p:text-sm prose-a:no-underline prose-a:hover:underline prose-a:text-slate-800 prose-headings:text-2xl prose-headings:text-center prose-headings:text-gray-700 prose-headings:drop-shadow-md prose-headings:font-extralight">
                        <Link href={`${product.affiliateLink}`} passHref>
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
                        <p className="sm:hidden prose-sm px-3 my-3 grow justify-self-stretch font-medium">
                          {product.miniProductDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 flex grow snap-start flex-col justify-end items-center sm:bg-gradient-to-t sm:from-amber-100 sm:to-white">
                    <p className="hidden sm:block prose-sm px-3 my-3 grow justify-self-stretch font-medium">
                      {product.miniProductDescription}
                    </p>
                    <div className="pb-4">
                      <Link href={`${product.affiliateLink}`} passHref>
                        <a
                          target={product.targetBlank && "_blank"}
                          rel={`${product.nofollow && "nofollow"} ${
                            product.noopener && "noopener"
                          } ${product.noreferrer && "noreferrer"}`}
                        >
                          <button className="sm:mx-4 p-4 border whitespace-normal border-gray-900 bg-gradient-to-r from-yellow-300 to-yellow-400 uppercase hover:bg-amber-300 hover:text-black hover:underline shadow-md px-4 py-1 text-gray-900 text-sm font-medium">
                            Check Price on Amazon
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
