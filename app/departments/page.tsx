import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  BookOpenText,
  BriefcaseBusiness,
  FlaskConical,
  GraduationCap,
  Languages,
  Leaf,
  Map,
  Microscope,
  Palette,
  Pi,
  Scale,
  ScrollText,
  Sparkles,
  TerminalSquare,
  UsersRound,
  Wheat,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "./departments.module.css";

export const metadata: Metadata = {
  title: "Academic Departments | Sangamner College",
  description: "Explore the humanities, commerce, science, technology and vocational departments at Sangamner College.",
};

const schools = [
  {
    id: "humanities",
    number: "01",
    eyebrow: "Arts & Humanities",
    title: "Ideas that shape society.",
    intro: "Study language, place, culture and public life through departments grounded in research and regional relevance.",
    href: "/arts",
    accent: "blue",
    icon: BookOpenText,
    departments: [
      ["Economics", "/arts-economics", Scale],
      ["English", "/arts-english", Languages],
      ["Geography", "/arts-geography", Map],
      ["Hindi", "/arts-hindi", Languages],
      ["History", "/arts-history", ScrollText],
      ["Marathi", "/arts-marathi", Languages],
      ["Philosophy", "/arts-philosophy", Sparkles],
      ["Physical Education", "/arts-physical-education", UsersRound],
      ["Political Science", "/arts-political-science", Scale],
      ["Sanskrit", "/arts-sanskrit", Languages],
      ["Yoga", "/arts-yoga", Leaf],
    ],
  },
  {
    id: "commerce",
    number: "02",
    eyebrow: "Commerce & Management",
    title: "Enterprise with perspective.",
    intro: "Build commercial judgement, leadership and digital fluency for changing organisations and markets.",
    href: "/commerce",
    accent: "coral",
    icon: BriefcaseBusiness,
    departments: [
      ["Commerce", "/commerce-commerce", BriefcaseBusiness],
      ["Business Administration", "/commerce-bba", UsersRound],
      ["Computer Applications", "/commerce-bca", TerminalSquare],
    ],
  },
  {
    id: "science",
    number: "03",
    eyebrow: "Science & Technology",
    title: "Question. Test. Discover.",
    intro: "Learn through laboratories, fieldwork and enquiry across the natural, mathematical and computing sciences.",
    href: "/science",
    accent: "yellow",
    icon: Atom,
    departments: [
      ["Botany", "/science-botany", Leaf],
      ["Chemistry", "/science-chemistry", FlaskConical],
      ["Computer Science", "/science-computer-science", TerminalSquare],
      ["Electronic Science", "/science-electronic-science", Atom],
      ["Geography", "/science-geography", Map],
      ["Mathematics", "/science-mathematics", Pi],
      ["Microbiology", "/science-microbiology", Microscope],
      ["Physics", "/science-physics", Atom],
      ["Statistics", "/science-statistics", Pi],
      ["Zoology", "/science-zoology", Microscope],
    ],
  },
  {
    id: "vocational",
    number: "04",
    eyebrow: "Vocational Degrees",
    title: "Knowledge put to work.",
    intro: "Career-focused programmes combine disciplinary learning with practical experience and industry context.",
    href: "/vocational-degrees",
    accent: "green",
    icon: GraduationCap,
    departments: [
      ["Accounting & Taxation", "/vocational-degrees-account-and-taxation", BriefcaseBusiness],
      ["Agriculture & Soil Science", "/vocational-degrees-agriculture-and-soil-science", Wheat],
      ["Dairy Product & Processing", "/vocational-degrees-dairyproduct-and-processing", FlaskConical],
      ["Software Development", "/vocational-degrees-softwear-development", TerminalSquare],
      ["Muktangan", "/vocational-degrees-muktangan", Palette],
    ],
  },
] as const;

export default function DepartmentsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div><p className={styles.kicker}>Academic directory</p><h1>Find your <em>field.</em></h1></div>
            <p>Explore every department at Sangamner College, grouped into four academic areas.</p>
          </div>
        </section>

        <section className={styles.directory} aria-label="College departments">
          <div className="container">
            <div className={styles.schoolGrid}>{schools.map((school) => {
              const SchoolIcon = school.icon;
              return (
                <article className={`${styles.school} ${styles[school.accent]}`} id={school.id} key={school.id}>
                  <div className={styles.schoolHeader}>
                    <span><SchoolIcon /></span>
                    <div><small>{school.number} / Academic area</small><h2>{school.eyebrow}</h2></div>
                    <Link className={styles.overviewLink} href={school.href} aria-label={`${school.eyebrow} overview`}><ArrowUpRight /></Link>
                  </div>
                  <p className={styles.schoolIntro}>{school.intro}</p>
                  <div className={styles.departmentList}>
                    {school.departments.map(([name, href], index) => (
                      <Link className={styles.departmentCard} href={href} key={href}>
                        <span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong>
                        <ArrowUpRight className={styles.cardArrow} />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}</div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
