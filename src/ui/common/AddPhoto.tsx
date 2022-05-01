import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import UploadedImage from "./UploadImage";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";

const selectImageType = (image: any) => {
  if (!image) {
    return "NONE"
  }

  if (image?.file) {
    return "LOCAL"
  }

  if (image?.title) {
    return "CLOUD"
  }

  return "ERROR"
}

const AddPhoto = ({image, index, onClick}:{image: any, index: number, onClick: (index: number) => void }) => {
  const imageType = selectImageType(image)

  switch (imageType) {
    case "NONE":
      return (
        <Grid
          item
          alignItems={'center'}
          justifyContent="center"
          width={230}
          height={230}
          padding={8}
          sx={{
            border: '2px solid',
            borderColor: '#999999'
          }}
          onClick={() => onClick(index)}
        >
          <AddIcon color='action' sx={{width: '100%', height: '100%'}}/>
        </Grid>
      )
    case "LOCAL":
      return (
        <Grid
          item
          alignItems={'center'}
          justifyContent="center"
          width={230}
          height={230}
          sx={{
            border: '2px solid',
            borderColor: '#999999'
          }}
          onClick={() => onClick(index)}
        >
          <UploadedImage image={image} index={index} />
        </Grid>
      )
    case "CLOUD":
      return (
        <Grid
          item
          alignItems={'center'}
          justifyContent="center"
          width={230}
          height={230}
          sx={{
            border: '2px solid',
            borderColor: '#999999'
          }}
          onClick={() => onClick(index)}
        >
          <UploadedImage image={image} index={index} />
        </Grid>
      )
    case "ERROR":
      return (
        <Grid
          item
          alignItems={'center'}
          justifyContent="center"
          width={230}
          height={230}
          padding={8}
          sx={{
            border: '2px solid',
            borderColor: '#999999'
          }}
          onClick={() => onClick(index)}
        >
          <ErrorOutlineIcon color='action' sx={{width: '100%', height: '100%'}}/>
        </Grid>
      )
  }
}

export default AddPhoto
