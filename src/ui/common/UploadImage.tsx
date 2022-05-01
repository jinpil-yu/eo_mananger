import React from "react";

const UploadedImage = ({image, index}: {image: any, index: number}) => {
  return (
    <img
      style={{
        width: 'auto',
        maxWidth: 230,
        height: '100%',
      }}
      src={`${image.dataURL}`}
      alt={`${index}`}
      loading="lazy"
    />
  )
}

export default UploadedImage
