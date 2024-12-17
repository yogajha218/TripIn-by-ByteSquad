import{j as e}from"./app-BwI4ZmoF.js";import{f as i}from"./format-BzRktsyD.js";const d=({CardProp:l=[]})=>{const t=s=>`Rp${new Intl.NumberFormat("id-ID").format(s)}`;return e.jsx(e.Fragment,{children:l.map(s=>e.jsxs("div",{className:"h-fit w-full rounded-md border border-[#8BAFCE80] bg-white px-4 py-5 shadow-md lg:max-w-[440px]",children:[e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx("div",{className:"",children:e.jsx("img",{src:"/shuttle_icon.svg",alt:"shuttle_icon",loading:"lazy"})}),e.jsxs("div",{className:"-ml-8 h-fit flex-row justify-start",children:[e.jsx("p",{className:"text-black",children:s.name}),e.jsx("p",{className:"w-fit rounded-md border p-1 text-sm text-black",children:s.plateNumber})]}),e.jsx("div",{children:e.jsx("p",{className:"self-center text-xs text-black",children:i(s.date,"MMM dd yyyy")})})]}),e.jsx("div",{className:"grid h-full grid-cols-[1fr] py-2 pr-2",children:e.jsxs("div",{className:"relative h-full pl-9 text-black",children:[e.jsx("div",{className:"absolute left-5 top-2 size-2 rounded-full bg-grey"}),e.jsx("div",{className:"absolute left-[23px] top-3 h-3/4 w-0.5 bg-grey",children:e.jsx("div",{className:"absolute -left-[3px] top-1/2 size-2 -translate-y-[45%] rounded-full bg-grey"})}),e.jsx("div",{className:"absolute bottom-1.5 left-5 size-2 rounded-full bg-grey"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"flex max-h-9 flex-col justify-start overflow-hidden",children:[e.jsx("p",{className:"w-fit text-sm",children:"from:"}),e.jsx("p",{className:"w-fit text-left text-xs font-medium",children:s.origin})]}),e.jsx("div",{className:"flex flex-col items-end",children:e.jsxs("div",{className:"w-24",children:[e.jsx("p",{className:"w-fit text-sm",children:"status:"}),e.jsx("p",{className:`w-fit text-[10px] font-medium leading-snug ${s.status==="On Trip"?"text-[#EB8317]":"rounded-sm bg-gray-100 p-1 text-gray-600"}`,children:s.status})]})}),e.jsxs("div",{className:"relative flex max-h-9 flex-col justify-start overflow-hidden",children:[e.jsx("p",{className:"w-fit text-sm",children:"to:"}),e.jsx("p",{className:"w-fit text-left text-xs font-medium",children:s.destination})]}),e.jsx("div",{className:"flex flex-col items-end",children:e.jsxs("div",{className:"w-24",children:[e.jsx("p",{className:"w-fit text-sm",children:"Price:"}),e.jsx("p",{className:"w-fit text-xs font-medium",children:t(s.price)})]})})]})]})})]},s.id))})};export{d as C};
