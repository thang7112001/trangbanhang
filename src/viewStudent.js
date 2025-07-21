import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DetailStudent() {
    let {id} = useParams();
    let navigate = useNavigate()
    let [student, setStudent] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8888/students/' + id).then(res => {
            setStudent(res.data);
        })
    }, []);
    return (
        <>
            {student && <>Student {id}:{student.name},{student['class']},{student.gpa}</>}
            <button onClick={()=>{
                navigate('/');
            }}>Back</button>
        </>
    )
}