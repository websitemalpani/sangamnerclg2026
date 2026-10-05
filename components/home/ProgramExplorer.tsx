"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import s from "@/app/home.module.css";

export type Program = { title: string; tag: string; text: string; href: string; image: string; position?: string; crop?: boolean };

export function ProgramExplorer({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0);
  const current = programs[active];

  return <div className={s.explorer}>
    <ol className={s.explorerList}>
      {programs.map((program, i) => <li key={program.title} className={i === active ? s.isActive : undefined}>
        <Link href={program.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
          <span className={s.explorerNum}>0{i + 1}</span>
          <span className={s.explorerTitle}>{program.title}</span>
          <span className={s.explorerTag}>{program.tag}</span>
          <ArrowUpRight className={s.explorerArrow} />
        </Link>
        <p className={s.explorerMobileText}>{program.text}</p>
      </li>)}
    </ol>
    <div className={s.explorerPanel} aria-live="polite">
      {programs.map((program, i) => <Image key={program.image} src={program.image} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" className={[i === active ? s.isShown : "", program.crop ? s.cropTop : ""].join(" ").trim() || undefined} style={{ objectPosition: program.position ?? "center" }} />)}
      <div className={s.explorerCaption}>
        <span>{current.tag}</span>
        <p>{current.text}</p>
        <Link href={current.href}>Explore {current.title} <ArrowUpRight /></Link>
      </div>
    </div>
  </div>;
}
