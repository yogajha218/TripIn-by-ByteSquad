import{r as s,j as e}from"./app-D9cWeyPu.js";import{C as a}from"./chevron-left-93gHdrj-.js";import"./createLucideIcon-BcYZ5LMg.js";const c=()=>{const[i]=s.useState(100),[l]=s.useState([{id:1,date:"10 Nov 2024",title:"Shuttle TripIn",points:-70},{id:2,date:"10 Nov 2024",title:"Shuttle TripIn",points:70},{id:3,date:"10 Nov 2024",title:"Shuttle TripIn",points:70},{id:4,date:"10 Nov 2024",title:"Shuttle TripIn",points:70},{id:5,date:"10 Nov 2024",title:"Shuttle TripIn",points:70},{id:6,date:"10 Nov 2024",title:"Shuttle TripIn",points:70}]);return e.jsxs("div",{className:"min-w-screen flex min-h-screen flex-col bg-primary",children:[e.jsxs("div",{className:"w-full px-6 pb-8",children:[e.jsx("div",{className:"pt-4",children:e.jsx(a,{className:"text-white",size:24})}),e.jsxs("div",{className:"flex flex-col items-center justify-center",children:[e.jsx("div",{className:"mt-3 h-20",children:e.jsx("img",{src:"/credit.svg",alt:"coins",className:"h-14"})}),e.jsx("span",{className:"mb-1 text-sm text-white",children:"CreditsPoint"}),e.jsx("span",{className:"text-3xl font-semibold text-white",children:i})]})]}),e.jsx("div",{className:"-mt-4 w-full flex-1 rounded-t-3xl bg-white",children:e.jsxs("div",{className:"px-6 pb-20 pt-6",children:[e.jsx("h2",{className:"mb-4 text-lg font-semibold text-black",children:"History"}),e.jsx("div",{className:"space-y-4",children:l.map(t=>e.jsxs("div",{className:"flex items-center justify-between border-b border-gray-100 py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:t.date}),e.jsx("p",{className:"font-medium text-black",children:t.title})]}),e.jsxs("span",{className:`font-semibold ${t.points>0?"text-primary":"text-red-500"}`,children:[t.points>0?"+":"",t.points," Point"]})]},t.id))})]})})]})};export{c as default};
