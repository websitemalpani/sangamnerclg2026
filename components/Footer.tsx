import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><div className="footer-brand"><Image src="/media/assets/sangamner-college-logo.png" width={96} height={64} alt=""/><span><b>Sangamner College</b><small>Autonomous</small></span></div><p>Shikshan Prasarak Sanstha&apos;s Sangamner Nagarpalika Arts, D. J. Malpani Commerce & B. N. Sarda Science College.</p><strong className="motto">Spread knowledge unto the last.</strong></div>
    <FooterLinks title="Explore" links={[["About College","/about-college"],["Campus","/campus"],["Alumni","/alumni"],["Photo gallery","/photo-gallery"],["News & Events","/news-and-events"]]} />
    <FooterLinks title="Students" links={[["Admissions","/application"],["Examination","/examination"],["Library","/library"],["Student corner","/students-corner"],["IQAC","/iqac"]]} />
    <div><h3>Get in touch</h3><p>Sangamner, Ahmednagar<br/>Maharashtra, India</p><a href="tel:+917620111689">+91 76201 11689</a><a href="mailto:info@sangamnercollege.edu.in">info@sangamnercollege.edu.in</a><div className="socials"><a href="https://www.facebook.com/sangamnercollege">Facebook</a><a href="https://www.instagram.com/sangamnercollege/">Instagram</a></div></div>
  </div><div className="container copyright"><span>© 2026 Sangamner College. All rights reserved.</span><span><Link href="/rti-info">RTI</Link><Link href="/policies-and-procedures">Policies</Link><Link href="/contact">Contact</Link></span></div></footer>;
}

function FooterLinks({ title, links }: { title: string; links: string[][] }) { return <div><h3>{title}</h3>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>; }
