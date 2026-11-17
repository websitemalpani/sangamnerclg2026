import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sangamner College",
    short_name: "Sangamner College",
    description: "Official website of Sangamner College, Sangamner.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#183b73",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
