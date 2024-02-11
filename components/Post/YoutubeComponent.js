import { useEffect, useState } from "react";
import getVideoId from "get-video-id";
import Image from "next/image";

export default function YoutubeComponent(props) {
  const { id } = getVideoId(props.node.url || "");
  const [imageClicked, setImageClicked] = useState(false);
  let test = getVideoId(props.node.url || "");

  const onThumbnailClick = () => {
    setImageClicked(true);
  };

  useEffect(() => {
    const playImg = document.querySelector("#play-button");

    playImg.addEventListener("click", onThumbnailClick, { once: true });
  }, []);

  return (
    <div className="flex justify-center items-center h-96 w-full">
      <div className="relative h-80 w-600 flex justify-center items-center">
        {!imageClicked ? (
          <>
            <Image
              unoptimized
              src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
              layout="fill"
              objectFit="cover"
              alt="yt thumbnail"
              priority
            />
            <img
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onThumbnailClick();
                }
              }}
              id="play-button"
              className="h-24 w-24 z-0 hover:cursor-pointer"
              src="/PlayButton.png"
              alt="play button"
            />
          </>
        ) : (
          <iframe
            loading="lazy"
            className="w-full aspect-[16/9]"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
