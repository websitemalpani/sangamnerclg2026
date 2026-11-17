import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return <><Header /><main className="content-page"><section className="page-hero"><div className="container"><p className="eyebrow yellow">404</p><h1>Page not found</h1><p>The requested page may have moved during the website upgrade.</p></div></section><section className="container placeholder"><h2>Let&apos;s get you back on track.</h2><p>Use the main navigation or return to the college homepage.</p><Link className="button dark" href="/">Return home</Link></section></main><Footer /></>;
}
