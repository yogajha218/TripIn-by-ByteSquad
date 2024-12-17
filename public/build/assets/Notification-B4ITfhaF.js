import{r as i,j as e}from"./app-BAjVzL0_.js";import{F as l}from"./ChevronLeftIcon-DwDyz-pD.js";import{f as d}from"./format-BzRktsyD.js";const o=({notifications:t})=>(i.useEffect(()=>{(async()=>{try{await axios.post("/notifications/read")}catch(a){console.error("Error marking notifications as read:",a)}})()},[]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"lg:flex lg:justify-center",children:e.jsxs("div",{className:"min-h-screen bg-primary lg:w-[400px] rounded-b-md",children:[e.jsxs("div",{className:"px-4 py-6 flex items-center relative",children:[e.jsx(l,{className:"absolute text-white size-6 cursor-pointer",onClick:()=>{history.back()}}),e.jsx("h1",{className:"text-white bg-primary rounded-md text-2xl font-semibold w-full text-center",children:"Notification"})]}),e.jsxs("div",{className:"bg-white  min-h-screen mt-2 px-6 py-6",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Notifications"}),e.jsx("div",{className:"space-y-3",children:t.length>0?t.map(s=>{const a=new Date(s.data.date),r=d(a,"EEEE, MMMM d, yyyy");return e.jsxs("div",{className:"bg-white rounded-xl p-4 shadow-md border border-gray-100",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("img",{src:"TripInLogo.svg",className:"h-8",alt:"TripIn Logo"})}),e.jsx("span",{className:"text-sm text-gray-500",children:r})]}),e.jsx("div",{children:e.jsx("h3",{className:"font-semibold",children:s.data.title})}),e.jsx("p",{className:"text-gray-600 mt-2 text-sm",children:s.data.message})]},s.id)}):e.jsx("p",{children:"No notifications available."})}),e.jsx("div",{className:"fixed bottom-8 left-1/2 transform -translate-x-1/2",children:e.jsx("div",{className:"w-32 h-1 bg-gray-300 rounded-full"})})]})]})})}));export{o as default};