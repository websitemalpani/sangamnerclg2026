import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "../arts/arts.module.css";

export const metadata: Metadata = {
  title: "Science & Technology | Sangamner College",
  description: "Science & Technology department at Sangamner College — Botany, Chemistry, Computer Science, Electronic Science, Geography, Mathematics & Statistics, Microbiology, Physics and Zoology.",
};

const departments = [
  { name: "Botany", href: "/science-botany", icon: "/media/images/botany.png", tone: "blue" },
  { name: "Chemistry", href: "/science-chemistry", icon: "/media/images/chemistry.png", tone: "yellow" },
  { name: "Computer Science", href: "/science-computer-science", icon: "/media/images/computer_science.png", tone: "coral" },
  { name: "Electronic Science", href: "/science-electronic-science", icon: "/media/images/electronic_science.png", tone: "cream" },
  { name: "Geography", href: "/science-geography", icon: "/media/images/geography.png", tone: "ink" },
  { name: "Mathematics & Statistics", href: "/science-mathematics", icon: "/media/images/mathematics_and_statistics.png", tone: "cream" },
  { name: "Microbiology", href: "/science-microbiology", icon: "/media/images/microbiology.png", tone: "coral" },
  { name: "Physics", href: "/science-physics", icon: "/media/images/physics.png", tone: "yellow" },
  { name: "Zoology", href: "/science-zoology", icon: "/media/images/zoology.png", tone: "blue" },
] as const;

export default function SciencePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Sangamner College</p>
              <h1>Science &amp; Technology <span aria-hidden="true">|</span> Sangamner College</h1>
              <p className={styles.breadcrumb}><Link href="/">Home</Link> / Science &amp; Technology <span aria-hidden="true">|</span> Sangamner College</p>
            </div>
            <div className={styles.orbit} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
        </section>

        <section className={styles.directory}>
          <div className="container">
            <h2>Science &amp; Technology</h2>
            <div className={styles.grid}>
              {departments.map((department) => (
                <Link className={`${styles.card} ${styles[department.tone]}`} href={department.href} key={department.href}>
                  <span className={styles.icon}>
                    <Image src={department.icon} alt="" width={56} height={56} />
                  </span>
                  <strong>{department.name}</strong>
                  <ArrowUpRight className={styles.arrow} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
