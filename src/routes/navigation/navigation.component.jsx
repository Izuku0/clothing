import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { Fragment ,useContext} from "react";
import {Outlet,Link} from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { userContext } from "../../contexts/user.context";
//styles
import {NavigationContainer,LogoContainer,NavLinks,Navlink} from './navigation.styles';

import { signOutUser } from "../utils/firebase/firebase.utils";

const Navigation = () =>{
    const { currentUser } = useContext(userContext)
    const {isCartOpen} = useContext(CartContext)
    


    return (
        <Fragment>
            <NavigationContainer>

                <LogoContainer to='/'>
                <CrwnLogo className="logo"/>
                </LogoContainer>

                <NavLinks>

                 <Navlink to='/shop'>
                 SHOP
                 </Navlink> 
                 {
                    currentUser ? (
                        <Navlink as='span' onClick={signOutUser}>{''}SIGN OUT{''}</Navlink>
                    ):(
                 <Navlink to='/auth'>
                 SIGN IN
                 </Navlink>   

                    )
                 }
                 <CartIcon/>

                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;