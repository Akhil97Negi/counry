import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

 const PrivateRoute = ({children}) => {
    const {auth} = useContext(AuthContext);
    if(!auth.isAuth){
        return(<Navigate to="/login" />)
    }
    return children
}

export default  PrivateRoute