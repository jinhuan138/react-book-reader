"use strict";(self.webpackChunkreact_book_reader_docs=self.webpackChunkreact_book_reader_docs||[]).push([[645],{3645:function(H,B,M){M.d(B,{makeFB2:function(){return O}});const C=u=>u?u.replace(/[\t\n\f\r ]+/g," ").replace(/^[\t\n\f\r ]+/,"").replace(/[\t\n\f\r ]+$/,""):"",p=u=>C(u?.textContent),A={XLINK:"http://www.w3.org/1999/xlink",EPUB:"http://www.idpf.org/2007/ops"},S={XML:"application/xml",XHTML:"application/xhtml+xml"},c={strong:["strong","self"],emphasis:["em","self"],style:["span","self"],a:"anchor",strikethrough:["s","self"],sub:["sub","self"],sup:["sup","self"],code:["code","self"],image:"image"},N={tr:["tr",{th:["th",c,["colspan","rowspan","align","valign"]],td:["td",c,["colspan","rowspan","align","valign"]]},["align"]]},q={epigraph:["blockquote"],subtitle:["h2",c],"text-author":["p",c],date:["p",c],stanza:"stanza"},T={title:["header",{p:["h1",c],"empty-line":["br"]}],epigraph:["blockquote","self"],image:"image",annotation:["aside"],section:["section","self"],p:["p",c],poem:["blockquote",q],subtitle:["h2",c],cite:["blockquote","self"],"empty-line":["br"],table:["table",N],"text-author":["p",c]};q.epigraph.push(T);const $={image:"image",title:["section",{p:["h1",c],"empty-line":["br"]}],epigraph:["section",T],section:["section",T]};class z{constructor(e){this.fb2=e,this.doc=document.implementation.createDocument(A.XHTML,"html"),this.bins=new Map(Array.from(this.fb2.getElementsByTagName("binary"),n=>[n.id,n]))}getImageSrc(e){const n=e.getAttributeNS(A.XLINK,"href");if(!n)return"data:,";const[,a]=n.split("#");if(!a)return n;const s=this.bins.get(a);return s?`data:${s.getAttribute("content-type")};base64,${s.textContent}`:n}image(e){const n=this.doc.createElement("img");return n.alt=e.getAttribute("alt"),n.title=e.getAttribute("title"),n.setAttribute("src",this.getImageSrc(e)),n}anchor(e){const n=this.convert(e,{a:["a",c]});return n.setAttribute("href",e.getAttributeNS(A.XLINK,"href")),e.getAttribute("type")==="note"&&n.setAttributeNS(A.EPUB,"epub:type","noteref"),n}stanza(e){const n=this.convert(e,{stanza:["p",{title:["header",{p:["strong",c],"empty-line":["br"]}],subtitle:["p",c]}]});for(const a of e.children)a.nodeName==="v"&&(n.append(this.doc.createTextNode(a.textContent)),n.append(this.doc.createElement("br")));return n}convert(e,n){if(e.nodeType===3)return this.doc.createTextNode(e.textContent);if(e.nodeType===4)return this.doc.createCDATASection(e.textContent);if(e.nodeType===8)return this.doc.createComment(e.textContent);const a=n?.[e.nodeName];if(!a)return null;if(typeof a=="string")return this[a](e);const[s,d,m]=a,f=this.doc.createElement(s);if(e.id&&(f.id=e.id),f.classList.add(e.nodeName),Array.isArray(m))for(const g of m){const w=e.getAttribute(g);w&&f.setAttribute(g,w)}const L=d==="self"?n:d;let y=e.firstChild;for(;y;){const g=this.convert(y,L);g&&f.append(g),y=y.nextSibling}return f}}const X=async u=>{const e=await u.arrayBuffer(),n=new TextDecoder("utf-8").decode(e),a=new DOMParser,s=a.parseFromString(n,S.XML),d=s.xmlEncoding||n.match(/^<\?xml\s+version\s*=\s*["']1.\d+"\s+encoding\s*=\s*["']([A-Za-z0-9._-]*)["']/)?.[1];if(d&&d.toLowerCase()!=="utf-8"){const m=new TextDecoder(d).decode(e);return a.parseFromString(m,S.XML)}return s},D=URL.createObjectURL(new Blob([`
@namespace epub "http://www.idpf.org/2007/ops";
body > img, section > img {
    display: block;
    margin: auto;
}
.title h1 {
    text-align: center;
}
body > section > .title, body.notesBodyType > .title {
    margin: 3em 0;
}
body.notesBodyType > section .title h1 {
    text-align: start;
}
body.notesBodyType > section .title {
    margin: 1em 0;
}
p {
    text-indent: 1em;
    margin: 0;
}
:not(p) + p, p:first-child {
    text-indent: 0;
}
.poem p {
    text-indent: 0;
    margin: 1em 0;
}
.text-author, .date {
    text-align: end;
}
.text-author:before {
    content: "\u2014";
}
table {
    border-collapse: collapse;
}
td, th {
    padding: .25em;
}
a[epub|type~="noteref"] {
    font-size: .75em;
    vertical-align: super;
}
body:not(.notesBodyType) > .title, body:not(.notesBodyType) > .epigraph {
    margin: 3em 0;
}
`],{type:"text/css"})),E=u=>`<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head><link href="${D}" rel="stylesheet" type="text/css"/></head>
    <body>${u}</body>
</html>`,k="data-foliate-id",O=async u=>{const e={},n=await X(u),a=new z(n),s=t=>n.querySelector(t),d=t=>[...n.querySelectorAll(t)],m=t=>{const r=p(t.querySelector("nickname"));if(r)return r;const o=p(t.querySelector("first-name")),i=p(t.querySelector("middle-name")),l=p(t.querySelector("last-name")),b=[o,i,l].filter(h=>h).join(" "),x=l?[l,[o,i].filter(h=>h).join(" ")].join(", "):null;return{name:b,sortAs:x}},f=t=>t?.getAttribute("value")??p(t),L=s("title-info annotation");if(e.metadata={title:p(s("title-info book-title")),identifier:p(s("document-info id")),language:p(s("title-info lang")),author:d("title-info author").map(m),translator:d("title-info translator").map(m),contributor:d("document-info author").map(m).concat(d("document-info program-used").map(p)).map(t=>Object.assign(typeof t=="string"?{name:t}:t,{role:"bkp"})),publisher:p(s("publish-info publisher")),published:f(s("title-info date")),modified:f(s("document-info date")),description:L?a.convert(L,{annotation:["div",T]}).innerHTML:null,subject:d("title-info genre").map(p)},s("coverpage image")){const t=a.getImageSrc(s("coverpage image"));e.getCover=()=>fetch(t).then(r=>r.blob())}else e.getCover=()=>null;const y=Array.from(n.querySelectorAll("body"),t=>{const r=a.convert(t,{body:["body",$]});return[Array.from(r.children,o=>{const i=[o,...o.querySelectorAll("[id]")].map(l=>l.id);return{el:o,ids:i}}),r]}),g=[],w=y[0][0].map(({el:t,ids:r})=>{const o=Array.from(t.querySelectorAll(":scope > section > .title"),(i,l)=>(i.setAttribute(k,l),{title:p(i),index:l}));return{ids:r,titles:o,el:t}}).concat(y.slice(1).map(([t,r])=>{const o=t.map(i=>i.ids).flat();return r.classList.add("notesBodyType"),{ids:o,el:r,linear:"no"}})).map(({ids:t,titles:r,el:o,linear:i})=>{const l=E(o.outerHTML),b=new Blob([l],{type:S.XHTML}),x=URL.createObjectURL(b);g.push(x);const h=C(o.querySelector(".title, .subtitle, p")?.textContent??(o.classList.contains("title")?o.textContent:""));return{ids:t,title:h,titles:r,load:()=>x,createDocument:()=>new DOMParser().parseFromString(l,S.XHTML),size:b.size-Array.from(o.querySelectorAll("[src]"),v=>v.getAttribute("src")?.length??0).reduce((v,j)=>v+j,0),linear:i}}),_=new Map;return e.sections=w.map((t,r)=>{const{ids:o,load:i,createDocument:l,size:b,linear:x}=t;for(const h of o)h&&_.set(h,r);return{id:r,load:i,createDocument:l,size:b,linear:x}}),e.toc=w.map(({title:t,titles:r},o)=>{const i=o.toString();return{label:t,href:i,subitems:r?.length?r.map(({title:l,index:b})=>({label:l,href:`${i}#${b}`})):null}}).filter(t=>t),e.resolveHref=t=>{const[r,o]=t.split("#");return r?{index:Number(r),anchor:i=>i.querySelector(`[${k}="${o}"]`)}:{index:_.get(o),anchor:i=>i.getElementById(o)}},e.splitTOCHref=t=>t?.split("#")?.map(r=>Number(r))??[],e.getTOCFragment=(t,r)=>t.querySelector(`[${k}="${r}"]`),e.destroy=()=>{for(const t of g)URL.revokeObjectURL(t)},e}}}]);
