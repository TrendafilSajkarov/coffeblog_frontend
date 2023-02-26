export default function AmazonBannerComponent(props) {
  return (
    <div>
      <div
        className="max-w-full hidden sm:block"
        dangerouslySetInnerHTML={{
          __html: `${props.node.amzHorizontalBannerScriptCode}`,
        }}
      />
      <div
        className="max-w-full sm:hidden"
        dangerouslySetInnerHTML={{
          __html: `${props.node.amzSquareBannerScriptCode}`,
        }}
      />
    </div>
  );
}

// key: (props) => (<pre>{JSON.stringify(props, null, 2)}</pre>)
