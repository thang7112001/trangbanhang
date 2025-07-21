import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){
    let navigate = useNavigate()
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    return(
        <>
            <input type="text"
            placeholder={'username'}
                   value={userName}
                   onChange={e=>(setUserName(e.target.value))}
            />
            <input type="text"
                   placeholder={'password'}
                   value={password}
                   onChange={e=>(setPassword(e.target.value))}
            />
            <button onClick={()=>{
                if (userName==='ADMIN'&&password==='ADMIN'){
                    navigate('/');
                }else{
                    alert('sai tk va mk');
                }
            }}>Login</button>
        </>
    )
}