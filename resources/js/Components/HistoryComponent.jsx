const HistoryComponent = ({ CardProp }) => {
    const handleClick = (id) => {
        console.log("Clicked with log id : ", id);
        window.location.href = `/profile/history/${id}/detail`;
    };

    return (
        <>
            <div className="h-fit w-full rounded-md border border-[#8BAFCE80] bg-white px-4 py-5 shadow-md lg:max-w-[440px]">
                <div className="flex h-fit w-full">
                    <div className="">
                        <img
                            src="/shuttle_icon.svg"
                            alt="shuttle_icon"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex items-center pl-2">
                        <p className="text-black">{CardProp.name}</p>
                    </div>
                    <div className="flex-grow self-start">
                        <p
                            className="size-full cursor-pointer text-end text-xs text-primary underline"
                            onClick={() => handleClick(CardProp.logId)}
                        >
                            See Detail
                        </p>
                    </div>
                </div>
                <div className="grid h-full grid-cols-[1fr] py-2 pr-2">
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
                                    {CardProp.origin}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="w-24">
                                    <p className="w-fit text-sm">
                                        {CardProp.seat}
                                    </p>
                                    <p
                                        className={`$} w-fit text-[10px] font-medium leading-snug`}
                                    >
                                        {CardProp.passengers}
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex max-h-9 flex-col justify-start overflow-hidden">
                                <p className="w-fit text-sm">to:</p>
                                <p className="w-fit text-left text-xs font-medium">
                                    {CardProp.destination}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="w-24">
                                    <p className="w-fit text-sm">Price:</p>
                                    <p className="w-fit text-xs font-medium">
                                        {CardProp.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryComponent;
