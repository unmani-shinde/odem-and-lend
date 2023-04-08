import logo from './logo.svg';
import './App.css';
import {Router,Route,Routes} from 'react-router-dom'
import Home from './HomePage'
import SignUp from './Webpages/Signuppage'
import SignIn from './Webpages/Loginpage'
import ODEM from './Webpages/ODEM'
import Courses from './Webpages/learningCourses'
import Payment from './Webpages/paymentgateway'
import LoanRequestForm from "./Webpages/borrower"
import ProvideForm from './Webpages/lender';

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/odem' element={<ODEM/>}/>
        <Route path='/borrower' element={<LoanRequestForm/>}/>
        <Route path='/lender' element={<ProvideForm/>}/>
    </Routes>          
    </>
  );
}

export default App;
