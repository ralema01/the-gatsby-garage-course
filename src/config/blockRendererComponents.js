import React from "react";
import {
  BlockRenderer,
  getClasses,
  getStyles,
} from "@webdeveducation/wp-block-tools";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  CallToActionButton,
  MediaText,
  Cover,
  TickItem,
  CarSearch,
  ContactForm7,
} from "../components";
import numeral from "numeral";

export const blockRendererComponents = (block) => {
  switch (block.name) {
    case "contact-form-7/contact-form-selector": {
      return (
        <ContactForm7
          key={block.id}
          formId={block.attributes.id}
          formMarkup={block.attributes.formMarkup
            .replace('novalidate="novalidate"', "")
            .split('aria-required="true"')
            .join('aria-required="true" required')}
        />
      );
    }
    case "tgg/carsearch": {
      return (
        <CarSearch
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
        />
      );
    }

    case "tgg/carprice": {
      //console.log("CAR PRICE DATA: ", block);
      return (
        <div className="flex justify-center">
          <div className="bg-black py-5 px-8 font-heading text-3xl text-white">
            ${numeral(block.attributes.price).format("0,0")}
          </div>
        </div>
      );
    }

    case "tgg/tickitem": {
      return (
        <TickItem key={block.id}>
          <BlockRenderer blocks={block.innerBlocks} />
        </TickItem>
      );
    }

    case "core/cover": {
      //console.log("COVER BLOCK: ", block);
      const gatsbyImageData = getImage(GatsbyImage);

      if (!gatsbyImageData) {
        console.error("GatsbyImage data is missing or malformed:", GatsbyImage);
        return null; // Handle this case, maybe with a placeholder or an error message
      }
      return (
        <Cover
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
          gatsbyImage={block.attributes.gatsbyImageData}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </Cover>
      );
    }
    case "core/image": {
      //console.log("IMAGE BLOCK:", block);
      return (
        <figure key={block.id} className={getClasses(block)}>
          <GatsbyImage
            style={getStyles(block)}
            image={block.attributes.gatsbyImage}
            alt={block.attributes.alt || ""}
            width={block.attributes.width}
            height={block.attributes.height}
          />
        </figure>
      );
    }
    case "tgg/ctabutton": {
      const alignMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      };
      return (
        <div key={block.id} className={alignMap[block.attributes.data.align]}>
          <CallToActionButton
            destination={block.attributes.data.destination}
            label={block.attributes.data.label}
          />
        </div>
      );
    }
    case "core/media-text":
      const gatsbyImageData = getImage(GatsbyImage);

      if (!gatsbyImageData) {
        console.error("GatsbyImage data is missing or malformed:", GatsbyImage);
        return null; // Handle this case, maybe with a placeholder or an error message
      }
      //console.log("RENDER COMPONENT: ", block);
      return (
        <MediaText
          key={block.id}
          className={getClasses(block)}
          style={getStyles(block)}
          verticalAlignment={block.attributes.verticalAlignment}
          gatsbyImage={block.attributes.gatsbyImageData}
          mediaPosition={block.attributes.mediaPosition}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </MediaText>
      );
    default:
      return null;
  }
};
