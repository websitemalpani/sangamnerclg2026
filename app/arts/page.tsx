import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "./arts.module.css";

export const metadata: Metadata = {
  title: "Humanities | Sangamner College",
  description: "Humanities (Arts) department at Sangamner College — Economics, English, Hindi, History, Marathi, Philosophy, Physical Education, Political Science, Sanskrit and Yoga.",
};

const departments = [
  { name: "Economics", href: "/arts-economics", icon: "/media/images/economics.png", tone: "blue" },
  { name: "English", href: "/arts-english", icon: "/media/images/english.png", tone: "yellow" },
  { name: "Hindi", href: "/arts-hindi", icon: "/media/images/hindi.png", tone: "coral" },
  { name: "History", href: "/arts-history", icon: "/media/images/history.png", tone: "cream" },
  { name: "Marathi", href: "/arts-marathi", icon: "/media/images/marathi.png", tone: "ink" },
  { name: "Philosophy", href: "/arts-philosophy", icon: "/media/images/philosophy.png", tone: "cream" },
  { name: "Physical Education", href: "/arts-physical-education", icon: "/media/images/physical-education.png", tone: "coral" },
  { name: "Political Science", href: "/arts-political-science", icon: "/media/images/political-science.png", tone: "yellow" },
  { name: "Sanskrit", href: "/arts-sanskrit", icon: "/media/images/sanskrit.png", tone: "ink" },
  { name: "Yoga", href: "/arts-yoga", icon: "/media/images/yoga.png", tone: "blue" },
] as const;

export default function ArtsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Sangamner College</p>
              <h1>Humanities <span aria-hidden="true">|</span> Sangamner College</h1>
              <p className={styles.breadcrumb}><Link href="/">Home</Link> / Humanities <span aria-hidden="true">|</span> Sangamner College</p>
            </div>
            <div className={styles.orbit} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
        </section>

        <section className={styles.directory}>
          <div className="container">
            <h2>Humanities</h2>
            <div className={styles.grid}>
              {departments.map((department) => (
                <Link
                  className={`${styles.card} ${styles[department.tone]}`}
                  href={department.href}
                  key={department.href}
                >
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
