import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";



const PlacePage = () => {

    const {id} = useParams();
    const [place, setPlace] = useState(null); 

    //state to show all the photos upon button click
    const [showAllPhotos, setShowAllPhotos] = useState(false)

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


    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className=" bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl"> Photos of {place.title} </h2>

                        <button  onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"> 
                            {/* close icon here */}
                            Close photos
                        </button>
                    </div>
                    {place?.photos.length > 0 && place.photos.map(photo => (
                        <div key={photo._id}>
                            <img src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                </div>
                
            </div>
        )
    }


    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">

            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" target="blank" href={'https://maps.google.com/?q='+place.address}>
                {/* maps icon  */}
                {place.address}
            </a>

            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3 xl overflow-hidden">

                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        {place.photos?.[1] && (
                            <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} alt="" />
                        )}
                        
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} alt="" />
                            )}
                        </div>
                
                    </div>

                </div>

                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    {/* photo icon here  */}
                    Show more photos
                </button>
            </div> 

            <div className="my-4">
                <h2 className="font-semibold text-2xl ">Description</h2>
                {place.description}
            </div>

            
        </div>
    );
}


export default PlacePage;