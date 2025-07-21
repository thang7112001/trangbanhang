import {useEffect, useState} from "react";
import axios from "axios";
import './giaodienstudentlist.css'
import {Link, useNavigate} from "react-router-dom";


export default function StudentList() {
    const [studentList, setStudentList] = useState([]);
    let navigate = useNavigate();

    function loadStudentList() {
        axios.get('http://localhost:8888/students/').then(response => {
            let list = response.data;
            setStudentList(list);
        })
    }

    function delStudent(id) {
        axios.delete('http://localhost:8888/students/' + id).then(() => {
            loadStudentList()
        })
    }

    useEffect(() => {
        loadStudentList()
    }, []);

    return (
        <>
            <div className={'tableStudent'}>
                <table>
                    <tbody>
                    <tr>
                        <td>Họ Và Tên</td>
                        <td>Lớp</td>
                        <td>GPA</td>
                    </tr>
                    {studentList.map((student, index) => (
                        <tr>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.gpa}</td>
                            <td>
                                <button onClick={() => {
                                    delStudent(student.id)
                                }}>Xoa
                                </button>
                                <button><Link to={`/view-student/${student.id}`}>View</Link></button>
                                <button onClick={() => {
                                    navigate(`/edit-student/${student.id}`);
                                }}>Edit</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to={'/addStudent'}>Thêm mới +</Link>
            </div>
        </>
    )
}