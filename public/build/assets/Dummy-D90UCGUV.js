import{r as t,q as d,j as e}from"./app-BwExMVzy.js";import{M as f}from"./ModalComponent-CbLiXYD8.js";const h=()=>{const[o,r]=t.useState(!1),{flash:i={}}=d().props,[a,n]=t.useState(!1);return t.useEffect(()=>{const s=setTimeout(()=>r(!0),100);return()=>clearTimeout(s)},[]),t.useEffect(()=>{const s=setTimeout(()=>r(!0),100);return()=>clearTimeout(s)},[]),t.useEffect(()=>{if(i&&i.success){n(!0);const s=setTimeout(()=>{n(!1)},3e3);return()=>clearTimeout(s)}},[i]),t.useEffect(()=>{(async()=>{const l=document.head.querySelector('meta[name="csrf-token"]').content;try{(await axios.post("/booking/order-detail/store/finish",{headers:{"X-CSRF-TOKEN":l}})).status==200&&(window.location.href="/booking/payment-status")}catch(c){console.log("Unexpected error has occurred ",c)}})()},[]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 flex flex-col items-center  justify-center px-20",children:[a&&i.success&&e.jsx("div",{className:"absolute top-4 left-0 right-0 z-50 flex justify-center",children:e.jsx(Notification,{message:i.success,type:"success",duration:3e3})}),e.jsx("div",{className:`mb-2 fade-in ${o?"active":""}`,children:e.jsx("img",{src:"/TripInLogo.svg",className:"",alt:"Logo of TripIn"})}),e.jsxs("div",{className:`text-center mb-12 fade-in ${o?"active":""}`,children:[e.jsx("h1",{className:"text-2xl font-semibold text-gray-800 mb-2",children:"Enjoy Your Trip,"}),e.jsx("h2",{className:"text-2xl font-semibold text-gray-800",children:"Leave the Hassle Behind"})]})]}),e.jsx(f,{children:e.jsxs("div",{className:"size-fit py-10 px-12",children:[e.jsxs("svg",{width:"100",height:"100",viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"50",cy:"50",r:"40",stroke:"#ddd","stroke-width":"8",fill:"none"}),e.jsx("circle",{cx:"50",cy:"50",r:"40",stroke:"#3498db","stroke-width":"8",fill:"none","stroke-linecap":"round","stroke-dasharray":"251.2","stroke-dashoffset":"0",children:e.jsx("animate",{attributeName:"stroke-dashoffset",from:"0",to:"251.2",dur:"1.5s",repeatCount:"indefinite"})})]}),e.jsx("p",{children:"Redirecting ..."})]})})]})};export{h as default};
