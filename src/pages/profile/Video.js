import React from 'react';

const VideoWithPosterFromVideo = ({
  videoSrc,
  isFullScreen,
  handleFullScreen,
  isSelected,
  addPoster,
}) => {
  if (!videoSrc) return null;

  return (
    <video
      crossOrigin="anonymous"
      alt="video"
      loading="lazy"
      controls={isFullScreen || isSelected}
      {...addPoster}
      style={{
        width: 'fit-content',
        height: '100%',
        objectFit: 'contain',
      }}
      src={videoSrc}
    />
  );
};

export default VideoWithPosterFromVideo;
