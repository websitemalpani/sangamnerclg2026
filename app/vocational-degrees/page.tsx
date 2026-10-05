import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "../arts/arts.module.css";

export const metadata: Metadata = {
  title: "Vocational Degree Programs | Sangamner College",
  description: "Vocational Degree Programs at Sangamner College — Accounting & Taxation, Agriculture & Soil Science, Dairy Products & Processing, Hospitality & Tourism, Muktangan and Software Development.",
};

const departments = [
  { name: "Accounting & Taxation", href: "/vocational-degrees-account-and-taxation", icon: "/media/images/accounting.png", tone: "blue" },
  { name: "Agriculture & Soil Science", href: "/vocational-degrees-agriculture-and-soil-science", icon: "/media/images/agriculture.png", tone: "yellow" },
  { name: "Dairy Products & Processing", href: "/vocational-degrees-dairyproduct-and-processing", icon: "/media/images/dairyproduct.png", tone: "coral" },
  { name: "Hospitality & Tourism", href: "/bvoc-ht", icon: "/media/images/hospitality-tourism.png", tone: "cream" },
  { name: "Muktangan", href: "/vocational-degrees-muktangan", icon: "/media/images/muktangan.png", tone: "ink" },
  { name: "Software Development", href: "/vocational-degrees-softwear-development", icon: "/media/images/softwear-development.png", tone: "blue" },
] as const;

export default function VocationalDegreesPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Sangamner College</p>
              <h1>Vocational Degree Programs <span aria-hidden="true">|</span> Sangamner College</h1>
              <p className={styles.breadcrumb}><Link href="/">Home</Link> / Vocational Degree Programs <span aria-hidden="true">|</span> Sangamner College</p>
            </div>
            <div className={styles.orbit} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
        </section>

        <section className={styles.directory}>
          <div className="container">
            <h2>Vocational Courses</h2>
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
