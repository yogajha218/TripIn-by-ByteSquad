import{r as n,j as e,b as y}from"./app-BnX73pR_.js";import{B as b}from"./ButtonComponent-BVyRtOhe.js";import{M as w}from"./ModalComponent-bX_qjlAQ.js";import{F as N}from"./ArrowLeftIcon-BcjAyPHO.js";const M=({email:d})=>{const[a,u]=n.useState(["","","",""]),[i,l]=n.useState(""),[f,m]=n.useState(!0),[x,p]=n.useState(""),c=n.useRef([]);n.useEffect(()=>{c.current[0]&&c.current[0].focus()},[]);const h=async r=>{r.preventDefault();const t=document.head.querySelector('meta[name="csrf-token"]').content,s=a.join("");try{const o=await y.post("/register/otp/verify",{email:d,otp:s},{headers:{"X-CSRF-TOKEN":t}});p("OTP verification successful! Redirecting..."),m(!1),setTimeout(()=>{window.location.href=route("auth")},2e3)}catch(o){o.response&&o.response.data.message?l(o.response.data.message):l("An unexpected error occurred. Please try again.")}},g=(r,t)=>{if(t.length<=1&&/^\d*$/.test(t)){const s=[...a];if(s[r]=t,u(s),t&&r<3){const o=document.querySelector(`input[name="code-${r+1}"]`);o==null||o.focus()}}},j=(r,t)=>{if(t.key==="Backspace"&&!a[r]&&r>0){const s=document.querySelector(`input[name="code-${r-1}"]`);s==null||s.focus()}};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"flex min-h-screen flex-col bg-primary lg:w-[400px]",children:[e.jsx("div",{className:"flex flex-none justify-center px-4 py-20",children:e.jsx("img",{src:"/TripInLogo.svg",className:"w-36 object-contain",alt:"Logo of TripIn"})}),e.jsx("div",{className:"flex-grow rounded-t-md bg-white p-6",children:e.jsxs("div",{className:"mx-auto max-w-md p-2",children:[e.jsx("h1",{className:"mb-2 text-2xl font-semibold text-black",children:"Verification Code"}),e.jsx("p",{className:"mb-8 text-gray-500",children:"We have sent the verification code to your email address"}),e.jsxs("form",{onSubmit:h,children:[e.jsx("div",{className:"mb-8 flex justify-between gap-3",children:a.map((r,t)=>e.jsx("input",{ref:s=>c.current[t]=s,type:"text",inputMode:"numeric",name:`code-${t}`,value:r,onChange:s=>g(t,s.target.value),onKeyDown:s=>j(t,s),className:"h-16 w-16 rounded-xl border-2 border-gray-200 bg-transparent text-center text-xl font-semibold text-black transition-colors focus:border-gray-400 focus:outline-none",maxLength:1},t))}),i&&e.jsx("p",{className:"mt-2 text-sm text-red-500",children:i}),e.jsx(b,{buttonText:"confirm"}),e.jsxs("div",{className:"mt-5 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white p-2",onClick:()=>history.back(),children:[e.jsx(N,{className:"size-4 cursor-pointer text-primary2"}),e.jsx("p",{className:"text-sm text-primary2",children:"go back to sign up"})]})]})]})}),e.jsx(w,{isModalHidden:f,setIsModalHidden:m,children:e.jsxs("div",{className:"flex h-[145px] w-[225px] flex-col items-center justify-center",children:[e.jsx("img",{src:"/success.svg"}),e.jsx("p",{className:"text-center text-sm font-normal",children:x})]})})]})})})};export{M as default};
