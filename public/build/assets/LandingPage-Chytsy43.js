import{r as i,j as e,q as n,a as l}from"./app-D9cWeyPu.js";const u=({message:r,type:a="success",duration:t=3e3})=>{const[o,c]=i.useState(!0);return i.useEffect(()=>{const s=setTimeout(()=>{c(!1)},t);return()=>clearTimeout(s)},[t]),!o||!r?null:e.jsx("div",{className:`
                fixed top-0 left-0 right-0 z-50
                ${a==="success"?"bg-primary":"bg-red-500"}
                text-white text-center py-3
                transition-all duration-300 ease-in-out
                animate-bounce
            `,children:r})},f=()=>{const[r,a]=i.useState(!1),{flash:t={}}=n().props,[o,c]=i.useState(!1);return i.useEffect(()=>{const s=setTimeout(()=>a(!0),100);return()=>clearTimeout(s)},[]),i.useEffect(()=>{const s=setTimeout(()=>a(!0),100);return()=>clearTimeout(s)},[]),i.useEffect(()=>{if(t&&t.success){c(!0);const s=setTimeout(()=>{c(!1)},3e3);return()=>clearTimeout(s)}},[t]),e.jsxs("div",{className:"min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex flex-col items-center  justify-center px-20",children:[o&&t.success&&e.jsx("div",{className:"absolute top-4 left-0 right-0 z-50 flex justify-center",children:e.jsx(u,{message:t.success,type:"success",duration:3e3})}),e.jsx("div",{className:`mb-2 fade-in ${r?"active":""}`,children:e.jsx("img",{src:"/TripInLogo.svg",className:"",alt:"Logo of TripIn"})}),e.jsxs("div",{className:`text-center mb-12 fade-in ${r?"active":""}`,children:[e.jsx("h1",{className:"text-2xl font-semibold text-gray-800 mb-2",children:"Enjoy Your Trip,"}),e.jsx("h2",{className:"text-2xl font-semibold text-gray-800",children:"Leave the Hassle Behind"})]}),e.jsx(l,{className:"w-full text-center max-w-xs bg-primary2 text-white py-4 rounded-full font-medium hover:bg-blue-800 transition-colors cursor-pointer",href:"/auth",children:"CONTINUE"})]})};export{f as default};
