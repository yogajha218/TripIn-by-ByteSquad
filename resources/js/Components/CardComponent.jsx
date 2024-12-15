import { format } from "date-fns";
const CardComponent = ({ CardProp = [] }) => {
    const formatCurrency = (amount) => {
        return `Rp${amount.toLocaleString("id-ID")}`;
    };

    return (
        <>
            {CardProp.map((data) => (
                <div
                    key={data.id}
                    className="h-fit w-full rounded-md border border-[#8BAFCE80] bg-white px-4 py-5 shadow-md lg:max-w-[440px]"
                >
                    <div className="flex w-full justify-between">
                        <div className="">
                            <img
                                src="/shuttle_icon.svg"
                                alt="shuttle_icon"
                                loading="lazy"
                            />
                        </div>
                        <div className="-ml-8 h-fit flex-row justify-start">
                            <p className="text-black">{data.name}</p>
                            <p className="w-fit rounded-md border p-1 text-sm text-black">
                                {data.plateNumber}
                            </p>
                        </div>
                        <div>
                            <p className="self-center text-black">
                                {format(data.date, "MMM dd")}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr]">
                        <div className="flex h-full w-4 justify-end py-2 pr-2">
                            {/* <div className="size-full  border-r-2 border-r-red-800"></div> */}
                            {/* <img
                                className="h-[72px] w-[12px]"
                                src="/cardLine.svg"
                                alt="cardLine"
                            /> */}
                        </div>
                        <div className="relative h-full pl-9 text-black">
                            <div className="absolute left-5 top-2 size-2 rounded-full bg-grey"></div>

                            <div className="absolute left-[23px] top-3 h-3/4 w-0.5 bg-grey">
                                <div className="absolute -left-[3px] top-1/2 size-2 -translate-y-[45%] rounded-full bg-grey"></div>
                            </div>
                            <div className="absolute bottom-1.5 left-5 size-2 rounded-full bg-grey"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex max-h-9 flex-col justify-start overflow-hidden">
                                    <p className="w-fit text-sm">from:</p>
                                    <p className="w-fit text-left text-xs font-medium">
                                        {data.origin}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="w-24">
                                        <p className="w-fit text-sm">status:</p>
                                        <p
                                            className={`w-fit text-[10px] font-medium leading-snug ${
                                                data.status === "On Trip"
                                                    ? "text-[#EB8317]"
                                                    : "rounded-sm bg-gray-100 p-1 text-gray-600"
                                            }`}
                                        >
                                            {data.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex max-h-9 flex-col justify-start overflow-hidden">
                                    <p className="w-fit text-sm">to:</p>
                                    <p className="w-fit text-left text-xs font-medium">
                                        {data.destination}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="w-24">
                                        <p className="w-fit text-sm">Price:</p>
                                        <p className="w-fit text-xs font-medium">
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
