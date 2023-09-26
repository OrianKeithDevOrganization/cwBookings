import { useEffect, useState } from "react";
import AccountPageNavigation from "./AccountPageNavigation";
import axios from 'axios';

const BookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/booking').then(response => {
            setBookings(response.data);
        })
    },[]);

    return (

        <div>
            <AccountPageNavigation />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div key={booking._id}>
                        {booking.checkIn}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default BookingsPage;