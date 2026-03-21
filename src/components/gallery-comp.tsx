"use client";

import dynamic from "next/dynamic";
const ImageGallery = dynamic(() => import("react-image-gallery"), {
  ssr: false,
});
import "react-image-gallery/styles/image-gallery.css";
import type { GalleryItem } from "react-image-gallery";

// const images = [
//   {
//     original: "/assets/img/13.jpeg",
//     thumbnail: "/assets/img/13.jpeg",
//     description: "Happy Father And Child",
//   },
//   {
//     original: "/assets/img/14.jpeg",
//     thumbnail: "/assets/img/14.jpeg",
//   },

// ];

const GalleryComp = ({ items }: { items: GalleryItem[] }) => {
  return <ImageGallery items={items} showFullscreenButton />;
};

export default GalleryComp;
