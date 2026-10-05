"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = ["/media/images/slider/slider-img1.jpg", "/media/images/gallery/gallery1.jpg", "/media/images/gallery/gallery4.jpg", "/media/images/gallery/gallery10.jpg"];

export function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), 6000); return () => window.clearInterval(timer); }, []);
  return <section className="hero">
    <div className="hero-images">{slides.map((src, i) => <Image key={src} src={src} fill sizes="100vw" priority={i === 0} className={i === active ? "visible" : ""} alt="Sangamner College campus" />)}</div>
    <div className="hero-shade" />
    <div className="container hero-content">
      <div className="hero-badges">{["Autonomous", "NAAC A+", "CGPA 3.58", "DBT Star Status", "DST FIST", "Best College Award"].map(x => <span key={x}>{x}</span>)}</div>
      <p className="eyebrow yellow">Knowledge with purpose</p>
      <h1>Learn boldly.<br/><span>Lead wisely.</span></h1>
      <p className="hero-lead">A vibrant autonomous institution where curiosity becomes capability, and every learner finds the confidence to shape what comes next.</p>
      <div className="hero-actions"><Link className="button yellow" href="/application">Explore admissions ↗</Link><Link className="button ghost" href="#programs">Find your program</Link></div>
    </div>
    <div className="hero-dots">{slides.map((_, i) => <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show slide ${i + 1}`} />)}</div>
    <div className="hero-stats"><div><b>65+</b><span>Years of impact</span></div><div><b>7,500+</b><span>Learners</span></div><div><b>40+</b><span>Programs</span></div></div>
  </section>;
}
