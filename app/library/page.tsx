import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  Database,
  FileText,
  LibraryBig,
  Mail,
  Search,
  Users,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "./library.module.css";

export const metadata: Metadata = {
  title: "Library & Knowledge Resource Centre | Sangamner College",
  description: "Explore Sangamner College library services, catalogues, e-resources, archives, syllabi, and student facilities.",
};

const navigation = [
  ["Membership & rules", "/library-membership"],
  ["Subscribed e-resources", "/library-e-databases"],
  ["Open access resources", "/library-open-access-eresources"],
  ["Institutional repository", "/library-instituional-repository"],
  ["Previous question papers", "/library-previous-exam-question-papers"],
  ["Syllabus", "/library-syllabus"],
  ["Student corner", "/library-student-corner"],
  ["Library staff", "/library-faculty-and-staff"],
  ["Photo gallery", "/library-photo-gallery"],
  ["Library FAQ", "/library-faq"],
];

const features = [
  "Open-access stack rooms for students and faculty",
  "High-speed Wi-Fi and internet e-library section",
  "Barcoded lending through Vriddhi ERP",
  "Online book search and reservation through Web OPAC",
  "Night reading facility during examinations",
  "Inter-library loans and external memberships",
  "Accessible infrastructure for differently-abled students",
  "Reference, reprography and newspaper-clipping services",
];

const hours = [
  ["Reading hall", "7:30 AM - 6:00 PM"],
  ["Issue / return", "9:30 AM - 5:00 PM"],
  ["Night library", "6:00 PM - 11:00 PM"],
  ["Sundays & holidays", "8:00 AM - 2:00 PM"],
];

export default function LibraryPage() {
  return <>
    <Header />
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image src="/media/images/library-img1.jpg" alt="Book stacks inside Sangamner College library" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.eyebrow}><LibraryBig /> Knowledge Resource Centre · Est. 1961</span>
          <h1>Read widely. Research deeply.</h1>
          <p>A welcoming academic library connecting learners with books, journals, digital archives and trusted research databases.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="https://sangamnercollege.vriddhionline.com/DataCenter_01OnlineOPAC.aspx?UniqueID=MALPANI_SENIOR" target="_blank" rel="noreferrer"><Search /> Search Web OPAC <ArrowUpRight /></a>
            <Link className={styles.secondaryButton} href="/library-e-databases"><Database /> Browse e-resources</Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.stats}`} aria-label="Library collection statistics">
        {[["1,22,000+", "Printed books"], ["116+", "Print journals"], ["6,000+", "E-journals"], ["1,99,500+", "E-books"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>
          <div className={styles.navBlock}>
            <h2>Library links</h2>
            <nav aria-label="Library navigation">
              {navigation.map(([label, href]) => <Link href={href} key={href}><span>{label}</span><ArrowUpRight /></Link>)}
            </nav>
          </div>
          <div className={styles.hours}>
            <h2><Clock3 /> Working hours</h2>
            {hours.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
        </aside>

        <div className={styles.content}>
          <section className={styles.intro}>
            <div><span className={styles.sectionLabel}>About the centre</span><h2>A growing library for every learner</h2></div>
            <div><p>Founded with the college in 1961, the Knowledge Resource Centre supports study, teaching and research across Arts, Commerce and Science. Its founding purpose remains simple: spreading knowledge unto the last.</p><p>The fully computerized centre offers Vriddhi ERP lending, Web OPAC, N-LIST, DELNET, inter-library loans and digitized institutional publications, including the college magazine <em>Arghya</em>.</p></div>
          </section>

          <section className={styles.quickSection}>
            <span className={styles.sectionLabel}>Start here</span><h2>Popular library services</h2>
            <div className={styles.quickGrid}>
              <ResourceCard icon={<Search />} title="Find a book" text="Search by title, author or subject and check live availability." href="https://sangamnercollege.vriddhionline.com/DataCenter_01OnlineOPAC.aspx?UniqueID=MALPANI_SENIOR" external />
              <ResourceCard icon={<Database />} title="Digital research" text="Open N-LIST, DELNET and subscribed academic databases." href="/library-e-databases" />
              <ResourceCard icon={<FileText />} title="Academic archive" text="Find previous question papers and department-wise syllabi." href="/library-previous-exam-question-papers" />
            </div>
          </section>

          <section className={styles.facilities}>
            <div className={styles.facilityCopy}><span className={styles.sectionLabel}>Facilities</span><h2>Designed for focused study</h2><p>Practical services make resources easier to discover, borrow and use on campus or online.</p></div>
            <div className={styles.featureList}>{features.map(feature => <div key={feature}><span><Check /></span>{feature}</div>)}</div>
          </section>

          <section className={styles.librarian}>
            <Image src="/media/images/b-v-chavan.jpg" width={180} height={180} alt="Prof. Dr. Baban Vitthalrao Chavan" />
            <div><span className={styles.sectionLabel}>Library leadership</span><h2>Prof. Dr. Baban Vitthalrao Chavan</h2><p>Head Librarian · M.A., M.Lib. & I.Sc., SET, Ph.D.</p><a href="mailto:hodlibrarian@sangamnercollege.edu.in"><Mail /> hodlibrarian@sangamnercollege.edu.in</a></div>
          </section>

          <section className={styles.bottomLinks}>
            <div><BookOpen /><span><strong>New arrivals</strong><small>Browse the latest additions to the collection.</small></span><a href="/media/pdf/library/New Arrivals.PDF" target="_blank" rel="noreferrer" aria-label="Open new arrivals PDF"><ArrowUpRight /></a></div>
            <div><Users /><span><strong>Library feedback</strong><small>Share suggestions about resources and services.</small></span><a href="https://docs.google.com/forms/d/1rRw9FhOQtESBDl0fJdW80o5QQdUk5Vi8EdlgZnI_oyM/edit?usp=sharing" target="_blank" rel="noreferrer" aria-label="Open library feedback form"><ArrowUpRight /></a></div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>;
}

function ResourceCard({ icon, title, text, href, external = false }: { icon: React.ReactNode; title: string; text: string; href: string; external?: boolean }) {
  const contents = <>{icon}<h3>{title}</h3><p>{text}</p><span>Open resource <ArrowUpRight /></span></>;
  return external ? <a className={styles.resourceCard} href={href} target="_blank" rel="noreferrer">{contents}</a> : <Link className={styles.resourceCard} href={href}>{contents}</Link>;
}
