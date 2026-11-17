"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="container placeholder"><h1>Something went wrong</h1><p>The page could not be displayed. Please try again.</p><button className="button dark" type="button" onClick={() => reset()}>Try again</button></main></body></html>;
}
