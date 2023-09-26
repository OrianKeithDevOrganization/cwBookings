import { useParams } from "react-router";

const BookedPlacePage = () => {

    const {id} = useParams();

    return (
        <div>
            single booking: {id} 
        </div>
    )

}


export default BookedPlacePage;

