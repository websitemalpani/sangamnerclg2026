export type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", children: [
    { label: "About S.P. Sanstha", href: "/about-sp-sanstha" },
    { label: "About College", href: "/about-college" },
    { label: "Organogram", href: "/organogram" },
  ]},
  { label: "Administration", href: "/administration" },
  { label: "Autonomy", children: [
    { label: "Governing Body", href: "/autonomous-governing-body" },
    { label: "Academic Council", href: "/autonomous-composition-academic-council" },
    { label: "Board of Studies", href: "/autonomous-bos" },
    { label: "Finance Committee", href: "/autonomous-finance-committee" },
    { label: "Meeting Minutes", href: "/meeting-minutes" },
    { label: "Other Committees", href: "/autonomous-committee-new" },
    { label: "Undertaking", href: "/ugc-compliance#undertaking" },
    { label: "UGC Compliance", href: "/ugc-compliance" },
  ]},
  { label: "Departments", children: [
    { label: "Humanities", href: "/arts" },
    { label: "Commerce & Management", href: "/commerce" },
    { label: "Science & Technology", href: "/science" },
    { label: "Vocational Courses", href: "/vocational-degrees" },
  ]},
  { label: "IQAC", href: "/iqac" },
  { label: "Library", href: "/library" },
  { label: "Examination", href: "/examination" },
  { label: "Photos", href: "/photo-gallery" },
  { label: "Contact", href: "/contact" },
];
