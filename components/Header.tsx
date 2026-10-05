"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ChevronDown, MapPin, Menu, Phone, Send, Sparkles, Star, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "./site-data";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return <>
    <div className="utility"><div className="container utility-inner">
      <p><strong>Admissions 2026-27</strong><span>Applications are now open</span><Link href="/application">Apply today →</Link></p>
      <div className="utility-contact"><a href="tel:+917620111689"><Phone /> 76201 11689</a><Link href="/contact"><MapPin /> Sangamner, Maharashtra</Link></div>
    </div></div>
    <header className="header">
      <div className="container brand-row">
        <Link className="brand" href="/">
          <span className="brand-logo"><Image src="/media/assets/sangamner-college-logo.png" width={112} height={80} alt="Sangamner College emblem" loading="eager" fetchPriority="high" /></span>
          <span className="brand-copy"><b>Sangamner College</b><span>Shikshan Prasarak Sanstha&apos;s Sangamner Nagarpalika Arts, D. J. Malpani Commerce & B. N. Sarda Science College</span><em>Autonomous College · Est. 1961</em></span>
        </Link>
        <div className="accreditation"><ul className="accred-group" aria-label="Accreditation"><li><Award /><span><small>NAAC</small>A+</span></li><li><Sparkles /><span><small>CGPA</small>3.58</span></li><li><Star /><span><small>DBT</small>Star</span></li></ul><Link className="button coral small" href="/application"><Send /> Apply now</Link></div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
      <nav className={`main-nav ${open ? "mobile-open" : ""}`} aria-label="Main navigation"><div className="container nav-row">
        {navigation.map(item => item.children ? <details key={item.label} className="nav-group"><summary>{item.label}<ChevronDown /></summary><div className="submenu">{item.children.map(child => <Link href={child.href} key={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div></details> : <Link key={item.label} href={item.href!} className={item.href === pathname ? "active" : ""} onClick={() => setOpen(false)}>{item.label}</Link>)}
      </div></nav>
    </header>
  </>;
}
