"use client"
import { appBaseUrl } from '@/schema/appurl';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const StudentPage = () => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const response = await fetch(`${appBaseUrl}/api/streams`);
      const data = await response.json();
      setStreams(data);
    };

    fetchStreams();
  }, []);

  return (
    <div>
      <h1>Live Streams</h1>
      {streams.length === 0 ? (
        <p>No streams currently live.</p>
      ) : (
        streams.map((stream) => (
          <div key={stream.key}>
            <h2>{stream.teacherName}</h2>
            <ReactPlayer url={`rtmp://your-server-ip/live/${stream.key}`} playing controls width="100%" />
          </div>
        ))
      )}
    </div>
  );
};

export default StudentPage;
