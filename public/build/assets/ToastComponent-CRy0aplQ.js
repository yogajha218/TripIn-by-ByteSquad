import{r as e,j as a}from"./app-BwI4ZmoF.js";function m({title:r,titleId:t,...s},n){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},s),r?e.createElement("title",{id:t},r):null,e.createElement("path",{fillRule:"evenodd",d:"M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const u=e.forwardRef(m),x=({message:r,onClose:t,type:s})=>{const[n,c]=e.useState(!0),[l,i]=e.useState("");e.useEffect(()=>{const d=setTimeout(()=>{c(!1),t&&t()},1600);return()=>clearTimeout(d)},[t]),e.useEffect(()=>{switch(s){case"alert":i(s);break;case"warning":i(s);break;case"success":i(s);break}},[]);const o=()=>{c(!1),setTimeout(t,700)};return n?a.jsx(a.Fragment,{children:a.jsxs("div",{className:`flex -translate-x-1/2 transform items-center rounded-md border-l-4 p-5 text-center text-sm text-white shadow-lg transition-transform duration-700 md:text-base ${n?"animate-slideDown":"animate-slideUp"} ${l==="alert"&&"bg-red-500"} ${l==="warning"&&"bg-yellow-500"} ${l==="success"&&"bg-green-500"}`,children:[a.jsx("p",{className:"text-nowrap",children:r}),l==="alert"&&a.jsx("button",{onClick:o,className:"ml-4 flex items-center justify-center text-white",children:a.jsx(u,{className:"size-4 text-white md:size-6"})})]})}):null};export{x as T};
