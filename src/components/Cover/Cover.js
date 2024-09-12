import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

export const Cover = ({ children, style, className, gatsbyImage }) => {
  const gatsbyImageData = getImage(GatsbyImage);

  if (!gatsbyImageData) {
    console.error("GatsbyImage data is missing or malformed:", GatsbyImage);
    return null; // Handle this case, maybe with a placeholder or an error message
  }
  return (
    <div style={style} className={` relative text-white ${className}`}>
      <div className="absolute h-full w-full">
        <GatsbyImage
          alt=""
          image={gatsbyImageData}
          className="h-full w-full"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-black/50"></div>
      <div className="z-10">{children}</div>
    </div>
  );
};
