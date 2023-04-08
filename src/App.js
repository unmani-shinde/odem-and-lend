import logo from './logo.svg';
import './App.css';
import {Router,Route,Routes} from 'react-router-dom'
import Home from './HomePage'
import SignUp from './Webpages/Signuppage'
import SignIn from './Webpages/Loginpage'
import Courses from './Webpages/learningCourses'
import Payment from './Webpages/paymentgateway'
import Borrower from './Webpages/borrower';

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/odem' element={<ODEM/>}/>
        <Route path='/paymentgateway' element={<Payment/>}/>
        <Route path='/borrower' element={<Borrower/>}/>
    </Routes>          
    </>
  );
}

export default App;
