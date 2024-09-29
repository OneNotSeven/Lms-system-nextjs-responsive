"use client";
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const TeacherPage = () => {
  const videoRef = useRef(null); // Create a ref for the video element
  const streamKey = 'abcdaman'; // Use the same key as in OBS
  const streamUrl = `http://localhost:8080/hls/${streamKey}.m3u8`; // Adjust for HLS

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      sources: [{
        src: streamUrl,
        type: 'application/x-mpegURL',
      }],
    });

    return () => {
      if (player) {
        player.dispose(); // Cleanup on unmount
      }
    };
  }, [streamUrl]); // Add streamUrl as a dependency

  return (
    <div>
      <h1>Teacher Live Stream: </h1>
      <video
        ref={videoRef} // Attach the ref to the video element
        className="video-js vjs-big-play-centered"
        controls
        width="640"
        height="360"
      />
    </div>
  );
};

export default TeacherPage;
