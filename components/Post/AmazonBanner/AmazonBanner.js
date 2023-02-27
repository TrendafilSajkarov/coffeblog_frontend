export default function AmazonBannerComponent(props) {
  return (
    <div className="w-full ">
      <div
        className="max-w-full flex justify-center"
        dangerouslySetInnerHTML={{
          __html: `${props.node.amzHorizontalBannerIframeCode}`,
        }}
      />
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
