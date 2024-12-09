import { useEffect } from "react"

const dummy = () => {

    useEffect(() => {
        const finishPayment = async () => {
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content

            try{
                const response = await axios.post("/booking/order-detail/store/finish", {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                });

                if(response.status == 200){
                    window.location.href = '/booking/payment-status'
                }

                console.log("POST Response : ", response.data);
            } catch (error){
                console.log("Error with POST request " , error)
            }
        };

        finishPayment();
    }, []);

    return(
        <>
        <div>
            <p>Redirecting ...</p>
        </div>
        </>
    )
}

export default dummy;