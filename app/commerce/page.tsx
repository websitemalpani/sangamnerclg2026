import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "../arts/arts.module.css";

export const metadata: Metadata = {
  title: "Commerce & Management | Sangamner College",
  description: "Commerce & Management department at Sangamner College — BBA, BBA(CA)/BCA and Commerce programs.",
};

const departments = [
  { name: "BBA", href: "/commerce-bba", icon: "/media/images/bba.png", tone: "blue" },
  { name: "BBA(CA) / BCA", href: "/commerce-bca", icon: "/media/images/bca.png", tone: "yellow" },
  { name: "Commerce", href: "/commerce-commerce", icon: "/media/images/commerce.png", tone: "coral" },
] as const;

export default function CommercePage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Sangamner College</p>
              <h1>Commerce &amp; Management <span aria-hidden="true">|</span> Sangamner College</h1>
              <p className={styles.breadcrumb}><Link href="/">Home</Link> / Commerce &amp; Management <span aria-hidden="true">|</span> Sangamner College</p>
            </div>
            <div className={styles.orbit} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
        </section>

        <section className={styles.directory}>
          <div className="container">
            <h2>Commerce &amp; Management</h2>
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
