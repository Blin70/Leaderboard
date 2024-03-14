import { Link } from "react-router-dom";

function NotFoundPage(){
    return(
        <div className="w-screen h-screen text-3xl text-center align-middle">
        <h1>404 Not Found</h1>
        <Link to='/'>Home</Link>
        </div>
    );
};

export default NotFoundPage;