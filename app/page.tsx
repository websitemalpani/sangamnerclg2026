import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, BadgeIndianRupee, ClipboardCheck, Database, FileText, GraduationCap, Library, MessageSquareQuote, Scale, ShieldCheck, Sparkles, Target, BookOpen, BriefcaseBusiness, Building2, ChartNoAxesColumnIncreasing, FileCheck2, FlaskConical, HeartHandshake, Lightbulb, Phone, Telescope, UsersRound } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgramExplorer, type Program } from "@/components/home/ProgramExplorer";
import s from "./home.module.css";

const honours = ["Autonomous", "NAAC A+", "CGPA 3.58", "DBT Star Status", "DST FIST", "Best College Award", "Est. 1961"];

const quickLinks = [
  ["Principal's Message", "/message-from-the-principal", MessageSquareQuote],
  ["Autonomy", "/autonomy", Award],
  ["AQAR Reports", "/aqar-reports", FileText],
  ["NAAC Peer Team Report", "/report-of-external-peer-team-review", ClipboardCheck],
  ["UGC Compliance", "/ugc-compliance", ShieldCheck],
  ["AISHE / MIS", "/aishe-mis", Database],
  ["AICTE (BBA/BCA)", "/aicte-bba-bca", GraduationCap],
  ["Programme Outcomes", "/programme-outcomes", Target],
  ["Library e‑Databases", "/library-e-databases", Library],
  ["RTI", "/rti-info", Scale],
] as const;

const essentials = [
  ["Scholarships", "Funding support", "/scholarships-for-students", BadgeIndianRupee],
  ["Examination", "Timetables & results", "/examination", FileCheck2],
  ["Student's Corner", "Student resources", "/students-corner", UsersRound],
  ["IQAC", "Quality assurance", "/iqac", Building2],
  ["NIRF", "Rankings & reports", "/nirf", ChartNoAxesColumnIncreasing],
  ["Academic Bank of Credits", "Manage academic credits", "/abc", BookOpen],
] as const;

const stats = [["65+", "Years of impact"], ["7,500+", "Learners"], ["40+", "Programs"], ["3.58", "NAAC CGPA"]] as const;

const values = [
  [BriefcaseBusiness, "Learn by doing", "Labs, fieldwork, projects and internships turn knowledge into confident action."],
  [Telescope, "Think beyond borders", "Research, digital learning and interdisciplinary programs expand every horizon."],
  [HeartHandshake, "Grow together", "Mentors, peers and an active campus community make progress deeply personal."],
] as const;

const programs: Program[] = [
  { title: "Arts", tag: "Humanities · Languages · Social sciences", text: "Read culture, understand society, and discover new ways to tell human stories.", href: "/arts", image: "/media/images/arts-economics-img1.jpg", position: "center top", crop: true },
  { title: "Science", tag: "Life · Physical · Computational sciences", text: "Question the known, test possibilities, and build solutions through discovery.", href: "/science", image: "/media/images/zoology-laboratory.jpg" },
  { title: "Commerce", tag: "Business · Finance · Management", text: "Understand markets, lead organizations, and create responsible enterprise.", href: "/commerce", image: "/media/images/commerce-bba1.jpg" },
  { title: "Vocational", tag: "Skills · Technology · Employability", text: "Build industry-ready expertise with focused, practical learning pathways.", href: "/vocational-degrees", image: "/media/images/bvoc-at-img1.jpg" },
];

const campus = [
  ["/media/images/gallery/gallery4.jpg", "A green campus", "Gardens, palms and open courtyards"],
  ["/media/images/gallery/gallery20.jpg", "Reading rooms", "Quiet corners to think"],
  ["/media/images/naturopathy-gal-yaga-10.jpg", "Body & mind", "Yoga and naturopathy"],
  ["/media/images/gallery/gallery1.jpg", "Built for learning", "Classrooms, labs & more"],
] as const;

const notices = ["F.Y.B.A. Admission Notice", "F.Y.B.Sc. Admission Notice", "F.Y.B.Voc. Admission Notice", "F.Y.B.Com. Admission Notice"];

export default function Home() {
  return <><Header /><main className={s.home}>

    {/* Hero — editorial type beside a photo collage */}
    <section className={s.hero}>
      <div className={`container ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.kicker}><span className={s.pulse} />Admissions 2026-27 are open</p>
          <h1>Learn <em>boldly.</em><br />Lead <em>wisely.</em></h1>
          <p className={s.lead}>A vibrant autonomous institution where curiosity becomes capability, and every learner finds the confidence to shape what comes next.</p>
          <div className={s.actions}>
            <Link className={`${s.btn} ${s.btnYellow}`} href="/application">Apply for 2026-27 <ArrowUpRight /></Link>
            <Link className={`${s.btn} ${s.btnLine}`} href="#programs">Find your program</Link>
          </div>
        </div>
        <div className={s.collage}>
          <figure className={`${s.photo} ${s.photoMain}`}><Image src="/media/images/slider/slider-img1.jpg" alt="Students walking through the Sangamner College gate" fill sizes="(max-width: 900px) 90vw, 40vw" fetchPriority="high" loading="eager" /></figure>
          <figure className={`${s.photo} ${s.photoGarden}`}><Image src="/media/images/gallery/gallery10.jpg" alt="Landscaped gardens in the college courtyard" fill sizes="(max-width: 900px) 50vw, 22vw" /></figure>
          <figure className={`${s.photo} ${s.photoBooks}`}><Image src="/media/images/library-img1.jpg" alt="Rows of bookshelves in the college library" fill sizes="(max-width: 900px) 45vw, 18vw" /></figure>
          <div className={s.seal} aria-hidden="true">
            <svg viewBox="0 0 200 200"><defs><path id="seal-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs><text><textPath href="#seal-circle">AUTONOMOUS · NAAC A+ · SINCE 1961 · </textPath></text></svg>
            <b>A+</b>
          </div>
          <div className={s.floatCard}><b>65+</b><span>years opening doors<br />across the region</span></div>
        </div>
      </div>
    </section>

    {/* Honours ribbon */}
    <div className={s.ribbon}>
      <ul aria-label="Recognition and accreditation">{honours.map(h => <li key={h}>{h}</li>)}</ul>
      <ul aria-hidden="true">{honours.map(h => <li key={h}>{h}</li>)}</ul>
    </div>

    {/* Important links strip */}
    <nav className={s.quickBar} aria-labelledby="quick-links-title">
      <div className={`container ${s.quickPanel}`}>
        <div className={s.quickHead}>
          <Sparkles />
          <p id="quick-links-title">Important links</p>
          <small>Reports, compliance &amp; more</small>
        </div>
        <ul>{quickLinks.map(([label, href, Icon]) => <li key={href}><Link href={href}>
          <span className={s.quickIcon}><Icon /></span><span className={s.quickLabel}>{label}</span><ArrowUpRight className={s.quickArrow} />
        </Link></li>)}</ul>
      </div>
    </nav>

    {/* Student essentials — bento */}
    <section className={s.section}>
      <div className="container">
        <header className={s.heading}>
          <p className={s.eyebrow}>Start here</p>
          <h2>Everything you need, <em>right here.</em></h2>
        </header>
        <div className={s.bento}>
          <Link href="/application" className={s.bentoHero}>
            <span className={s.bentoLabel}>Admission 2026-27</span>
            <strong>Your seat for the new academic year is waiting.</strong>
            <span className={s.bentoCta}>Apply online <ArrowUpRight /></span>
          </Link>
          {essentials.map(([title, text, href, Icon]) => <Link href={href} className={s.tile} key={title}>
            <Icon /><b>{title}</b><small>{text}</small><ArrowUpRight className={s.tileArrow} />
          </Link>)}
          <Link href="/innovation-incubation-startup-cell" className={s.bentoIdea}>
            <Lightbulb /><div><b>Innovation & Startup Cell</b><small>Ideas into impact</small></div><ArrowRight className={s.tileArrow} />
          </Link>
        </div>
      </div>
    </section>

    {/* Story — motto, intro and numbers */}
    <section className={`${s.section} ${s.story}`}>
      <div className={`container ${s.storyGrid}`}>
        <div className={s.year} aria-hidden="true">1961</div>
        <div>
          <p className={s.eyebrow}>More than a college</p>
          <blockquote className={s.motto}>“Spread knowledge<br /><em>unto the last.</em>”</blockquote>
          <p className={s.storyText}>Since 1961, Sangamner College has opened doors for learners across the region. Our classrooms connect academic depth with practical experience, strong values, and a community that notices every student.</p>
          <Link className={s.textLink} href="/about-college">Discover our story <ArrowRight /></Link>
        </div>
      </div>
      <div className={`container ${s.stats}`}>{stats.map(([n, label]) => <div key={label}><b>{n}</b><span>{label}</span></div>)}</div>
      <ol className={`container ${s.values}`}>{values.map(([Icon, title, text], i) => <li key={title}>
        <span className={s.valueNum}>0{i + 1}</span><Icon /><h3>{title}</h3><p>{text}</p>
      </li>)}</ol>
    </section>

    {/* Programs explorer */}
    <section id="programs" className={`${s.section} ${s.programs}`}>
      <div className="container">
        <header className={`${s.heading} ${s.headingSplit}`}>
          <div><p className={`${s.eyebrow} ${s.eyebrowLight}`}>Shape your future</p><h2>Find your <em>direction.</em></h2></div>
          <p>Choose a pathway that matches your curiosity and builds the skills the world needs.</p>
        </header>
        <ProgramExplorer programs={programs} />
        <Link className={`${s.btn} ${s.btnLine} ${s.allDepts}`} href="/departments">View all departments <ArrowRight /></Link>
      </div>
    </section>

    {/* Campus mosaic */}
    <section className={s.section}>
      <div className="container">
        <header className={`${s.heading} ${s.headingSplit}`}>
          <div><p className={s.eyebrow}>Life on campus</p><h2>A campus that <em>breathes.</em></h2></div>
          <Link className={s.textLink} href="/photo-gallery">Open the photo gallery <ArrowRight /></Link>
        </header>
        <div className={s.mosaic}>{campus.map(([src, title, text]) => <Link href="/photo-gallery" key={src} className={s.mosaicItem}>
          <Image src={src} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
          <span><b>{title}</b><small>{text}</small></span>
        </Link>)}</div>
      </div>
    </section>

    {/* Notices + research */}
    <section className={`${s.section} ${s.updates}`}>
      <div className={`container ${s.updatesGrid}`}>
        <div className={s.board}>
          <header><p className={s.eyebrow}>Stay informed</p><h2>What&apos;s happening <em>now.</em></h2></header>
          <ul>{notices.map((n, i) => <li key={n}><Link href="/application">
            <span className={s.noticeDate}>{String(i + 1).padStart(2, "0")}</span>
            <span><small>Admission</small><b>{n}</b></span><ArrowRight />
          </Link></li>)}
            <li><Link href="/news-and-events"><span className={s.noticeDate}>05</span><span><small>Archive</small><b>Academic Year 2024-2025</b></span><ArrowRight /></Link></li>
          </ul>
          <Link className={s.textLink} href="/news-and-events">View all updates <ArrowRight /></Link>
        </div>
        <Link href="/research" className={s.research}>
          <Image src="/media/images/zoology-visit-to-research-labs.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 35vw" className={s.researchPhoto} />
          <FlaskConical />
          <p className={`${s.eyebrow} ${s.eyebrowLight}`}>Research & Discovery</p>
          <strong>Explore ideas, innovation and institutional research.</strong>
          <span className={s.bentoCta}>Explore research <ArrowUpRight /></span>
        </Link>
      </div>
    </section>

    {/* Closing call to action */}
    <section className={s.cta}>
      <div className={`container ${s.ctaInner}`}>
        <h2>Your chapter<br /><em>starts here.</em></h2>
        <div>
          <p>Applications for 2026-27 are open across Arts, Science, Commerce and Vocational programs.</p>
          <div className={s.actions}>
            <Link className={`${s.btn} ${s.btnDark}`} href="/application">Apply now <ArrowUpRight /></Link>
            <a className={`${s.btn} ${s.btnInk}`} href="tel:+917620111689"><Phone /> 76201 11689</a>
          </div>
        </div>
      </div>
    </section>
  </main><Footer /></>;
}
