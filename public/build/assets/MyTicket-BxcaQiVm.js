import{j as e}from"./app-BwExMVzy.js";import{N as v}from"./NavbarTripin-B4mDhwK3.js";import{c as o}from"./createLucideIcon-C5mJdXqG.js";import{f as h}from"./format-BzRktsyD.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=o("CircleDot",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=o("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]),C=({bookings:j})=>{const a=j.map(s=>{var t,i,l,r,c,d,n,m,x;return{id:s.booking_id,plateNumber:(t=s.trips[0])==null?void 0:t.schedule.vehicle.license_plate,bookingCode:s.booking_code,departure:{time:(i=s.trips[0])==null?void 0:i.schedule.departure_time,date:(l=s.trips[0])==null?void 0:l.selected_day,city:(r=s.trips[0])==null?void 0:r.city,place:(c=s.trips[0])==null?void 0:c.origin},arrival:{time:(d=s.trips[0])==null?void 0:d.schedule.arrival_time,date:(n=s.trips[0])==null?void 0:n.selected_day,city:(m=s.trips[0])==null?void 0:m.schedule.location.city,place:(x=s.trips[0])==null?void 0:x.schedule.location.name}}}),y=async(s,t)=>{s.preventDefault(),window.location.href=`/ticket/${t}/boarding-ticket`};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"relative min-h-screen bg-white pb-16 lg:w-[400px]",children:[e.jsxs("div",{className:"rounded-b-3xl bg-primary p-6",children:[e.jsxs("div",{className:"mt-4 flex items-center justify-between text-white",children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"My Ticket"}),e.jsx(u,{className:"h-8 w-8"})]}),e.jsx("p",{className:"mt-1 text-sm text-white opacity-80",children:"All shuttle tickets that are already active and waiting for payment"})]}),a.length!==0?a.map(s=>e.jsxs("div",{className:"mx-6 mb-4 mt-6 overflow-hidden rounded-lg bg-gray-100",children:[e.jsxs("div",{className:"p-4",children:[e.jsx("div",{className:"mb-4 flex items-start justify-between",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("h2",{className:"text-sm font-semibold text-black sm:text-base",children:"Shuttle Bus Tripin"}),e.jsx("span",{className:"rounded bg-gray-200 px-1 py-1 text-xs text-gray-600",children:s.plateNumber})]})}),e.jsxs("p",{className:"mb-2 text-sm text-gray-600",children:["Booking code: ",s.bookingCode]}),e.jsx("div",{className:"text-sm text-gray-500",children:`${s.arrival.city},
                                    ${h(new Date(s.departure.date),"dd MMM yyyy")}`}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"rounded-lg bg-white p-3",children:[e.jsxs("div",{className:"mb-2 flex items-center gap-2",children:[e.jsx(p,{className:"h-4 w-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Departure"})]}),e.jsxs("div",{className:"text-black",children:[e.jsx("div",{className:"text-xl font-semibold",children:s.departure.time.split(":").slice(0,2).join(":")}),e.jsxs("div",{className:"mt-2",children:[e.jsx("div",{className:"text-[12px] font-medium",children:s.departure.city}),e.jsx("div",{className:"text-[12px] text-gray-500",children:s.departure.place})]})]})]}),e.jsxs("div",{className:"rounded-lg bg-white p-3",children:[e.jsxs("div",{className:"mb-2 flex items-center gap-2",children:[e.jsx(p,{className:"h-4 w-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Arrival"})]}),e.jsxs("div",{className:"text-black",children:[e.jsx("div",{className:"text-xl font-semibold",children:s.arrival.time.split(":").slice(0,2).join(":")}),e.jsx("div",{className:"text-sm text-gray-500",children:h(new Date(s.arrival.date),"dd MMM yyyy")}),e.jsx("div",{className:"mt-2",children:e.jsx("div",{className:"text-xs text-gray-500",children:s.arrival.place})})]})]})]})]}),e.jsx("button",{className:"w-full bg-primary2 py-3 font-medium text-white",onClick:t=>y(t,s.id),children:"BOARDING TICKET"})]},s.id)):e.jsxs("div",{className:"absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center",children:[e.jsxs("svg",{width:"191",height:"156",viewBox:"0 0 191 156",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"relative -left-2",children:[e.jsx("path",{d:"M138 2V19M138 53V70M138 104V121M53 2H172C176.509 2 180.833 3.79107 184.021 6.97918C187.209 10.1673 189 14.4913 189 19V44.5C184.491 44.5 180.167 46.2911 176.979 49.4792C173.791 52.6673 172 56.9913 172 61.5C172 66.0087 173.791 70.3327 176.979 73.5208C180.167 76.7089 184.491 78.5 189 78.5V104C189 108.509 187.209 112.833 184.021 116.021C180.833 119.209 176.509 121 172 121H53C48.4913 121 44.1673 119.209 40.9792 116.021C37.7911 112.833 36 108.509 36 104V78.5C40.5087 78.5 44.8327 76.7089 48.0208 73.5208C51.2089 70.3327 53 66.0087 53 61.5C53 56.9913 51.2089 52.6673 48.0208 49.4792C44.8327 46.2911 40.5087 44.5 36 44.5V19C36 14.4913 37.7911 10.1673 40.9792 6.97918C44.1673 3.79107 48.4913 2 53 2Z",stroke:"black",strokeWidth:"2.91667",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M81.5832 111.5C81.5832 131.979 64.9791 148.583 44.4998 148.583C24.0206 148.583 7.4165 131.979 7.4165 111.5C7.4165 91.0207 24.0206 74.4166 44.4998 74.4166C64.9791 74.4166 81.5832 91.0207 81.5832 111.5Z",fill:"#F44336"}),e.jsx("path",{d:"M54.987 95.7693L60.2305 101.013L34.0126 127.231L28.769 121.987L54.987 95.7693Z",fill:"white"}),e.jsx("path",{d:"M60.2305 121.987L54.987 127.231L28.769 101.013L34.0126 95.7693L60.2305 121.987Z",fill:"white"})]}),e.jsx("p",{children:"You don't have any ticket"})]})]})}),e.jsx(v,{pageInfo:"TicketPage"})]})};export{C as default};
