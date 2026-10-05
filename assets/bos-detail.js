(function(){
  const file=(location.pathname.split("/").pop()||"").toLowerCase();
  if(!/-bos\.html$/.test(file)||file==="autonomous-bos.html")return;
  const main=document.querySelector(".legacy-page-content");
  if(!main)return;
  const table=main.querySelector("table");
  if(!table)return;

  const theme=file.startsWith("arts-")?"arts":file.startsWith("science-")?"science":file.startsWith("commerce-bba")?"management":file.startsWith("commerce-")?"commerce":file.startsWith("bvoc-")?"vocational":file.startsWith("experiantial")?"experiential":"arts";
  document.body.classList.add("bos-detail-page",`bos-detail--${theme}`);
  const text=table.textContent.replace(/\s+/g," ").trim();
  const match=text.match(/Board of Studies in\s+(.+?)(?=1\.|Sr\.?\s*No|$)/i);
  const fallback=file.replace(/^(arts|science|commerce)-/,"").replace(/-bos\.html$/,"").replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());
  const subject=(match?match[1]:fallback).replace(/\s+/g," ").trim();
  const yearMatch=text.match(/Academic Year\s*([0-9–\- ]+to [0-9–\- ]+)/i);
  const pdfLinks=[...main.querySelectorAll('a[href*=".pdf"]')].map(a=>({href:a.href,label:a.textContent.replace(/\s+/g," ").trim()||"Download document"}));

  const paths={
    arts:'<path d="M12 22a10 10 0 1 0 0-20 7 7 0 0 0 0 14h1.5a1.5 1.5 0 0 1 0 3H12"/><circle cx="8" cy="10" r=".5"/><circle cx="11" cy="7" r=".5"/><circle cx="15" cy="8" r=".5"/>',
    commerce:'<path d="M3 21h18M6 18V9m4 9V9m4 9V9m4 9V9M4 6l8-4 8 4v3H4z"/>',
    science:'<path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
    vocational:'<path d="M14.7 6.3a4 4 0 0 0-5-5L7.5 3.5l3 3L12.7 4.3a2 2 0 0 1 2.5 2.5L13 9l3 3M3 21l6-6"/>',
    management:'<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M8 20h8m-4-4v4"/>',
    experiential:'<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="7"/>'
  };
  const svg=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[theme]}</svg>`;
  table.className="bos-detail-table";
  [...table.rows].forEach((row,index)=>{
    const rowText=row.textContent.replace(/\s+/g," ").trim();
    if(index<2||/Composition of Board|Board of Studies in/i.test(rowText))row.classList.add("bos-table-title");
    if(/Sr\.?\s*No/i.test(rowText)&&/Name/i.test(rowText))row.classList.add("bos-table-header");
    if(row.cells.length===1&&index>1&&!row.classList.contains("bos-table-header"))row.classList.add("bos-table-section");
  });
  const wrap=document.createElement("div");
  wrap.className="bos-detail-table-wrap";
  table.parentNode.insertBefore(wrap,table);
  wrap.appendChild(table);

  main.innerHTML="";
  const hero=document.createElement("section");
  hero.className="bos-detail-hero";
  hero.innerHTML=`<div class="bos-detail-hero__main"><span class="bos-detail-hero__icon">${svg}</span><div><span class="bos-detail-label">Board of Studies</span><h2>${subject}</h2></div></div><a class="bos-detail-back" href="autonomous-bos.html">← All Boards of Studies</a>`;
  hero.querySelector(".bos-detail-back").textContent="← All Boards of Studies";
  const meta=document.createElement("div");
  meta.className="bos-detail-meta";
  meta.innerHTML=`<span>${theme.charAt(0).toUpperCase()+theme.slice(1)} faculty</span>${yearMatch?`<span>Term: ${yearMatch[1]}</span>`:""}<span>Autonomous College</span>`;
  const docs=document.createElement("div");
  docs.className="bos-documents";
  docs.innerHTML=pdfLinks.map(doc=>`<a class="bos-document" href="${doc.href}" target="_blank" rel="noopener">${doc.label}</a>`).join("");
  const panel=document.createElement("section");
  panel.className="bos-detail-panel";
  panel.innerHTML=`<div class="bos-detail-panel__head"><div><span class="bos-detail-label">Composition & members</span><h2>Board membership</h2></div><p>Official constitution and representative details</p></div>`;
  panel.append(wrap);
  panel.insertAdjacentHTML("beforeend",'<p class="bos-detail-note">On smaller screens, swipe horizontally to view every table column.</p>');
  main.append(hero,meta);
  if(pdfLinks.length)main.append(docs);
  main.append(panel);
})();
