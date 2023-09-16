
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./perks";
import axios from "axios";


const PlacesPage = () => { 

    const {action} = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1); 



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

    async function addPhotoByLink(event) {
        event.preventDefault();
        //takes link and uploads photo to server
        const {data:filename} = await axios.post('/upload-by-link',{link: photoLink})
        setAddedPhotos( prev => {
            return [...prev, filename];
        });
        //set photoLink to empty state
        setPhotoLink('');
    }

    return (
        <div>
            {/* not displaying add button if action is not new  */}
            { action !== 'new' && (
                <div className="text-center"> 
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>   
            )}


            {action === 'new' && (
                <div>
                    <form>

                        {preInput('Title','Title for place should be catchy and short') }
                        <input type="text" value={title} onChange={ ev => setTitle(ev.target.value)} placeholder="title for example: Speke Apartment" />

                        {preInput('Address','Addresss to your property')}
                        <input type="text" value={address} onChange={ ev => setAddress(ev.target.value)} placeholder="address" />

                        {preInput('Photos', 'more is better')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link ...'} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div key={link}>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                            
                            <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload 
                            </button>
                        </div> 

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
               
            )}            
        </div>
    )

}

export default PlacesPage;