import { useParams } from "react-router";

const PlacePage = () => {

    const {id} = useParams();
    return (
        <div>place page : {id} </div>
    );
}


export default PlacePage;