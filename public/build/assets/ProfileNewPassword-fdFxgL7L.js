import{r as t,W as g,j as e}from"./app-DVvqOEAo.js";import{F as b}from"./ArrowLeftIcon-DTHK0Pec.js";const v=({email:i})=>{const[c,h]=t.useState(""),[m,y]=t.useState(""),[d,n]=t.useState(""),[r,p]=t.useState(!0),{data:o,setData:l,post:u,processing:x,errors:a}=g({password:"",confirmPassword:""}),w=async s=>{s.preventDefault();const f=document.head.querySelector('meta[name="csrf-token"]').content;if(c!==m){n("Passwords do not match"),p(!1);return}try{u(route("profile.edit.password.send"),o,{headers:{"X-CSRF-TOKEN":f}})}catch{n("Failed to reset password. Please try again.")}};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"flex min-h-screen flex-col bg-primary lg:w-[400px]",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("div",{className:"flex items-center py-20",children:e.jsx("img",{src:"/TripInLogo.svg",className:"w-36 object-contain",alt:"Logo of TripIn"})})}),e.jsx("div",{className:"flex-grow rounded-t-xl bg-white pb-4 pt-8",children:e.jsxs("div",{className:"mx-auto px-6 md:max-w-xl lg:max-w-2xl",children:[d&&e.jsx("div",{className:"mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600",children:d}),e.jsxs("form",{className:"w-full",children:[e.jsx("h2",{className:"mb-4 text-xl font-semibold text-black",children:"Please enter a new password"}),e.jsx("input",{type:"email",name:"email",id:"email",value:i,disabled:!0,className:"mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-black"}),e.jsx("input",{type:"password",name:"password",id:"password",placeholder:"New Password",value:o.password,onChange:s=>l("password",s.target.value),className:`mb-4 w-full rounded-lg border bg-transparent px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2 ${r?"border-gray-300":"border-red-500"}`,required:!0}),a.password&&e.jsx("div",{className:"text-sm text-red-500",children:a.password}),e.jsx("input",{type:"password",name:"confirmPassword",id:"confirmPassword",placeholder:"Confirm New Password",value:o.confirmPassword,onChange:s=>l("confirmPassword",s.target.value),className:`mb-6 w-full rounded-lg border bg-transparent px-4 py-3 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2 ${r?"border-gray-300":"border-red-500"}`,required:!0}),a.confirmPassword&&e.jsx("div",{className:"text-sm text-red-500",children:a.confirmPassword}),e.jsx("button",{onClick:w,className:`w-full rounded-lg bg-primary2 py-3 font-medium text-white ${r?"transition-opacity hover:opacity-90":"cursor-not-allowed opacity-70"} `,disabled:!r||x,children:"Reset Password"}),e.jsxs("div",{className:"mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white p-2",onClick:()=>{window.location.href="/profile/edit"},children:[e.jsx(b,{className:"size-4 cursor-pointer text-primary2"}),e.jsx("p",{className:"text-sm text-primary2",children:"go back to edit profile"})]})]})]})})]})})})};export{v as default};
