import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PlaceBookingWidget from "./PlaceBookingWidget";
import PlacePhotoGallery from "./PlacePhotoGallery";
import PlaceAddress from "./PlaceAddress";



const PlacePage = () => {

    const {id} = useParams();
    const [place, setPlace] = useState(null); 

   
    //grab information about the place

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    },[id])

    if (!place) return '';

    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">

            <h1 className="text-3xl">{place.title}</h1>
            <PlaceAddress>{place.address}</PlaceAddress>
            <PlacePhotoGallery place={place} />
   
            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]"> 
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl ">Description</h2>
                        {place.description}
                    </div>
                    <div className="p-3 bg-primary text-white rounded-xl ml-3">
                        <span className="font-semibold">Check-in :</span> <span className="text-xl">{place.checkIn}</span>
                    </div>
                    <div className="p-3 bg-white text-black rounded-xl mt-2 ml-6">
                        <span className="font-semibold text-gray-800">Check-out : </span> <span className="text-xl">{place.checkOut}</span>
                    </div>
                    <div className="p-3 bg-teal-400 text-white rounded-xl mt-2 ml-12">
                        <span className="font-semibold">Max number of guests : </span> <span className="text-xl">{place.maxGuests}</span>
                    </div>
                </div>
                <div>
                   <PlaceBookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t ">
                <div>
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>

           
            
        </div>
    );
}


export default PlacePage;