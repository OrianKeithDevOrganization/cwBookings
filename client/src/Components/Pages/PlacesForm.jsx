import { useEffect, useState } from "react";
import Perks from "./perks";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";
import AccountPageNavigation from "./AccountPageNavigation";
import { Navigate, useParams } from "react-router";



const PlacesForm = () => {

    const {id} = useParams();
    
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1); 
    const [redirect, setRedirect] = useState(false);

    
    useEffect(() => {
        if (!id) {
            return ;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address)
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
        })
    },[id]);


    function inputHeader(text) {
        return (<h2 className="text-2xl mt-4">{text}</h2>);
    }
   

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }


    function preInput(header,description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    } 


   
    async function savePlace(event) {
        event.preventDefault();

        const placeData = {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests
        }

        if (id) {
            //it's an update place 
            await axios.put('/places', { id, ...placeData });
            setRedirect(true);
        } else {
            // if it's a new place 
            await axios.post('/places', placeData);
            setRedirect(true);
        }
       
    }


    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountPageNavigation />
            <form onSubmit={savePlace}>

                {preInput('Title','Title for place should be catchy and short') }
                <input type="text" value={title} onChange={ ev => setTitle(ev.target.value)} placeholder="title for example: Speke Apartment" />

                {preInput('Address','Addresss to your property')}
                <input type="text" value={address} onChange={ ev => setAddress(ev.target.value)} placeholder="address" />

                {preInput('Photos', 'more is better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                
                {preInput('Description', 'description of the property')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} /> 

                {preInput('Perks', 'Select all the perks')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2 ">
                    <Perks selected={perks} onChange={setPerks} />
                </div> 

                {preInput('Extra Info', 'house rules, e.t.c')}
                <textarea  value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

                {preInput('Check In & Out Time', 'Add check in and check out time')}
                <div className="grid gap-2 sm:grid-col-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00" />
                    </div>
                    <div >
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="09:00" />
                    </div> 
                    <div>
                        <h3 className="mt-2 -mb-1">Max Number of guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="2" />
                    </div>
                </div> 
                <div>
                    <button className="primary my-4">Save</button>
                </div>

            </form>
        </div>
    )
} 


export default PlacesForm;