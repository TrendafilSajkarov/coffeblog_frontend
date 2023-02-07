import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../lib/sanity";

export default function ProguctsGalleryComponent(props) {
  return (
    <div>
      <div>
        <div className="flex align-sub">
          {props.node.productGalleryName && (
            <h4 className="text-left flex">
              <div className="relative w-10 h-10">
                <Image src="/Scroll.png" layout="fill" objectFit="contain" />
              </div>
              <div className="pr-3">{props.node.productGalleryName}</div>
            </h4>
          )}
        </div>
        <div className="flex content-between overflow-x-scroll space-x-3 shadow-lg">
          {props.node.allProducts.map((product, i) => {
            return (
              <div
                key={product._key}
                className="flex flex-col justify-between items-center shadow-lg max-w-sm"
              >
                <div className="flex flex-col space-y-4">
                  <span className={`text-center bg-yellow-600 text-white`}>
                    {product.cardCaption}
                  </span>
                  <div className="relative w-64 h-72">
                    <Image
                      src={urlFor(product.asset.url)
                        .width(250)
                        .quality(100)
                        .auto("format")
                        .url()}
                      objectFit="contain"
                      layout="fill"
                      alt={product.alt}
                    />
                  </div>
                  <div className="prose-sm prose-a:no-underline prose-a:hover:underline prose-a:text-slate-800 prose-h4:text-slate-800 prose-h4:text-lg prose-h4:text-center prose-h4:font-semibold">
                    <Link href={product.affiliateLink} passHref>
                      <a
                        target={product.targetBlank && "_blank"}
                        rel={`${product.nofollow && "nofollow"} ${
                          product.noopener && "noopener"
                        } ${product.noreferrer && "noreferrer"}`}
                      >
                        <h4>{product.productName}</h4>
                      </a>
                    </Link>
                    <p className="p-1">{product.productDescription}</p>
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
                      <button className="border-4 border-yellow-600 uppercase hover:underline shadow-md px-4 py-1 text-gray-600 text-sm font-medium">
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
