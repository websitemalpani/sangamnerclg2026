import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegacyEnhancements } from "@/components/LegacyEnhancements";
import { getLegacyPage, getLegacySlugs } from "@/lib/legacy-pages";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLegacySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegacyPage(slug);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLegacyPage(slug);
  if (!page) notFound();
  const sourceTitle = page.title.replace(/\s*\|\s*Sangamner College$/i, "");
  const displayTitle = slug === "bvoc-ht-faculty-profile"
    ? "Hospitality & Tourism — Faculty Profile"
    : slug === "autonomous-finance-committee"
      ? "Finance Committee"
      : sourceTitle;

  return <>
    <Header />
    <main className={`content-page content-page--${slug}`}>
      <section className="page-hero"><div className="container"><p className="eyebrow yellow">Sangamner College</p><h1>{displayTitle} <span aria-hidden="true">|</span> Sangamner College</h1><p><a href="/">Home</a> / {displayTitle} <span aria-hidden="true">|</span> Sangamner College</p></div></section>
      {page.css ? <style dangerouslySetInnerHTML={{ __html: page.css }} /> : null}
      <div className={`legacy-page legacy-page--${slug}`} dangerouslySetInnerHTML={{ __html: page.html }} />
      <LegacyEnhancements />
    </main>
    <Footer />
  </>;
}
