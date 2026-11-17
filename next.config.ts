import type { NextConfig } from "next";

const legacyAliases: Record<string, string> = {
  "/administration-grantable-non-teaching-staff": "/administration",
  "/administration-non-grantable-non-teaching-staff": "/administration",
  "/arts-sanskrit-publication": "/arts-sanskrit",
  "/arts-sanskrit-research-project": "/arts-sanskrit",
  "/commerce-bba-programme": "/commerce-bba",
  "/commerce-bca-programme": "/commerce-bca",
  "/mental-moral-economics": "/arts-economics",
  "/mental-moral-economics-bos": "/arts-economics-bos",
  "/mental-moral-economics-faculty-profile": "/arts-economics-faculty-profile",
  "/mental-moral-economics-photogallery": "/arts-economics-photogallery",
  "/mental-moral-economics-research-center": "/arts-economics-research-center",
  "/mental-moral-philosophy": "/arts-philosophy",
  "/mental-moral-philosophy-bos": "/arts-philosophy-bos",
  "/mental-moral-philosophy-faculty-profile": "/arts-philosophy-faculty-profile",
  "/mental-moral-philosophy-photogallery": "/arts-philosophy-photogallery",
  "/mental-moral-political-science": "/arts-political-science",
  "/mental-moral-political-science-faculty-profile": "/arts-political-science-faculty-profile",
  "/mental-moral-political-science-photogallery": "/arts-political-science-photogallery",
  "/mental-moral-political-science-research-center": "/arts-political-science-research-center",
  "/mental-moral-yoga": "/arts-yoga",
  "/mental-moral-yoga-faculty-profile": "/arts-yoga-faculty-profile",
  "/mental-moral-yoga-photogallery": "/arts-yoga-photogallery",
  "/nirf-pcs-facilties": "/nirf",
  "/nirf-facilities": "/nirf",
  "/other": "/vocational-degrees",
  "/other-bvoc-hospitality-and-tourism": "/bvoc-ht",
  "/other-bvoc-hospitality-and-tourism-faculty-profile": "/bvoc-ht-faculty-profile",
  "/other-muktangan": "/vocational-degrees-muktangan",
  "/research-admission-guidelines": "/research",
  "/research-committee": "/research",
  "/research-departmental-aip-committee": "/research",
  "/research-new": "/research",
  "/results": "/examination",
  "/science-microbiology-research-center": "/science-microbiology",
  "/students-corner-board-of-students-development": "/students-corner",
  "/students-corner-board-of-students-development-photogallery": "/students-corner",
  "/students-corner-cultural-forum": "/students-corner",
  "/students-corner-cultural-forum-photogallery": "/students-corner",
  "/students-corner-earn-and-learn": "/students-corner",
  "/students-corner-earn-and-learn-faculty": "/students-corner",
  "/students-corner-earn-and-learn-glimpses-of-work": "/students-corner",
  "/students-corner-earn-and-learn-photogallery": "/students-corner",
  "/students-corner-ncc": "/students-corner",
  "/students-corner-ncc-faculty": "/students-corner",
  "/students-corner-ncc-parades-and-activities": "/students-corner",
  "/students-corner-ncc-photogallery": "/students-corner",
  "/students-corner-ncc-training": "/students-corner",
  "/students-corner-nss": "/students-corner",
  "/students-corner-nss-glimpses-of-activities": "/students-corner",
  "/students-corner-nss-program-officers": "/students-corner",
};

const phpAliases: Record<string, string> = {
  "/FRAFeeStructure.php": "/aicte-bba-bca",
  "/nirf-downloads-excel-formats.php": "/nirf",
  "/nirf-facilities.php": "/nirf",
  "/nirf-faculty-details.php": "/nirf",
  "/nirf-faculty.php": "/nirf",
  "/nirf-ipr-research-funding.php": "/nirf",
  "/nirf-pcs-facilties.php": "/nirf",
  "/nirf-prescribed-formats.php": "/nirf",
  "/nirf-student-details.php": "/nirf",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const aliases = Object.entries({ ...legacyAliases, ...phpAliases }).flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      ...(source in legacyAliases ? [{ source: `${source}.html`, destination, permanent: true }] : []),
    ]);
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...aliases,
      { source: "/:slug.html", destination: "/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; form-action 'self' https:; frame-ancestors 'self'; frame-src https:; img-src 'self' data: https:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https:; upgrade-insecure-requests" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    }];
  },
};

export default nextConfig;
