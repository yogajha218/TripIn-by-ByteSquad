import{y as l,r as n,W as v,j as e,a as o}from"./app-BwI4ZmoF.js";import{B as C}from"./ButtonComponent-DfPBZXvv.js";const S=()=>{const h=l.restore("legal-data")||{termsClicked:!1,privacyClicked:!1},u=l.restore("form-data")||{email:"",password:"",confirmPassword:"",termsAccepted:!1},[t,d]=n.useState(!1),[a,m]=n.useState(h),[f,x]=n.useState(!1),{data:r,setData:c,post:p,processing:g,errors:i}=v(u);n.useEffect(()=>{l.remember(a,"legal-data")},[a]),r.email&&r.password&&(t||r.confirmPassword&&r.termsAccepted);const w=s=>{s.preventDefault();const j=document.head.querySelector('meta[name="csrf-token"]').content;t?p("/login"):p("/register",r,{headers:{"X-CSRF-TOKEN":j}})},b=s=>{s.preventDefault(),m({...a,termsClicked:!0}),l.remember(a,"legal-data"),l.remember(r,"form-data"),window.location.href="/terms-condition"},y=s=>{s.preventDefault(),m({...a,privacyClicked:!0}),l.remember(a,"legal-data"),l.remember(r,"form-data"),window.location.href="/privacy-policy"},k=s=>{!a.termsClicked||!a.privacyClicked?(x(!0),c("termsAccepted",!1)):(x(!1),c("termsAccepted",s.target.checked))};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"flex min-h-screen flex-col bg-primary lg:w-[400px]",children:[e.jsx("div",{className:"flex justify-center py-16",children:e.jsx("img",{src:"/TripInLogo.svg",className:"w-32",alt:"Logo of TripIn"})}),e.jsxs("div",{className:"relative top-[24px] flex w-full",children:[e.jsx("div",{className:`top-4 h-[48px] flex-1 rounded-[30px] ${t?"bg-white":"bg-primary"}`,children:e.jsx("button",{className:`w-full rounded-b-none rounded-t-[30px] bg-transparent py-3 text-center ${t?"text-black":"text-white"}`,onClick:()=>d(!0),children:"Sign In"})}),e.jsx("div",{className:`top-4 h-[48px] flex-1 rounded-[30px] ${t?"bg-primary":"bg-white"}`,children:e.jsx("button",{className:`w-full rounded-b-none rounded-t-[30px] bg-transparent py-3 text-center ${t?"text-white":"text-black"}`,onClick:()=>d(!1),children:"Sign Up"})})]}),e.jsx("div",{className:"min-h-[calc(100vh-240px)] flex-1 bg-white px-6 py-12",children:e.jsxs("div",{className:"mx-auto max-w-md",children:[e.jsx("h2",{className:"texx-black mb-6 text-lg font-medium",children:t?"Login to your Account":"Create your Account"}),e.jsxs("form",{className:"space-y-4",onSubmit:w,children:[e.jsx("input",{type:"email",id:"email",name:"email",placeholder:"Email",className:"w-full rounded-lg border border-gray-300 bg-white p-3 text-black",value:r.email,onChange:s=>c("email",s.target.value),required:!0,autoComplete:"email"}),i.email&&e.jsx("p",{className:"text-sm text-red-500",children:i.email}),e.jsx("input",{type:"password",id:"password",name:"password",placeholder:"Password",className:"w-full rounded-lg border border-gray-300 bg-white p-3 text-black",value:r.password,onChange:s=>c("password",s.target.value),required:!0}),i.password&&e.jsx("div",{className:"text-sm text-red-500",children:i.password}),!t&&e.jsx("input",{type:"password",id:"confirmPassword",placeholder:"Confirm Password",className:"w-full rounded-lg border border-gray-300 bg-white p-3 text-black",value:r.confirmPassword,onChange:s=>c("confirmPassword",s.target.value),required:!0}),i.confirmPassword&&e.jsx("div",{className:"text-sm text-red-500",children:i.confirmPassword}),t&&e.jsx("div",{className:"text-right",children:e.jsx(o,{href:"/forgot-password/email",className:"text-primary",children:"Forgot Password?"})}),!t&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("input",{type:"checkbox",id:"terms",className:"mt-1",checked:r.termsAccepted,onChange:k}),e.jsxs("label",{htmlFor:"terms",className:"text-sm text-black",children:["I understood the"," ",e.jsx(o,{href:"/terms-condition",onClick:b,className:`${a.termsClicked?"text-green-600":"text-sky-400"}`,children:"Terms & Conditions"})," ","and"," ",e.jsx(o,{href:"/privacy-policy",onClick:y,className:`${a.privacyClicked?"text-green-600":"text-sky-400"}`,children:"Privacy Policy"})]})]}),f&&e.jsx("p",{className:"mt-2 text-sm text-red-500",children:"Please read the Terms & Conditions and Privacy Policy first"})]}),e.jsx(C,{buttonText:t?"Sign In":"Sign Up",disabled:g})]})]})})]})})})};export{S as default};
