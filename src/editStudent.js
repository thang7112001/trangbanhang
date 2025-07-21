import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function EditStudent() {
    let {id} = useParams();
    const [editStudent, setEditStudent] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8888/students/' + id).then(res => {
            setEditStudent(res.data);
        })
    }, []);
    function saveEdit() {
        axios.put('http://localhost:8888/students/' + id, editStudent).then(res => {
            navigate('/');
        })
    }

    function handleEditOnchange(e) {
        setEditStudent({...editStudent, [e.target.name]: e.target.value})
    }

    return (
        <>
            {editStudent && <>
                <input type="text"
                       placeholder={'nhap ten'}
                       value={editStudent.name}
                       name={'name'}
                       onChange={handleEditOnchange}
                />
                <input type="text"
                       placeholder={'nhap lop'}
                       value={editStudent['class']}
                       name={'class'}
                       onChange={handleEditOnchange}
                />
                <input type="text"
                       placeholder={'nhap gpa'}
                       value={editStudent.gpa}
                       name={'gpa'}
                       onChange={handleEditOnchange}
                />
                <button onClick={saveEdit}>Save</button>
            </>
            }
        </>
    )
}