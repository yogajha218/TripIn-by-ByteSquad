import{r as i,j as e}from"./app-BnX73pR_.js";import{C as h}from"./CardComponent-Dh8A0kmi.js";import{N as k}from"./NavbarTripin-DfinwLxI.js";import"./format-BzRktsyD.js";function T({title:t,titleId:a,...p},c){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:c,"aria-labelledby":a},p),t?i.createElement("title",{id:a},t):null,i.createElement("path",{fillRule:"evenodd",d:"M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z",clipRule:"evenodd"}))}const z=i.forwardRef(T),S=["Jakarta","Bali","Bandung","Yogyakarta"],A=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex lg:w-full h-[120px]   overflow-scroll flex-nowrap  gap-2 flex-row items-center hide-scrollbar scroll-smooth",children:S.map((t,a)=>e.jsxs("div",{className:" relative flex-shrink-0 w-[255px] h-[100px] rounded-lg overflow-hidden ",children:[e.jsx("p",{className:"absolute text-white shadow-md px-3 py-2 font-semibold tracking-tight z-10",children:t}),e.jsx("div",{className:"absolute size-full  bg-primary2/30"}),e.jsx("img",{src:`/${t}.png`,alt:"",loading:"lazy",className:"w-[255px] h-[100px]"})]},a))})}),U=({credit:t,username:a,user_id:p,booking:c,notification_status:g})=>{const[u,f]=i.useState(!1),[b,v]=i.useState(!1),[m,j]=i.useState(!1);i.useState([]);const{todays:N,upcomings:w}=c,y=new Intl.NumberFormat("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t),x=N.map(s=>{var l,r,o,n;return{id:s.booking_id,name:"Shuttle Bus Tripin",plateNumber:(l=s.trips[0])==null?void 0:l.schedule.vehicle.license_plate,origin:(r=s.trips[0])==null?void 0:r.origin,destination:(o=s.trips[0])==null?void 0:o.schedule.location.name,status:"On Trip",price:s.price,date:(n=s.trips[0])==null?void 0:n.selected_day}}),d=w.map(s=>{var l,r,o,n;return{id:s.booking_id,name:"Shuttle Bus Tripin",plateNumber:(l=s.trips[0])==null?void 0:l.schedule.vehicle.license_plate,origin:(r=s.trips[0])==null?void 0:r.origin,destination:(o=s.trips[0])==null?void 0:o.schedule.location.name,status:"Upcoming Trip",price:s.price,date:(n=s.trips[0])==null?void 0:n.selected_day}});i.useEffect(()=>{f(x.length>0),v(d.length>0)},[c]);const C=m?d:d.slice(0,2);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"h-fit w-full bg-white lg:max-w-[400px]",children:[e.jsxs("div",{className:"relative h-[222px] rounded-b-3xl bg-primary",children:[e.jsxs("div",{className:"absolute right-5 top-8",children:[e.jsx(z,{onClick:()=>window.location.href=route("notification"),className:"relative z-40 size-8 cursor-pointer text-white hover:animate-none"}),g=="unread"&&e.jsx("div",{className:"absolute right-1 top-1 z-50 size-2 rounded-full bg-primary2"})]}),e.jsx("div",{className:"relative h-[90px] pl-5 pt-8",children:e.jsx("img",{src:"/TripInLogo.svg",className:"h-8 w-16",alt:"Logo of TripIn",loading:"lazy"})}),e.jsxs("div",{className:"mx-5",children:[e.jsxs("p",{className:"text-2xl font-semibold tracking-tighter text-white sm:text-3xl",children:["Welcome, ",a]}),e.jsx("p",{className:"text-base font-medium tracking-tight text-white sm:text-lg",children:"Enjoy Your Trip!"})]})]}),e.jsxs("div",{className:"h-full min-h-[100vh] w-full px-5 pb-8",children:[e.jsxs("a",{onClick:()=>console.log("Navigate to credit screen"),className:"group relative top-[-1.5rem] mx-5 flex rounded-lg border border-primary bg-white px-5 py-2 hover:cursor-pointer",children:[e.jsx("img",{className:"mr-3",src:"/credit.svg",alt:"CreditIcon",loading:"lazy"}),e.jsxs("p",{className:"text-orange absolute left-14 top-1/2 -translate-y-1/2 text-sm",children:[y," CP"]})]}),e.jsx("button",{onClick:()=>window.location.href=route("booking.index"),className:"mb-8 w-full rounded-lg bg-primary2 py-2 text-white",children:"Booking"}),e.jsx("div",{className:"font-semibold text-black",children:"Available Locations"}),e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsx(A,{})}),e.jsx("div",{className:"mb-3 mt-12 font-semibold text-black",children:"Today's Trip"}),e.jsx("div",{className:"grid gap-4",children:u?e.jsx(h,{CardProp:x}):e.jsxs("div",{className:"flex flex-col items-center justify-center pb-9",children:[e.jsx("img",{src:"/tayo-bus.svg ",loading:"lazy"}),e.jsx("p",{children:"no tayo trip available"})]})}),e.jsxs("div",{className:"mb-3 mt-16 flex items-baseline justify-between px-2",children:[e.jsx("p",{className:"text-orange font-semibold",children:"Upcoming's Trip"}),d.length>2&&e.jsx("button",{onClick:()=>j(!m),className:"text-sm font-medium text-primary2 underline",children:m?"See Less":"See More"})]}),e.jsx("div",{className:"grid gap-4",children:e.jsx("div",{className:"mb-10 grid gap-4",children:b?e.jsx(h,{CardProp:C}):e.jsxs("div",{className:"flex flex-col items-center justify-center pb-9",children:[e.jsx("img",{src:"/tayo-bus.svg"}),e.jsx("p",{children:"no tayo trip available"})]})})})]})]})}),e.jsx(k,{pageInfo:"HomePage"})]})};export{U as default};
