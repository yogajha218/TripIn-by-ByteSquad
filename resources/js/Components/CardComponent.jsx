const CardComponent = ({ CardProp = [] }) => {
    const formatCurrency = (amount) => {
        return `Rp${amount.toLocaleString("id-ID")}`;
    };

    

    return (
        <>
            {CardProp.map((data) => (
                <div
                    key={data.id}
                    className="lg:max-w-[440px]  w-full h-fit rounded-md border border-[#8BAFCE80] bg-white shadow-md px-4 py-5"
                >
                    <div className="flex items-center">
                        <div className="">
                            <img
                                src="/shuttle_icon.svg"
                                alt="shuttle_icon"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex-row justify-start h-fit ml-5">
                            <p className="text-black">{data.name}</p>
                            <p className="text-black text-sm w-fit p-1 border rounded-md">
                                {data.plateNumber}
                            </p>
                        </div>
                        <div>
                            <p className="text-black">{data.date}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr] ">
                        <div className=" h-full flex justify-end py-2 pr-2 w-4">
                            {/* <div className="size-full  border-r-2 border-r-red-800"></div> */}
                            {/* <img
                                className="h-[72px] w-[12px]"
                                src="/cardLine.svg"
                                alt="cardLine"
                            /> */}
                        </div>
                        <div className=" h-full text-black relative pl-9 ">
                            <div className="absolute rounded-full size-2 bg-grey left-5 top-2"></div>

                            <div className="absolute h-3/4 w-0.5 bg-grey left-[23px] top-3">
                                <div className="absolute rounded-full size-2 bg-grey -left-[3px] top-1/2 -translate-y-[45%] "></div>
                            </div>
                            <div className="absolute size-2 rounded-full bg-grey left-5 bottom-1.5"></div>
                            <div className="grid grid-cols-2 gap-4 ">
                                <div className="flex flex-col justify-start max-h-9 overflow-hidden">
                                    <p className="text-sm w-fit">from:</p>
                                    <p className="font-medium w-fit text-xs text-left ">
                                        {data.origin}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="w-24">
                                        <p className="text-sm w-fit">status:</p>
                                        <p
                                            className={`font-medium w-fit text-[10px] leading-snug ${
                                                data.status === "On Trip"
                                                    ? "text-[#EB8317]"
                                                    : "text-gray-600 bg-gray-100 p-1 rounded-sm "
                                            }`}
                                        >
                                            {data.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-start relative overflow-hidden max-h-9">
                                    <p className="text-sm w-fit">to:</p>
                                    <p className="font-medium w-fit text-xs text-left">
                                        {data.destination}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="w-24">
                                        <p className="text-sm w-fit">Price:</p>
                                        <p className="font-medium w-fit text-xs">
                                            {formatCurrency(data.price)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
export default CardComponent;
