import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PhotoGallery } from "./PhotoGallery";

export const metadata: Metadata = {
  title: "Photo Gallery | Sangamner College",
  description: "Explore photographs of the Sangamner College campus, facilities, academic spaces and student life.",
};

export default function PhotoGalleryPage() {
  return <>
    <Header />
    <PhotoGallery />
    <Footer />
  </>;
}
