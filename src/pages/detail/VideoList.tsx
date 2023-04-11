import React, { useState, useEffect, useRef } from "react";
import { IVideo } from "models/video.model";
import { useParams } from "react-router";
import tmdbApi from "../../api/tmdbApi";

interface VideoListProps {
  id: number;
}

interface VideoProps {
  item: IVideo;
}

const VideoList = (props: VideoListProps) => {
  const { category } = useParams<{ category: "movie" | "tv" }>();

  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      setVideos((response as any).results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

const Video = (props: VideoProps) => {
  const item = props.item;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoList;
