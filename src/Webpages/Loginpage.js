import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/cred.css'

function SignIn(){
    let navigate=useNavigate();

    const [Fullname,setFullname]=useState('');
    const [password,setPassword]=useState('');

    const loginUser=async(e)=>{
        e.preventDefault();

        const res= await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                Fullname,
                password

            })

        });

        const data=res.json();

        if(res.status===400|| !data){
            window.alert("User not Verified")
        }else{
            window.alert("Logged In Successfully")
            navigate('/')
        }
    }


    return(
        <>
        <div className='wrapper'>
            <div className='form-boxlogin' style={{height:"460px"}}>
                <form action='#'>
                    <h2>Login</h2>
                
                    
                    <div className='input-box'>
                        <label htmlFor='username'>Full name</label>
                        <input type='text' placeholder='Enter Your Full name'
                        value={Fullname}
                        onChange={(e)=> setFullname(e.target.value)}></input>
                    </div>
                    
                    <div className='input-box'>
                        <label htmlFor='username' placeholder='Password'>Password</label>
                        <input type='text' placeholder='Enter your password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}></input>
                    </div>
                    <div className="checkbox">
                            <span className="details"></span>
                            <input type="checkbox" id="remember-me"/>
                            <label for="remember-me">{'\u00A0'}Remember me</label>
                    </div>

                    <label for="dropdown" style={{paddingTop:"10px"}}>You are a:</label>
                    <select id="dropdown" name="dropdown">
                        <option value="option1">Student</option>
                        <option value="option2">Educator</option>
                    </select>

                    <div className="button">
                        <input type="submit" value="Login"style={{width:"300px"}}
                        onClick={loginUser}
                        />
                        </div>
            
                    <div className="signup-link" style={{paddingTop:"15px"}}>
                        <strong> Not a member? </strong>
                        <a onClick={()=>navigate("/signup")}>SignUp Now</a>
                    </div>

                    
                    


                </form>
            </div>
        </div>
        
        
        </>
    )
}

export default SignIn