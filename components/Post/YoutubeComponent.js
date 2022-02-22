import getVideoId from "get-video-id";

export default function YoutubeComponent(props) {
  const { id } = getVideoId(props.node.url || "");
  return (
    <iframe
      width="100%"
      height="306"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
