import{r as u,j as e,b as v}from"./app-f-qJ5Njq.js";import{f}from"./format-BzRktsyD.js";import{F as N}from"./ChevronLeftIcon-DjU-xN73.js";const w=({routes:l,booking:a})=>{u.useState("");const[c,j]=u.useState(""),g=r=>{j(r.target.value)},d=l.filter(r=>r.vehicles.some(s=>s.license_plate.toLowerCase().includes(c.toLowerCase())||r.name.toLowerCase().includes(c.toLowerCase()))),C=async(r,s,i,n)=>{r.preventDefault();const o=document.head.querySelector('meta[name="csrf-token"]').content;try{(await v.post("route/store",{selectedRoute:{routeId:s,plate:i,departure:n}},{headers:{"X-CSRF-TOKEN":o}})).status==200&&(window.location.href="/booking/seat")}catch(t){t.response?(console.error("Server Error:",t.response.data),alert(t.response.data.message||"An error occurred on the server.")):t.request?(console.error("Network Error:",t.request),alert("Network error. Please check your internet connection and try again.")):(console.error("Error:",t.message),alert("An unexpected error occurred. Please try again."))}};return e.jsxs(e.Fragment,{children:[e.jsx("form",{className:"",children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3",children:e.jsx("svg",{className:"h-4 w-4 text-gray-500","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})})}),e.jsx("input",{required:!0,onChange:g,value:c,type:"search",id:"default-search",className:"block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500",placeholder:"Search routes"})]})}),d.length>0?d.map(r=>r.vehicles.map(s=>{var i,n,o,t,x,m,h,p;return e.jsxs("div",{className:"h-fit rounded-lg border-2 bg-white shadow-lg",children:[e.jsxs("div",{className:"relative cursor-pointer rounded-t-lg bg-white p-4",children:[e.jsxs("div",{className:`absolute right-4 top-4 rounded-full px-2 py-1 text-xs ${((n=(i=s.seat_booking)==null?void 0:i[0])==null?void 0:n.seat_available)<=19?"text-blue-600":((t=(o=s.seat_booking)==null?void 0:o[0])==null?void 0:t.seat_available)<11?"text-yellow-600":((m=(x=s.seat_booking)==null?void 0:x[0])==null?void 0:m.seat_available)<6?"text-red-600":"text-blue-600"}`,children:[((p=(h=s.seat_booking)==null?void 0:h[0])==null?void 0:p.seat_available)??"19 "," ","Seats Available"]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("img",{src:"/Shuttle_Icon.svg",alt:"Bus",className:"h-16 w-16 rounded-md object-cover"}),e.jsxs("div",{className:"flex-grow",children:[e.jsx("h2",{className:"text-sm font-semibold",children:"Shuttle Bus TripIn"}),e.jsx("p",{className:"text-xs text-gray-500",children:s.license_plate})]})]}),e.jsx("div",{children:e.jsx("div",{className:"ml-16 flex items-center space-x-4",children:e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"relative mt-3 items-center",children:[e.jsx("div",{className:"absolute -left-[35px] top-1 size-2 rounded-full bg-grey"}),e.jsx("div",{className:"absolute -left-8 top-1 h-[90%] w-0.5 bg-grey",children:e.jsx("div",{className:"absolute -left-[3px] top-1/2 size-2 -translate-y-[45%] rounded-full bg-grey"})}),e.jsx("div",{className:"absolute -left-[35px] bottom-1.5 size-2 rounded-full bg-grey"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-500",children:f(a.selectedDay,"MMMM d, yyyy")}),e.jsx("div",{className:"flex items-center space-x-2 text-sm",children:e.jsxs("span",{className:"font-semibold",children:["from:"," ",a.origin]})})]}),e.jsx("span",{className:"text-xs",children:s.pivot.departure_time.split(":").slice(0,2).join(":")}),e.jsxs("div",{className:"mt-4",children:[e.jsx("div",{className:"flex items-center space-x-2 text-sm",children:e.jsxs("span",{className:"font-semibold",children:["to: ",r.name]})}),e.jsx("span",{className:"text-xs",children:s.pivot.arrival_time.split(":").slice(0,2).join(":")})]})]}),e.jsxs("div",{className:"mt-2 flex justify-between",children:[e.jsx("div",{className:"flex items-center space-x-2 text-xs text-gray-400",children:e.jsx("p",{className:"pr-2 font-semibold text-blue-600",children:`Rp${new Intl.NumberFormat("id-ID").format(s.pivot.price)}/Pax`})}),e.jsx("p",{className:"pr-2 font-semibold text-blue-600",children:`Rp${new Intl.NumberFormat("id-ID").format(a.seatsValue*s.pivot.price)}`})]})]})})})]},s.pivot.route_id),e.jsxs("button",{className:"h-full w-full rounded-b-lg bg-primary2 py-2 shadow-lg",onClick:b=>C(b,s.pivot.route_id,s.license_plate,s.pivot.departure_time),children:[" ",e.jsx("p",{className:"text-white",children:"Select Route"})]})]})})):e.jsx("div",{children:"No buses found for the search term."})]})},k=({booking:l,routes:a})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"flex min-h-screen flex-col bg-white lg:w-[400px]",children:[e.jsx("header",{className:"h-[108px] rounded-b-md bg-primary py-6 text-white shadow-md",children:e.jsxs("div",{className:"relative flex justify-center",children:[e.jsx(N,{className:"absolute left-3 top-1/2 z-50 size-6 translate-y-[-50%] cursor-pointer font-bold text-white",onClick:()=>window.location.href="/booking"}),e.jsxs("div",{children:[e.jsx("h1",{className:"w-full text-center text-xl font-bold",children:l.cityValue}),e.jsx("div",{className:"mt-2 flex w-full items-center space-x-2 text-sm",children:e.jsxs("span",{children:[f(l.selectedDay,"MMMM d, yyyy")," ","• ",l.seatsValue," Seat •"," ",a.length," Buses"]})})]})]})}),e.jsx("main",{className:"flex-grow space-y-4 p-4",children:!a||a.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center",children:[e.jsxs("svg",{width:"119",height:"110",viewBox:"0 0 119 110",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M37.6318 94.079C36.3625 94.079 35.2985 93.6497 34.4398 92.791C33.5812 91.9324 33.1518 90.8684 33.1518 89.5991V80.4152C31.8078 78.9218 30.7252 77.2605 29.9039 75.4312C29.0825 73.6019 28.6719 71.6046 28.6719 69.4393V26.8798C28.6719 20.6825 31.5465 16.1465 37.2958 13.2719C43.045 10.3973 52.1169 8.95996 64.5115 8.95996C77.354 8.95996 86.5379 10.3413 92.0632 13.1039C97.5884 15.8666 100.351 20.4585 100.351 26.8798V69.4393C100.351 71.6046 99.9404 73.6019 99.1191 75.4312C98.2978 77.2605 97.2151 78.9218 95.8711 80.4152V89.5991C95.8711 90.8684 95.4418 91.9324 94.5831 92.791C93.7245 93.6497 92.6605 94.079 91.3912 94.079H86.9112C85.6419 94.079 84.5779 93.6497 83.7193 92.791C82.8606 91.9324 82.4313 90.8684 82.4313 89.5991V85.1191H46.5917V89.5991C46.5917 90.8684 46.1623 91.9324 45.3037 92.791C44.445 93.6497 43.381 94.079 42.1117 94.079H37.6318ZM37.6318 44.7996H91.3912V31.3597H37.6318V44.7996ZM48.8316 71.6793C50.6983 71.6793 52.2849 71.0259 53.5916 69.7193C54.8982 68.4126 55.5516 66.826 55.5516 64.9593C55.5516 63.0927 54.8982 61.506 53.5916 60.1994C52.2849 58.8927 50.6983 58.2394 48.8316 58.2394C46.965 58.2394 45.3784 58.8927 44.0717 60.1994C42.7651 61.506 42.1117 63.0927 42.1117 64.9593C42.1117 66.826 42.7651 68.4126 44.0717 69.7193C45.3784 71.0259 46.965 71.6793 48.8316 71.6793ZM80.1913 71.6793C82.0579 71.6793 83.6446 71.0259 84.9512 69.7193C86.2579 68.4126 86.9112 66.826 86.9112 64.9593C86.9112 63.0927 86.2579 61.506 84.9512 60.1994C83.6446 58.8927 82.0579 58.2394 80.1913 58.2394C78.3247 58.2394 76.738 58.8927 75.4314 60.1994C74.1247 61.506 73.4714 63.0927 73.4714 64.9593C73.4714 66.826 74.1247 68.4126 75.4314 69.7193C76.738 71.0259 78.3247 71.6793 80.1913 71.6793ZM39.6478 22.3998H89.8232C88.7032 21.1305 86.2952 20.0665 82.5993 19.2078C78.9033 18.3492 72.9487 17.9199 64.7355 17.9199C56.7462 17.9199 50.9036 18.3865 47.2077 19.3198C43.5117 20.2532 40.9917 21.2798 39.6478 22.3998ZM46.5917 76.1592H82.4313C84.8952 76.1592 87.0046 75.2819 88.7592 73.5272C90.5139 71.7726 91.3912 69.6633 91.3912 67.1993V53.7595H37.6318V67.1993C37.6318 69.6633 38.5091 71.7726 40.2637 73.5272C42.0184 75.2819 44.1277 76.1592 46.5917 76.1592Z",fill:"#1D1B20"}),e.jsx("path",{d:"M51.5539 81.8796C51.5539 94.8208 41.0615 105.313 28.1203 105.313C15.1792 105.313 4.68677 94.8208 4.68677 81.8796C4.68677 68.9384 15.1792 58.446 28.1203 58.446C41.0615 58.446 51.5539 68.9384 51.5539 81.8796Z",fill:"#F44336"}),e.jsx("path",{d:"M34.7472 71.939L38.0607 75.2525L21.4932 91.82L18.1797 88.5065L34.7472 71.939Z",fill:"white"}),e.jsx("path",{d:"M38.0607 88.5065L34.7472 91.82L18.1797 75.2525L21.4932 71.939L38.0607 88.5065Z",fill:"white"})]}),e.jsx("p",{children:"No Routes Avalailable"})]}):e.jsx(w,{routes:a,booking:l})})]})})});export{k as default};
