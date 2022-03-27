import {ImageList, ImageListItem} from "@mui/material";
import React, {FC} from "react";

export interface EoImage {
  img: string,
  title: string
}

interface EoImageListProps {
  itemData: {img: string, title: string}[]
  onClick: (item:{img: string, title: string}) => void
}

const EoImageList: FC<EoImageListProps> = ({itemData, onClick}) => {
  return (
    <ImageList sx={{ width: '100%' }} cols={3} rowHeight={230}>
      {itemData.map((item: EoImage, index: number) => (
        <ImageListItem key={`image_${index}`} onClick={() => onClick(item)}>
          <img
            style={{
              width: 230,
              height: 230
            }}
            src={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default EoImageList
