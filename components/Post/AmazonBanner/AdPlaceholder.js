export default function adPlaceholder(props) {
  if (
    props.node.adPlaceholder.isActive === true &&
    props.node.adPlaceholder.adBanners
  ) {
    return (
      <div className="w-full py-4 flex flex-wrap justify-evenly overflow-x-auto">
        {props.node.adPlaceholder.isActive === true &&
          props.node.adPlaceholder.adBanners &&
          props.node.adPlaceholder.adBanners.map((product) => {
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
  } else {
    return null;
  }
}

// (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
