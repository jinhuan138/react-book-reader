"use strict";(self.webpackChunkreact_book_reader_docs=self.webpackChunkreact_book_reader_docs||[]).push([[392],{22392:function(R,M,$){$.d(M,{makeFB2:function(){return U}});const k=s=>s?s.replace(/[\t\n\f\r ]+/g," ").replace(/^[\t\n\f\r ]+/,"").replace(/[\t\n\f\r ]+$/,""):"",p=s=>k(s?.textContent),v={XLINK:"http://www.w3.org/1999/xlink",EPUB:"http://www.idpf.org/2007/ops"},w={XML:"application/xml",XHTML:"application/xhtml+xml"},m={strong:["strong","self"],emphasis:["em","self"],style:["span","self"],a:"anchor",strikethrough:["s","self"],sub:["sub","self"],sup:["sup","self"],code:["code","self"],image:"image"},z={tr:["tr",["align"]],th:["th",["colspan","rowspan","align","valign"]],td:["td",["colspan","rowspan","align","valign"]]},C={epigraph:["blockquote"],subtitle:["h2",m],"text-author":["p",m],date:["p",m],stanza:"stanza"},A={title:["header",{p:["h1",m],"empty-line":["br"]}],epigraph:["blockquote","self"],image:"image",annotation:["aside"],section:["section","self"],p:["p",m],poem:["blockquote",C],subtitle:["h2",m],cite:["blockquote","self"],"empty-line":["br"],table:["table",z],"text-author":["p",m]};C.epigraph.push(A);const X={image:"image",title:["section",{p:["h1",m],"empty-line":["br"]}],epigraph:["section",A],section:["section",A]},q=s=>{const e=s.getAttributeNS(v.XLINK,"href"),[,o]=e.split("#"),l=s.getRootNode().getElementById(o);return l?`data:${l.getAttribute("content-type")};base64,${l.textContent}`:e};class D{constructor(e){this.fb2=e,this.doc=document.implementation.createDocument(v.XHTML,"html")}image(e){const o=this.doc.createElement("img");return o.alt=e.getAttribute("alt"),o.title=e.getAttribute("title"),o.setAttribute("src",q(e)),o}anchor(e){const o=this.convert(e,{a:["a",m]});return o.setAttribute("href",e.getAttributeNS(v.XLINK,"href")),e.getAttribute("type")==="note"&&o.setAttributeNS(v.EPUB,"epub:type","noteref"),o}stanza(e){const o=this.convert(e,{stanza:["p",{title:["header",{p:["strong",m],"empty-line":["br"]}],subtitle:["p",m]}]});for(const l of e.children)l.nodeName==="v"&&(o.append(this.doc.createTextNode(l.textContent)),o.append(this.doc.createElement("br")));return o}convert(e,o){if(e.nodeType===3)return this.doc.createTextNode(e.textContent);if(e.nodeType===4)return this.doc.createCDATASection(e.textContent);if(e.nodeType===8)return this.doc.createComment(e.textContent);const l=o?.[e.nodeName];if(!l)return null;if(typeof l=="string")return this[l](e);const[c,d]=l,u=this.doc.createElement(c);if(e.id&&(u.id=e.id),u.classList.add(e.nodeName),Array.isArray(d))for(const h of d)u.setAttribute(h,e.getAttribute(h));const y=d==="self"?o:Array.isArray(d)?null:d;let b=e.firstChild;for(;b;){const h=this.convert(b,y);h&&u.append(h),b=b.nextSibling}return u}}const E=async s=>{var e;const o=await s.arrayBuffer(),l=new TextDecoder("utf-8").decode(o),c=new DOMParser,d=c.parseFromString(l,w.XML),u=d.xmlEncoding||((e=l.match(/^<\?xml\s+version\s*=\s*["']1.\d+"\s+encoding\s*=\s*["']([A-Za-z0-9._-]*)["']/))==null?void 0:e[1]);if(u&&u.toLowerCase()!=="utf-8"){const y=new TextDecoder(u).decode(o);return c.parseFromString(y,w.XML)}return d},H=URL.createObjectURL(new Blob([`
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
`],{type:"text/css"})),O=s=>`<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head><link href="${H}" rel="stylesheet" type="text/css"/></head>
    <body>${s}</body>
</html>`,T="data-foliate-id",U=async s=>{const e={},o=await E(s),l=new D(o),c=t=>o.querySelector(t),d=t=>[...o.querySelectorAll(t)],u=t=>{const n=p(t.querySelector("nickname"));if(n)return n;const r=p(t.querySelector("first-name")),i=p(t.querySelector("middle-name")),a=p(t.querySelector("last-name")),g=[r,i,a].filter(f=>f).join(" "),x=a?[a,[r,i].filter(f=>f).join(" ")].join(", "):null;return{name:g,sortAs:x}},y=t=>t?.getAttribute("value")??p(t),b=c("title-info annotation");if(e.metadata={title:p(c("title-info book-title")),identifier:p(c("document-info id")),language:p(c("title-info lang")),author:d("title-info author").map(u),translator:d("title-info translator").map(u),producer:d("document-info author").map(u).concat(d("document-info program-used").map(p)),publisher:p(c("publish-info publisher")),published:y(c("title-info date")),modified:y(c("document-info date")),description:b?l.convert(b,{annotation:["div",A]}).innerHTML:null,subject:d("title-info genre").map(p)},c("coverpage image")){const t=q(c("coverpage image"));e.getCover=()=>fetch(t).then(n=>n.blob())}else e.getCover=()=>null;const h=Array.from(o.querySelectorAll("body"),t=>{const n=l.convert(t,{body:["body",X]});return[Array.from(n.children,r=>{const i=[r,...r.querySelectorAll("[id]")].map(a=>a.id);return{el:r,ids:i}}),n]}),_=[],B=h[0][0].map(({el:t,ids:n})=>{const r=Array.from(t.querySelectorAll(":scope > section > .title"),(i,a)=>(i.setAttribute(T,a),{title:p(i),index:a}));return{ids:n,titles:r,el:t}}).concat(h.slice(1).map(([t,n])=>{const r=t.map(i=>i.ids).flat();return n.classList.add("notesBodyType"),{ids:r,el:n,linear:"no"}})).map(({ids:t,titles:n,el:r,linear:i})=>{var a;const g=O(r.outerHTML),x=new Blob([g],{type:w.XHTML}),f=URL.createObjectURL(x);_.push(f);const j=k(((a=r.querySelector(".title, .subtitle, p"))==null?void 0:a.textContent)??(r.classList.contains("title")?r.textContent:""));return{ids:t,title:j,titles:n,load:()=>f,createDocument:()=>new DOMParser().parseFromString(g,w.XHTML),size:x.size-Array.from(r.querySelectorAll("[src]"),L=>{var S;return((S=L.getAttribute("src"))==null?void 0:S.length)??0}).reduce((L,S)=>L+S,0),linear:i}}),N=new Map;return e.sections=B.map((t,n)=>{const{ids:r,load:i,createDocument:a,size:g,linear:x}=t;for(const f of r)f&&N.set(f,n);return{id:n,load:i,createDocument:a,size:g,linear:x}}),e.toc=B.map(({title:t,titles:n},r)=>{const i=r.toString();return{label:t,href:i,subitems:n!=null&&n.length?n.map(({title:a,index:g})=>({label:a,href:`${i}#${g}`})):null}}).filter(t=>t),e.resolveHref=t=>{const[n,r]=t.split("#");return n?{index:Number(n),anchor:i=>i.querySelector(`[${T}="${r}"]`)}:{index:N.get(r),anchor:i=>i.getElementById(r)}},e.splitTOCHref=t=>{var n;return((n=t?.split("#"))==null?void 0:n.map(r=>Number(r)))??[]},e.getTOCFragment=(t,n)=>t.querySelector(`[${T}="${n}"]`),e.destroy=()=>{for(const t of _)URL.revokeObjectURL(t)},e}}}]);
