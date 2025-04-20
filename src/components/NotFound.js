import {useNavigate} from 'react-router-dom';
function NotFound() {
    const navigate=useNavigate();
function handleClickToHomePage (){
    navigate('/');
}
    return ( 
        <div>
            <div className="my-4">404: The page you requested not found</div>
            <button className="btn btn-success" onClick={handleClickToHomePage}>Go back to Home Page</button>
        </div>
     );
}


export default NotFound;