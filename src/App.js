import SignIn from "./routes/Sign-in/Signin.component";
import Home from "./routes/home/home.component";
import { Routes,Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";

const Shop =() =>{
  return(
    <div>Shop</div>
  )
}

const App =() =>{

  return(
    <Routes>
      <Route path='/' element={<Navigation/>} >

      <Route index element={<Home/>}/>
      <Route path='shop' element={<Shop/>} />
      <Route path='signin' element={<SignIn/>} />
      </Route>
    </Routes>
    
  )
}
export default App;
