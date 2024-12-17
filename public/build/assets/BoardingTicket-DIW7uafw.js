import{R as w,j as c}from"./app-DVvqOEAo.js";import{F as de}from"./ChevronLeftIcon-kivwvACE.js";import{f as G}from"./format-BzRktsyD.js";var ue=Object.defineProperty,T=Object.getOwnPropertySymbols,V=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable,Y=(o,a,i)=>a in o?ue(o,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[a]=i,D=(o,a)=>{for(var i in a||(a={}))V.call(a,i)&&Y(o,i,a[i]);if(T)for(var i of T(a))X.call(a,i)&&Y(o,i,a[i]);return o},B=(o,a)=>{var i={};for(var u in o)V.call(o,u)&&a.indexOf(u)<0&&(i[u]=o[u]);if(o!=null&&T)for(var u of T(o))a.indexOf(u)<0&&X.call(o,u)&&(i[u]=o[u]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var I;(o=>{const a=class E{constructor(e,s,t,r){if(this.version=e,this.errorCorrectionLevel=s,this.modules=[],this.isFunction=[],e<E.MIN_VERSION||e>E.MAX_VERSION)throw new RangeError("Version value out of range");if(r<-1||r>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let n=[];for(let l=0;l<this.size;l++)n.push(!1);for(let l=0;l<this.size;l++)this.modules.push(n.slice()),this.isFunction.push(n.slice());this.drawFunctionPatterns();const d=this.addEccAndInterleave(t);if(this.drawCodewords(d),r==-1){let l=1e9;for(let p=0;p<8;p++){this.applyMask(p),this.drawFormatBits(p);const f=this.getPenaltyScore();f<l&&(r=p,l=f),this.applyMask(p)}}g(0<=r&&r<=7),this.mask=r,this.applyMask(r),this.drawFormatBits(r),this.isFunction=[]}static encodeText(e,s){const t=o.QrSegment.makeSegments(e);return E.encodeSegments(t,s)}static encodeBinary(e,s){const t=o.QrSegment.makeBytes(e);return E.encodeSegments([t],s)}static encodeSegments(e,s,t=1,r=40,n=-1,d=!0){if(!(E.MIN_VERSION<=t&&t<=r&&r<=E.MAX_VERSION)||n<-1||n>7)throw new RangeError("Invalid value");let l,p;for(l=t;;l++){const m=E.getNumDataCodewords(l,s)*8,C=y.getTotalBits(e,l);if(C<=m){p=C;break}if(l>=r)throw new RangeError("Data too long")}for(const m of[E.Ecc.MEDIUM,E.Ecc.QUARTILE,E.Ecc.HIGH])d&&p<=E.getNumDataCodewords(l,m)*8&&(s=m);let f=[];for(const m of e){i(m.mode.modeBits,4,f),i(m.numChars,m.mode.numCharCountBits(l),f);for(const C of m.getData())f.push(C)}g(f.length==p);const M=E.getNumDataCodewords(l,s)*8;g(f.length<=M),i(0,Math.min(4,M-f.length),f),i(0,(8-f.length%8)%8,f),g(f.length%8==0);for(let m=236;f.length<M;m^=253)i(m,8,f);let x=[];for(;x.length*8<f.length;)x.push(0);return f.forEach((m,C)=>x[C>>>3]|=m<<7-(C&7)),new E(l,s,x,n)}getModule(e,s){return 0<=e&&e<this.size&&0<=s&&s<this.size&&this.modules[s][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),s=e.length;for(let t=0;t<s;t++)for(let r=0;r<s;r++)t==0&&r==0||t==0&&r==s-1||t==s-1&&r==0||this.drawAlignmentPattern(e[t],e[r]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const s=this.errorCorrectionLevel.formatBits<<3|e;let t=s;for(let n=0;n<10;n++)t=t<<1^(t>>>9)*1335;const r=(s<<10|t)^21522;g(r>>>15==0);for(let n=0;n<=5;n++)this.setFunctionModule(8,n,u(r,n));this.setFunctionModule(8,7,u(r,6)),this.setFunctionModule(8,8,u(r,7)),this.setFunctionModule(7,8,u(r,8));for(let n=9;n<15;n++)this.setFunctionModule(14-n,8,u(r,n));for(let n=0;n<8;n++)this.setFunctionModule(this.size-1-n,8,u(r,n));for(let n=8;n<15;n++)this.setFunctionModule(8,this.size-15+n,u(r,n));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const s=this.version<<12|e;g(s>>>18==0);for(let t=0;t<18;t++){const r=u(s,t),n=this.size-11+t%3,d=Math.floor(t/3);this.setFunctionModule(n,d,r),this.setFunctionModule(d,n,r)}}drawFinderPattern(e,s){for(let t=-4;t<=4;t++)for(let r=-4;r<=4;r++){const n=Math.max(Math.abs(r),Math.abs(t)),d=e+r,l=s+t;0<=d&&d<this.size&&0<=l&&l<this.size&&this.setFunctionModule(d,l,n!=2&&n!=4)}}drawAlignmentPattern(e,s){for(let t=-2;t<=2;t++)for(let r=-2;r<=2;r++)this.setFunctionModule(e+r,s+t,Math.max(Math.abs(r),Math.abs(t))!=1)}setFunctionModule(e,s,t){this.modules[s][e]=t,this.isFunction[s][e]=!0}addEccAndInterleave(e){const s=this.version,t=this.errorCorrectionLevel;if(e.length!=E.getNumDataCodewords(s,t))throw new RangeError("Invalid argument");const r=E.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][s],n=E.ECC_CODEWORDS_PER_BLOCK[t.ordinal][s],d=Math.floor(E.getNumRawDataModules(s)/8),l=r-d%r,p=Math.floor(d/r);let f=[];const M=E.reedSolomonComputeDivisor(n);for(let m=0,C=0;m<r;m++){let R=e.slice(C,C+p-n+(m<l?0:1));C+=R.length;const O=E.reedSolomonComputeRemainder(R,M);m<l&&R.push(0),f.push(R.concat(O))}let x=[];for(let m=0;m<f[0].length;m++)f.forEach((C,R)=>{(m!=p-n||R>=l)&&x.push(C[m])});return g(x.length==d),x}drawCodewords(e){if(e.length!=Math.floor(E.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let s=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let r=0;r<this.size;r++)for(let n=0;n<2;n++){const d=t-n,p=(t+1&2)==0?this.size-1-r:r;!this.isFunction[p][d]&&s<e.length*8&&(this.modules[p][d]=u(e[s>>>3],7-(s&7)),s++)}}g(s==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let s=0;s<this.size;s++)for(let t=0;t<this.size;t++){let r;switch(e){case 0:r=(t+s)%2==0;break;case 1:r=s%2==0;break;case 2:r=t%3==0;break;case 3:r=(t+s)%3==0;break;case 4:r=(Math.floor(t/3)+Math.floor(s/2))%2==0;break;case 5:r=t*s%2+t*s%3==0;break;case 6:r=(t*s%2+t*s%3)%2==0;break;case 7:r=((t+s)%2+t*s%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[s][t]&&r&&(this.modules[s][t]=!this.modules[s][t])}}getPenaltyScore(){let e=0;for(let n=0;n<this.size;n++){let d=!1,l=0,p=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[n][f]==d?(l++,l==5?e+=E.PENALTY_N1:l>5&&e++):(this.finderPenaltyAddHistory(l,p),d||(e+=this.finderPenaltyCountPatterns(p)*E.PENALTY_N3),d=this.modules[n][f],l=1);e+=this.finderPenaltyTerminateAndCount(d,l,p)*E.PENALTY_N3}for(let n=0;n<this.size;n++){let d=!1,l=0,p=[0,0,0,0,0,0,0];for(let f=0;f<this.size;f++)this.modules[f][n]==d?(l++,l==5?e+=E.PENALTY_N1:l>5&&e++):(this.finderPenaltyAddHistory(l,p),d||(e+=this.finderPenaltyCountPatterns(p)*E.PENALTY_N3),d=this.modules[f][n],l=1);e+=this.finderPenaltyTerminateAndCount(d,l,p)*E.PENALTY_N3}for(let n=0;n<this.size-1;n++)for(let d=0;d<this.size-1;d++){const l=this.modules[n][d];l==this.modules[n][d+1]&&l==this.modules[n+1][d]&&l==this.modules[n+1][d+1]&&(e+=E.PENALTY_N2)}let s=0;for(const n of this.modules)s=n.reduce((d,l)=>d+(l?1:0),s);const t=this.size*this.size,r=Math.ceil(Math.abs(s*20-t*10)/t)-1;return g(0<=r&&r<=9),e+=r*E.PENALTY_N4,g(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,s=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let r=this.size-7;t.length<e;r-=s)t.splice(1,0,r);return t}}static getNumRawDataModules(e){if(e<E.MIN_VERSION||e>E.MAX_VERSION)throw new RangeError("Version number out of range");let s=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;s-=(25*t-10)*t-55,e>=7&&(s-=36)}return g(208<=s&&s<=29648),s}static getNumDataCodewords(e,s){return Math.floor(E.getNumRawDataModules(e)/8)-E.ECC_CODEWORDS_PER_BLOCK[s.ordinal][e]*E.NUM_ERROR_CORRECTION_BLOCKS[s.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let s=[];for(let r=0;r<e-1;r++)s.push(0);s.push(1);let t=1;for(let r=0;r<e;r++){for(let n=0;n<s.length;n++)s[n]=E.reedSolomonMultiply(s[n],t),n+1<s.length&&(s[n]^=s[n+1]);t=E.reedSolomonMultiply(t,2)}return s}static reedSolomonComputeRemainder(e,s){let t=s.map(r=>0);for(const r of e){const n=r^t.shift();t.push(0),s.forEach((d,l)=>t[l]^=E.reedSolomonMultiply(d,n))}return t}static reedSolomonMultiply(e,s){if(e>>>8||s>>>8)throw new RangeError("Byte out of range");let t=0;for(let r=7;r>=0;r--)t=t<<1^(t>>>7)*285,t^=(s>>>r&1)*e;return g(t>>>8==0),t}finderPenaltyCountPatterns(e){const s=e[1];g(s<=this.size*3);const t=s>0&&e[2]==s&&e[3]==s*3&&e[4]==s&&e[5]==s;return(t&&e[0]>=s*4&&e[6]>=s?1:0)+(t&&e[6]>=s*4&&e[0]>=s?1:0)}finderPenaltyTerminateAndCount(e,s,t){return e&&(this.finderPenaltyAddHistory(s,t),s=0),s+=this.size,this.finderPenaltyAddHistory(s,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,s){s[0]==0&&(e+=this.size),s.pop(),s.unshift(e)}};a.MIN_VERSION=1,a.MAX_VERSION=40,a.PENALTY_N1=3,a.PENALTY_N2=3,a.PENALTY_N3=40,a.PENALTY_N4=10,a.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],a.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],o.QrCode=a;function i(v,e,s){if(e<0||e>31||v>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)s.push(v>>>t&1)}function u(v,e){return(v>>>e&1)!=0}function g(v){if(!v)throw new Error("Assertion error")}const h=class N{constructor(e,s,t){if(this.mode=e,this.numChars=s,this.bitData=t,s<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let s=[];for(const t of e)i(t,8,s);return new N(N.Mode.BYTE,e.length,s)}static makeNumeric(e){if(!N.isNumeric(e))throw new RangeError("String contains non-numeric characters");let s=[];for(let t=0;t<e.length;){const r=Math.min(e.length-t,3);i(parseInt(e.substring(t,t+r),10),r*3+1,s),t+=r}return new N(N.Mode.NUMERIC,e.length,s)}static makeAlphanumeric(e){if(!N.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let s=[],t;for(t=0;t+2<=e.length;t+=2){let r=N.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;r+=N.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),i(r,11,s)}return t<e.length&&i(N.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,s),new N(N.Mode.ALPHANUMERIC,e.length,s)}static makeSegments(e){return e==""?[]:N.isNumeric(e)?[N.makeNumeric(e)]:N.isAlphanumeric(e)?[N.makeAlphanumeric(e)]:[N.makeBytes(N.toUtf8ByteArray(e))]}static makeEci(e){let s=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,s);else if(e<16384)i(2,2,s),i(e,14,s);else if(e<1e6)i(6,3,s),i(e,21,s);else throw new RangeError("ECI assignment value out of range");return new N(N.Mode.ECI,0,s)}static isNumeric(e){return N.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return N.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,s){let t=0;for(const r of e){const n=r.mode.numCharCountBits(s);if(r.numChars>=1<<n)return 1/0;t+=4+n+r.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let s=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?s.push(e.charCodeAt(t)):(s.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return s}};h.NUMERIC_REGEX=/^[0-9]*$/,h.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,h.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let y=h;o.QrSegment=h})(I||(I={}));(o=>{(a=>{const i=class{constructor(g,h){this.ordinal=g,this.formatBits=h}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),a.Ecc=i})(o.QrCode||(o.QrCode={}))})(I||(I={}));(o=>{(a=>{const i=class{constructor(g,h){this.modeBits=g,this.numBitsCharCount=h}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),a.Mode=i})(o.QrSegment||(o.QrSegment={}))})(I||(I={}));var S=I;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var he={L:S.QrCode.Ecc.LOW,M:S.QrCode.Ecc.MEDIUM,Q:S.QrCode.Ecc.QUARTILE,H:S.QrCode.Ecc.HIGH},K=128,W="L",Z="#FFFFFF",J="#000000",q=!1,ee=1,fe=4,me=0,ge=.1;function te(o,a=0){const i=[];return o.forEach(function(u,g){let h=null;u.forEach(function(y,v){if(!y&&h!==null){i.push(`M${h+a} ${g+a}h${v-h}v1H${h+a}z`),h=null;return}if(v===u.length-1){if(!y)return;h===null?i.push(`M${v+a},${g+a} h1v1H${v+a}z`):i.push(`M${h+a},${g+a} h${v+1-h}v1H${h+a}z`);return}y&&h===null&&(h=v)})}),i.join("")}function se(o,a){return o.slice().map((i,u)=>u<a.y||u>=a.y+a.h?i:i.map((g,h)=>h<a.x||h>=a.x+a.w?g:!1))}function pe(o,a,i,u){if(u==null)return null;const g=o.length+i*2,h=Math.floor(a*ge),y=g/a,v=(u.width||h)*y,e=(u.height||h)*y,s=u.x==null?o.length/2-v/2:u.x*y,t=u.y==null?o.length/2-e/2:u.y*y,r=u.opacity==null?1:u.opacity;let n=null;if(u.excavate){let l=Math.floor(s),p=Math.floor(t),f=Math.ceil(v+s-l),M=Math.ceil(e+t-p);n={x:l,y:p,w:f,h:M}}const d=u.crossOrigin;return{x:s,y:t,h:e,w:v,excavation:n,opacity:r,crossOrigin:d}}function Ee(o,a){return a!=null?Math.max(Math.floor(a),0):o?fe:me}function re({value:o,level:a,minVersion:i,includeMargin:u,marginSize:g,imageSettings:h,size:y,boostLevel:v}){let e=w.useMemo(()=>{const l=(Array.isArray(o)?o:[o]).reduce((p,f)=>(p.push(...S.QrSegment.makeSegments(f)),p),[]);return S.QrCode.encodeSegments(l,he[a],i,void 0,void 0,v)},[o,a,i,v]);const{cells:s,margin:t,numCells:r,calculatedImageSettings:n}=w.useMemo(()=>{let d=e.getModules();const l=Ee(u,g),p=d.length+l*2,f=pe(d,y,l,h);return{cells:d,margin:l,numCells:p,calculatedImageSettings:f}},[e,y,h,u,g]);return{qrcode:e,margin:t,cells:s,numCells:r,calculatedImageSettings:n}}var ve=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Ne=w.forwardRef(function(a,i){const u=a,{value:g,size:h=K,level:y=W,bgColor:v=Z,fgColor:e=J,includeMargin:s=q,minVersion:t=ee,boostLevel:r,marginSize:n,imageSettings:d}=u,p=B(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:f}=p,M=B(p,["style"]),x=d==null?void 0:d.src,m=w.useRef(null),C=w.useRef(null),R=w.useCallback(P=>{m.current=P,typeof i=="function"?i(P):i&&(i.current=P)},[i]),[O,_]=w.useState(!1),{margin:j,cells:z,numCells:F,calculatedImageSettings:b}=re({value:g,level:y,minVersion:t,boostLevel:r,includeMargin:s,marginSize:n,imageSettings:d,size:h});w.useEffect(()=>{if(m.current!=null){const P=m.current,A=P.getContext("2d");if(!A)return;let Q=z;const L=C.current,H=b!=null&&L!==null&&L.complete&&L.naturalHeight!==0&&L.naturalWidth!==0;H&&b.excavation!=null&&(Q=se(z,b.excavation));const k=window.devicePixelRatio||1;P.height=P.width=h*k;const $=h/F*k;A.scale($,$),A.fillStyle=v,A.fillRect(0,0,F,F),A.fillStyle=e,ve?A.fill(new Path2D(te(Q,j))):z.forEach(function(le,ae){le.forEach(function(oe,ce){oe&&A.fillRect(ce+j,ae+j,1,1)})}),b&&(A.globalAlpha=b.opacity),H&&A.drawImage(L,b.x+j,b.y+j,b.w,b.h)}}),w.useEffect(()=>{_(!1)},[x]);const ne=D({height:h,width:h},f);let U=null;return x!=null&&(U=w.createElement("img",{src:x,key:x,style:{display:"none"},onLoad:()=>{_(!0)},ref:C,crossOrigin:b==null?void 0:b.crossOrigin})),w.createElement(w.Fragment,null,w.createElement("canvas",D({style:ne,height:h,width:h,ref:R,role:"img"},M)),U)});Ne.displayName="QRCodeCanvas";var ie=w.forwardRef(function(a,i){const u=a,{value:g,size:h=K,level:y=W,bgColor:v=Z,fgColor:e=J,includeMargin:s=q,minVersion:t=ee,boostLevel:r,title:n,marginSize:d,imageSettings:l}=u,p=B(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:f,cells:M,numCells:x,calculatedImageSettings:m}=re({value:g,level:y,minVersion:t,boostLevel:r,includeMargin:s,marginSize:d,imageSettings:l,size:h});let C=M,R=null;l!=null&&m!=null&&(m.excavation!=null&&(C=se(M,m.excavation)),R=w.createElement("image",{href:l.src,height:m.h,width:m.w,x:m.x+f,y:m.y+f,preserveAspectRatio:"none",opacity:m.opacity,crossOrigin:m.crossOrigin}));const O=te(C,f);return w.createElement("svg",D({height:h,width:h,viewBox:`0 0 ${x} ${x}`,ref:i,role:"img"},p),!!n&&w.createElement("title",null,n),w.createElement("path",{fill:v,d:`M0,0 h${x}v${x}H0z`,shapeRendering:"crispEdges"}),w.createElement("path",{fill:e,d:O,shapeRendering:"crispEdges"}),R)});ie.displayName="QRCodeSVG";const Re=({booking:o,user:a})=>{var g;const i={status:o.status,busName:"Shuttle Bus Tripin",plateNumber:(g=o.trips[0])==null?void 0:g.schedule.vehicle.license_plate,bookingCode:o.booking_code,departureTime:o.trips[0].schedule.departure_time,departureDate:o.trips[0].selected_day,departureCity:o.trips[0].city,departureStation:o.trips[0].origin,arrivalTime:o.trips[0].schedule.arrival_time,arrivalDate:o.trips[0].selected_day,arrivalCity:o.trips[0].schedule.location.city,arrivalStation:o.trips[0].schedule.location.name,passenger:a??"user",seatNumber:o.seat_number.join(", ")},u=h=>{switch(h.toLowerCase()){case"valid":return"bg-green-100 text-green-800";case"used":return"bg-gray-100 text-gray-800";case"expired":return"bg-red-100 text-red-800";default:return"bg-gray-100 text-gray-800"}};return c.jsx(c.Fragment,{children:c.jsx("div",{className:"lg:flex lg:justify-center",children:c.jsxs("div",{className:"min-h-screen bg-primary lg:w-[400px]",children:[c.jsxs("div",{className:"relative mb-8 flex h-16 items-center justify-center",children:[c.jsx(de,{className:"absolute left-4 top-6 size-8 cursor-pointer text-white",onClick:()=>{history.back()}}),c.jsx("h1",{className:"mt-4 text-2xl font-medium text-white",children:"Boarding Ticket"})]}),c.jsx("div",{className:"flex justify-center",children:c.jsxs("div",{className:"mx-6 mb-5 max-w-[400px] rounded-xl bg-white p-6 shadow-lg",children:[c.jsxs("div",{className:"mb-6",children:[c.jsx("img",{src:"/TripInLogo.svg",alt:"logo TripIn",className:"h-16"}),c.jsxs("div",{className:"mt-2 flex items-center",children:[c.jsxs("span",{className:"text-gray-600",children:["Status:"," "]}),c.jsx("span",{className:`${u(i.status)} ml-1 rounded px-2 py-0.5`,children:i.status})]})]}),c.jsxs("div",{className:"mb-6",children:[c.jsxs("div",{className:"text-lg font-medium",children:[i.busName," (",i.plateNumber,")"]}),c.jsxs("div",{className:"text-sm text-gray-600",children:["Booking code : ",i.bookingCode]})]}),c.jsxs("div",{className:"relative border-t border-dashed border-gray-400",children:[c.jsx("div",{className:"absolute -left-8 -top-3 size-5 rounded-full bg-primary"}),c.jsx("div",{className:"absolute -right-8 -top-3 size-5 rounded-full bg-primary"})]}),c.jsxs("div",{className:"relative grid grid-cols-2 px-4 py-2",children:[c.jsxs("div",{className:"relative flex flex-col justify-between gap-24",children:[c.jsxs("div",{className:"w-36",children:[c.jsx("div",{className:"text-lg font-bold text-primary",children:i.departureTime.split(":").slice(0,2).join(":")}),c.jsx("div",{className:"text-sm text-gray-500",children:G(new Date(i.departureDate),"dd MMM yyyy")})]}),c.jsxs("div",{className:"w-36",children:[c.jsx("div",{className:"text-sm font-bold text-primary2",children:i.arrivalTime.split(":").slice(0,2).join(":")}),c.jsx("div",{className:"text-sm text-gray-500",children:G(new Date(i.arrivalDate),"dd MMM yyyy")})]})]}),c.jsxs("div",{className:"relative flex flex-col items-start gap-24",children:[c.jsx("div",{className:"absolute -left-[3px] top-3 size-2 rounded-full bg-grey"}),c.jsx("div",{className:"absolute top-3 h-4/5 w-0.5 bg-grey",children:c.jsx("div",{className:"absolute -left-[3px] top-1/2 size-2 -translate-y-[45%] rounded-full bg-grey"})}),c.jsx("div",{className:"absolute -left-[3px] bottom-7 size-2 rounded-full bg-grey"}),c.jsxs("div",{className:"w-32",children:[c.jsx("div",{className:"text-end font-medium",children:i.departureCity}),c.jsx("div",{className:"text-end text-sm text-gray-500",children:i.departureStation})]}),c.jsxs("div",{className:"w-32",children:[c.jsx("div",{className:"text-end font-medium",children:i.arrivalCity}),c.jsx("div",{className:"text-end text-sm text-gray-500",children:i.arrivalStation})]})]})]}),c.jsx("div",{className:"border-t border-gray-400"}),c.jsx("div",{className:"py-6",children:c.jsxs("div",{className:"flex justify-between",children:[c.jsxs("div",{children:[c.jsx("div",{className:"text-sm text-gray-500",children:"Passenger"}),c.jsx("div",{className:"mt-1 font-medium",children:i.passenger})]}),c.jsxs("div",{children:[c.jsx("div",{className:"text-sm text-gray-500",children:"Seat Number:"}),c.jsx("div",{className:"mt-1 font-medium",children:i.seatNumber})]})]})}),c.jsxs("div",{className:"relative border-t border-dashed border-gray-400",children:[c.jsx("div",{className:"absolute -left-8 -top-3 size-5 rounded-full bg-primary"}),c.jsx("div",{className:"absolute -right-8 -top-3 size-5 rounded-full bg-primary"})]}),c.jsxs("div",{className:"pt-6 text-center",children:[c.jsx("div",{className:"mb-4 text-sm",children:"Scan this code"}),c.jsx("div",{className:"mb-6 flex justify-center",children:c.jsx(ie,{value:`TRIPIN-${i.bookingCode}-${i.seatNumber}`,size:160,level:"H"})})]})]})})]})})})};export{Re as default};
