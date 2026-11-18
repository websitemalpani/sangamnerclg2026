import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, BadgeIndianRupee, ClipboardCheck, Database, FileText, GraduationCap, Library, MessageSquareQuote, Scale, ShieldCheck, Sparkles, Target, BookOpen, BriefcaseBusiness, Building2, ChartNoAxesColumnIncreasing, FileCheck2, FlaskConical, HeartHandshake, Lightbulb, Phone, Telescope, UsersRound } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CountUp } from "@/components/home/CountUp";
import { HomeAnimations } from "@/components/home/HomeAnimations";
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

const stats = [
  { end: 65, suffix: "+", decimals: 0, label: "Years of learning" },
  { end: 7500, suffix: "+", decimals: 0, label: "Students" },
  { end: 40, suffix: "+", decimals: 0, label: "Programmes" },
  { end: 3.58, suffix: "", decimals: 2, label: "NAAC CGPA" },
] as const;

const values = [
  [BriefcaseBusiness, "Learn through practice", "Labs, fieldwork, projects and internships bring study into real situations."],
  [Telescope, "Explore new ideas", "Research and digital learning give students room to question, test and discover."],
  [HeartHandshake, "Find support", "Teachers, classmates and campus life support students throughout college."],
] as const;

const programs: Program[] = [
  { title: "Arts", tag: "Humanities · Languages · Social sciences", text: "Study culture, society and the ways people make sense of the world.", href: "/arts", image: "/images/common/arts-economics-img1.jpg", position: "center top", crop: true },
  { title: "Science", tag: "Life · Physical · Computational sciences", text: "Use observation, experiments and research to understand how things work.", href: "/science", image: "/images/common/zoology-laboratory.jpg" },
  { title: "Commerce", tag: "Business · Finance · Management", text: "Learn how markets, organisations and financial decisions work.", href: "/commerce", image: "/images/common/commerce-bba1.jpg" },
  { title: "Vocational", tag: "Skills · Technology · Employability", text: "Build practical skills through focused programmes and hands-on learning.", href: "/vocational-degrees", image: "/images/common/bvoc-at-img1.jpg" },
];

const campus = [
  ["/images/gallery/gallery4.jpg", "A green campus", "Gardens, palms and open courtyards"],
  ["/images/gallery/gallery20.jpg", "Reading rooms", "Quiet corners to think"],
  ["/images/common/naturopathy-gal-yaga-10.jpg", "Body & mind", "Yoga and naturopathy"],
  ["/images/gallery/gallery1.jpg", "Built for learning", "Classrooms, labs & more"],
] as const;

const notices = ["F.Y.B.A. Admission Notice", "F.Y.B.Sc. Admission Notice", "F.Y.B.Voc. Admission Notice", "F.Y.B.Com. Admission Notice"];

export default function Home() {
  return <>
    <HomeAnimations />
    <Header /><main className={s.home} data-home-motion-root>

    {/* Hero — editorial type beside a photo collage */}
    <section className={s.hero}>
      <div className={`container ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.kicker}><span className={s.pulse} />Admissions 2026-27 are now open</p>
          <h1>A place to <em>begin well.</em></h1>
          <p className={s.lead}>Sangamner College brings good teaching, practical learning and a close campus community together for every student.</p>
          <div className={s.actions}>
            <Link className={`${s.btn} ${s.btnYellow}`} href="/application">Apply for 2026-27 <ArrowUpRight /></Link>
            <Link className={`${s.btn} ${s.btnLine}`} href="#programs">View programmes</Link>
          </div>
          <div className={s.heroRoutes} aria-label="Study areas">
            <span>Arts</span><span>Science</span><span>Commerce</span><span>Vocational</span>
          </div>
        </div>
        <div className={s.heroVisual}>
          <div className={s.heroVisualTop}><span>Est. 1961</span><span>Sangamner, Maharashtra</span></div>
          <figure className={s.heroFrame}><Image src="/images/slider/slider-img1.jpg" alt="Students walking through the Sangamner College gate" fill sizes="(max-width: 900px) 92vw, 43vw" fetchPriority="high" loading="eager" /></figure>
          <div className={s.heroFact}><b><CountUp end={65} suffix="+" /></b><span>years serving<br />the region</span></div>
          <div className={s.heroAccreditation}><b>A+</b><span>NAAC accredited<br />Autonomous college</span></div>
          <p className={s.heroCaption}>Learn locally. Think widely. Move forward with confidence.</p>
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
          <p className={s.eyebrow}>Student services</p>
          <h2>Useful information, <em>in one place.</em></h2>
        </header>
        <div className={s.bento}>
          <Link href="/application" className={s.bentoHero}>
            <span className={s.bentoLabel}>Admission 2026-27</span>
            <strong>Apply for the 2026-27 academic year.</strong>
            <span className={s.bentoCta}>Apply online <ArrowUpRight /></span>
          </Link>
          {essentials.map(([title, text, href, Icon]) => <Link href={href} className={s.tile} key={title}>
            <Icon /><b>{title}</b><small>{text}</small><ArrowUpRight className={s.tileArrow} />
          </Link>)}
          <Link href="/innovation-incubation-startup-cell" className={s.bentoIdea}>
            <Lightbulb /><div><b>Innovation & Startup Cell</b><small>Support for student ideas</small></div><ArrowRight className={s.tileArrow} />
          </Link>
        </div>
      </div>
    </section>

    {/* Story — motto, intro and numbers */}
    <section className={`${s.section} ${s.story}`}>
      <div className={`container ${s.storyGrid}`}>
        <div className={s.year} aria-hidden="true">1961</div>
        <div>
          <p className={s.eyebrow}>Since 1961</p>
          <blockquote className={s.motto}>“Spread knowledge<br /><em>unto the last.</em>”</blockquote>
          <p className={s.storyText}>Since 1961, Sangamner College has welcomed students from across the region. The college brings together classroom study, practical experience and a close campus community.</p>
          <Link className={s.textLink} href="/about-college">Discover our story <ArrowRight /></Link>
        </div>
      </div>
      <div className={`container ${s.stats}`}>{stats.map(({ end, suffix, decimals, label }) => <div key={label}><b><CountUp end={end} suffix={suffix} decimals={decimals} /></b><span>{label}</span></div>)}</div>
      <ol className={`container ${s.values}`}>{values.map(([Icon, title, text], i) => <li key={title}>
        <span className={s.valueNum}>0{i + 1}</span><Icon /><h3>{title}</h3><p>{text}</p>
      </li>)}</ol>
    </section>

    {/* Programs explorer */}
    <section id="programs" className={`${s.section} ${s.programs}`}>
      <div className="container">
        <header className={`${s.heading} ${s.headingSplit}`}>
          <div><p className={`${s.eyebrow} ${s.eyebrowLight}`}>Study options</p><h2>Choose a course that <em>fits you.</em></h2></div>
          <p>Explore subjects that interest you and courses that help you build useful skills.</p>
        </header>
        <ProgramExplorer programs={programs} />
        <Link className={`${s.btn} ${s.btnLine} ${s.allDepts}`} href="/departments">View all departments <ArrowRight /></Link>
      </div>
    </section>

    {/* Campus mosaic */}
    <section className={s.section}>
      <div className="container">
        <header className={`${s.heading} ${s.headingSplit}`}>
          <div><p className={s.eyebrow}>Life on campus</p><h2>Space to study, <em>meet and grow.</em></h2></div>
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
          <Image src="/images/common/zoology-visit-to-research-labs.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 35vw" className={s.researchPhoto} />
          <FlaskConical />
          <p className={`${s.eyebrow} ${s.eyebrowLight}`}>Research</p>
          <strong>See the research work taking place across the college.</strong>
          <span className={s.bentoCta}>Explore research <ArrowUpRight /></span>
        </Link>
      </div>
    </section>

    {/* Leadership messages */}
    <section className={`${s.section} ${s.leadership}`} aria-labelledby="leadership-title">
      <div className="container">
        <header className={`${s.heading} ${s.leadershipHead}`}>
          <div><p className={s.eyebrow}>Leadership messages</p><h2 id="leadership-title">Guidance that keeps us <em>grounded.</em></h2></div>
          <p>Two voices, one commitment: meaningful education for every learner.</p>
        </header>
        <div className={s.leadershipGrid}>
          <article className={`${s.leadershipCard} ${s.chairmanCard}`}>
            <Image className={s.leadershipPortrait} src="/images/college/chairman-photo.jpg" width={152} height={186} alt="Dr. Sanjay Malpani, Chairman" />
            <div className={s.leadershipBody}><span>Message from the Chairman</span><blockquote>“Education should reach every aspiring student.”</blockquote><p>Opportunity, integrity and care for the community guide our work.</p><footer><div><strong>Dr. Sanjay Malpani</strong><small>Chairman</small></div><Link href="/message-from-the-chairman">Read message <ArrowRight /></Link></footer></div>
          </article>
          <article className={`${s.leadershipCard} ${s.principalCard}`}>
            <Image className={s.leadershipPortrait} src="/images/common/principal-photo.jpg" width={152} height={186} alt="Prof. Dr. Arun Hari Gaikwad, Principal" />
            <div className={s.leadershipBody}><span>Message from the Principal</span><blockquote>“Knowledge, character and confidence grow together.”</blockquote><p>We help students prepare for work, life and the responsibilities ahead.</p><footer><div><strong>Prof. Dr. Arun Hari Gaikwad</strong><small>Principal</small></div><Link href="/message-from-the-principal">Read message <ArrowRight /></Link></footer></div>
          </article>
        </div>
      </div>
    </section>

    {/* Closing call to action */}
    <section className={s.cta}>
      <div className={`container ${s.ctaInner}`}>
        <h2>Begin your<br /><em>application.</em></h2>
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
