import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router";
import { UserContext } from "../../SupportUtilities/UserContext";

const PlaceBookingWidget = ({place}) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const [redirect, setRedirect] = useState(''); 

    const {user} = useContext(UserContext); //picking user name from logged in user


    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    },[user])


    let numberOfBookedDays = 0;
    if (checkIn && checkOut) {
        numberOfBookedDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    } 


    const bookThisPlace = async() => {
        //our function code here
        const data = {
            checkIn,checkOut,numberOfGuests,name,mobile,
            place:place._id,
            price:numberOfBookedDays*place.price,
        }

        const response = await axios.post('/bookings', data) 

        //getting booking id from response received from server
        const bookingId = response.data._id;

        setRedirect(`/account/booking/${bookingId}`);

    }

    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input 
                            type="date" 
                            value={checkIn} 
                            onChange={ ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input 
                            type="date" 
                            value={checkOut} 
                            onChange={ ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input 
                        type="number" 
                        value={numberOfGuests} 
                        onChange={ ev => setNumberOfGuests(ev.target.value)}
                    />
                </div>

                {numberOfBookedDays > 0 &&  (
                    <div className="py-3 px-4 border-t">
                       <label>Your full name :</label>
                       <input 
                           type="text" 
                           value={name} 
                           onChange={ ev => setName(ev.target.value)}
                       />
                        <label> Phone number :</label>
                       <input 
                           type="tel" 
                           value={mobile} 
                           onChange={ ev => setMobile(ev.target.value)}
                       />
                   </div>
                )}


            </div>
        
            <button onClick={bookThisPlace} className="primary">
                Book this place
                {numberOfBookedDays > 0 && (
                    <span>${numberOfBookedDays * place.price}</span>
                )}
            </button>
        </div>
    )

}

export default PlaceBookingWidget;