export default function TextPlusImageGallery(props) {
  return (
    <div className="w-full py-4 flex flex-wrap justify-evenly overflow-x-auto">
      {props.node.textPlusImageProducts &&
        props.node.textPlusImageProducts.map((product, i) => {
          return (
            <div
              key={product._key}
              className="pt-2"
              dangerouslySetInnerHTML={{
                __html: `${product.amzHorizontalBannerIframeCode}`,
              }}
            />
          );
        })}
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
