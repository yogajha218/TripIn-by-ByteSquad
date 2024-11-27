import { ModalProvider } from "@/Contexts/ModalContext"

const BookingLayout = ({ children }) => {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}

export default BookingLayout