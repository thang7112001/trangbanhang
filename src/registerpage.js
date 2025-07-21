import {useNavigate} from "react-router-dom";

export default function RegisterPage(){
    let navigate = useNavigate()
    return(
        <>
            <button onClick={()=>{
                navigate('/login');
            }}>LOGIN</button>
        </>
    )
}