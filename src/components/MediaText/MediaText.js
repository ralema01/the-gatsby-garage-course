import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const MediaText = (
  verticalAlignment,
  style,
  className,
  mediaPosition,
  gatsbyImage,
  children
) => {
  const gatsbyImageData = getImage(GatsbyImage);

  if (!gatsbyImageData) {
    console.error("GatsbyImage data is missing or malformed:", GatsbyImage);
    return null; // Handle this case, maybe with a placeholder or an error message
  }

  const content = (
    <div
      className={`flex p-4 ${
        verticalAlignment === "center" ? "items-center" : ""
      } `}
    >
      <div>{children}</div>
    </div>
  );
  return (
    <div style={style} className={className}>
      {mediaPosition === "right" && content}
      <div>
        <GatsbyImage alt="" image={gatsbyImageData} />
      </div>
      {mediaPosition !== "right" && content}
    </div>
  );
};
