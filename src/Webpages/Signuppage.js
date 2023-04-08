import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/cred.css'

function SignUp(){
    let navigate=useNavigate();

    const [user,setUser]= useState({
        Fullname:"",
        email:"",
        phonenumber:"",
        password:"",
        
    })

    let name,value;

    const handleInputs =(e)=>{
        
        
        name= e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value})

    }

    const PostData= async(e)=>{
        e.preventDefault();        
        // const {Fullname,Username,email,phonenumber,password,cpassword}= user;
        let myuser=JSON.stringify(user)

        const res  =await fetch("http://localhost:4000/signup",{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                
                "Access-Control-Allow-Origin":  "http://localhost:4000",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
                
                
            },
            
            
            body:myuser
            
        })
               

        const data = await res.json();

        if(data.status===422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");

        } else{
            window.alert("Registration Successful");
            console.log("Registration Successful");

            navigate("/signin")
        }



}







    return(
        
        <div className='wrapper'>
            <div className='form-boxlogin' style={{height:'550px'}}>
                <form action='#' method='POST'>
                    <h2>SignUp</h2>
                    <div className='input-box'>
                        <label htmlFor='username' style={{color:'black'}}>Full name</label>
                        <input type='text' name="Fullname"
                        value={user.Fullname}
                        onChange={handleInputs}
                        placeholder='Enter your Name'></input>
                    </div>
                    <div className='input-box'>
                        <label htmlFor='email' style={{color:'black'}}>Email ID</label>
                        <input type='text' name="email"
                        value={user.email}
                        onChange={handleInputs}
                        placeholder='Enter your email'></input>
                    </div>
                    <div className='input-box'>
                        <label htmlFor='phonenumber' style={{color:'black'}}>Phone Number</label>
                        <input type='text' name="phonenumber"
                        value={user.phonenumber}
                        onChange={handleInputs}
                        placeholder='Enter your password'></input>
                    </div>
                    <div className='input-box'>
                        <label htmlFor='username' style={{color:'black'}}>Password</label>
                        <input type='text' name="password"
                        value={user.password}
                        onChange={handleInputs} 
                        placeholder='Enter your password'></input>
                    </div>
                    
                    <label for="dropdown" style={{paddingTop:"40px"}}>You are a:</label>
                    <select id="dropdown" name="dropdown">
                        <option value="option1">Student</option>
                        <option value="option2">Educator</option>
                    </select>
                    

                    <div className="button" id = "button">
                            <input type="submit" name="signup" value="SignUp" style={{width:"300px"}}
                            onClick={PostData}
                            />
                        </div>
            
                    <div className="login-link" style={{paddingTop:'20px'}}>
                        <strong> Already a member? </strong> 
                        <a href="/signin" onClick={()=>navigate("/signin")}>Login Now</a>
                        </div>

                </form>
            </div>
        </div>
        
    )
}

export default SignUp