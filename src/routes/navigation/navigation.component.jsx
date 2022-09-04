import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { Fragment ,useContext} from "react";
import {Outlet,Link} from "react-router-dom";
import { userContext } from "../../contexts/user.context";
import './navigation.styles.scss';
import { signOutUser } from "../utils/firebase/firebase.utils";

const Navigation = () =>{
    const { currentUser, setCurrentUser } = useContext(userContext)
    // console.log(currentUser);
    const signOutHandler = async () =>{
        const res = await signOutUser();
        console.log(res);
        setCurrentUser(null);
    }


    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                 <Link className="nav-link" to='/shop'>
                 SHOP
                 </Link> 
                 {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                    ):(
                 <Link className="nav-link" to='/auth'>
                 SIGN IN
                 </Link>   

                    )
                 }
                </div>

            
            </div>
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;