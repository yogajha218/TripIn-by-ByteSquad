import{j as e}from"./app-BnX73pR_.js";import{N as u}from"./NavbarTripin-DfinwLxI.js";const g=({routes:l})=>{var r,n,c,d,m,x,p;const s=l===null?null:{busName:"Shuttle Bus Tripin",plateNumber:(r=l.trips[0])==null?void 0:r.schedule.vehicle.license_plate,estimatedArrival:{start:(n=l.trips[0])==null?void 0:n.schedule.departure_time,end:(c=l.trips[0])==null?void 0:c.schedule.arrival_time},currentStopIndex:1,stops:[{label:(d=l.trips[0])==null?void 0:d.origin,time:(m=l.trips[0])==null?void 0:m.schedule.departure_time},{label:"On The Way",time:""},{label:(x=l.trips[0])==null?void 0:x.schedule.location.name,time:(p=l.trips[0])==null?void 0:p.schedule.arrival_time}]};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"mb-14 h-screen bg-white lg:w-[400px]",children:[e.jsx("div",{className:"h-[108px] rounded-b-2xl bg-primary p-6",children:e.jsx("h1",{className:"pt-6 text-center text-2xl font-semibold text-white",children:"Track Shuttle"})}),s!==null?e.jsx("div",{className:"p-6",children:e.jsxs("div",{className:"rounded-lg border border-gray-100 bg-white p-4 shadow-md",children:[e.jsxs("div",{className:"mb-2 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"fonfont-medium",children:s.busName}),e.jsx("p",{className:"text-sm text-gray-600",children:s.plateNumber})]}),e.jsx("div",{className:"rounded-lg",children:e.jsx("img",{src:"shuttle_icon.svg",alt:"shuttle",className:"size-30"})})]}),e.jsxs("p",{className:"mb-4",children:["Estimated arrived:"," ",s.estimatedArrival.start.split(":").slice(0,2).join(":")," ","-",s.estimatedArrival.end.split(":").slice(0,2).join(":")]}),e.jsx("div",{className:"rounded-lg bg-blue-50 p-6",children:s.stops.map((h,t)=>{t>s.currentStopIndex;const i=t===s.currentStopIndex,a=t<s.currentStopIndex;return e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"flex min-w-[60px] flex-col items-end",children:e.jsx("span",{className:`font-medium ${i?"text-blue-600":""}`,children:h.time.split(":").slice(0,2).join(":")})}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:`h-3 w-3 rounded-full ${i?"animate-pulse bg-blue-500 ring-4 ring-blue-100":a?"bg-blue-500":"bg-gray-300"}`}),t!==s.stops.length-1&&e.jsx("div",{className:`h-16 w-0.5 ${a?"bg-blue-500":i?"bg-gradient-to-b from-blue-500 to-gray-300":"bg-gray-300"}`})]}),e.jsxs("div",{className:"relative flex-1 pb-4",children:[e.jsx("p",{className:`font-medium ${i?"text-blue-600":a?"text-gray-700":"text-gray-500"}`,children:h.label}),i?e.jsx("span",{className:"absolute mt-1 inline-block rounded-sm bg-blue-100 px-2 py-1 text-xs text-blue-600",children:"Current Position"}):a?e.jsx("span",{className:"absolute mt-1 inline-block rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-600",children:"Passed"}):e.jsx(e.Fragment,{children:e.jsx("div",{children:" not yet"})})]})]},t)})})]})}):e.jsxs("div",{className:"flex h-3/4 flex-col items-center justify-center",children:[e.jsx("img",{src:"/tayo-bus.svg"}),e.jsx("p",{children:"there's no trip to track"})]})]})}),e.jsx(u,{pageInfo:"TrackingPage"})]})};export{g as default};
