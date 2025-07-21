import {useState} from "react";
import axios from "axios";
import './studentList';
import {useNavigate} from "react-router-dom";

export default function AddStudent() {
    const [newStudent, setNewStudent] = useState({
        name: '',
        class: '',
        gpa: 0,
        grade: []
    });
    let navigate = useNavigate()

    function addStudent() {
        axios.post('http://localhost:8888/students/', newStudent).then(response => {
            navigate('/');
        })
    }

    function handleAddOnchange(e) {
        setNewStudent({...newStudent, [e.target.name]: e.target.value});
    }

    return (
        <>
            <input type="text"
                   placeholder={'nhap ten'}
                   value={newStudent.name}
                   name={'name'}
                   onChange={handleAddOnchange}
            />
            <input type="text"
                   placeholder={'nhap lop'}
                   value={newStudent['class']}
                   name={'class'}
                   onChange={handleAddOnchange}
            />
            <input type="text"
                   placeholder={'nhap gpa'}
                   value={newStudent.gpa}
                   name={'gpa'}
                   onChange={handleAddOnchange}
            />
            <button onClick={() => {
                addStudent();
            }}>Thêm
            </button>
        </>
    )
}