export const CardComponent = ({ CardProp }) => {
    return (
        <div className="max-w-[395px]  h-fit rounded-[10px] border border-[#8BAFCE80] bg-white ">
            <div className="flex px-4 pt-7 pb-3 items-center">
                <div>
                    <img src="/shuttle_icon.svg" alt="shuttle_icon" />
                </div>
                <div className="flex-row justify-start items-start h-fit ml-2">
                    <p className="text-black">{CardProp.name}</p>
                    <p className="text-slate-500 text-sm w-fit">
                        {CardProp.plateNumber}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-[5rem_1fr] pb-6">
                <div className=" h-full ali flex justify-end relative top-2 right-1">
                    <img
                        className="h-[72px] w-[12px]"
                        src="/cardLine.svg"
                        alt="cardLine"
                    />
                </div>
                <div className=" h-full text-black ">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col justify-start max-h-9 overflow-hidden">
                            <p className="text-sm w-fit">from:</p>
                            <p className="font-medium w-fit text-xs text-left ">
                                {CardProp.origin}
                            </p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className="text-sm w-fit">status:</p>
                            <p
                                className={`font-medium w-fit text-xs ${
                                    CardProp.status === "On Trip"
                                        ? "text-[#EB8317]"
                                        : "text-gray-500"
                                }`}
                            >
                                {CardProp.status}
                            </p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className="text-sm w-fit">to:</p>
                            <p className="font-medium w-fit text-xs text-left">
                                {CardProp.destination}
                            </p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className="text-sm w-fit">Price:</p>
                            <p className="font-medium w-fit text-xs">
                                {CardProp.price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CardComponent;
