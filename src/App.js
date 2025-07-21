
import {Route, Routes} from "react-router-dom";
import StudentList from "./studentList";
import AddStudent from "./addStudent";
import DetailStudent from "./viewStudent";
import EditStudent from "./editStudent";



function App() {
    return (
       <>
           <Routes>
               <Route path={'/'} element={<StudentList/>}/>
               <Route path={'/addStudent'} element={<AddStudent/>}/>
               <Route path={'/view-student/:id'} element={<DetailStudent/>}/>
               <Route path={'/edit-student/:id'} element={<EditStudent/>}/>
           </Routes>
       </>
    );
}

export default App;