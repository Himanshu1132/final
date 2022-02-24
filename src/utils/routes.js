import Home from "../pages/Home";
import StLogin from "../pages/StLogin";
import StSignUp from "../pages/StSignUp";
import StudentDashBoard from "../pages/student/StudentDashBoard";
import TeacherDashboard from "../pages/TeacherDashboard";

export default [
    {
        path:'/',
        exact:true,
        components: () =><Home/>
    },{
        path:'/stlogin',
        components: () =><StLogin/>
    },{
        path:'/stsignup',
        components: () =><StSignUp/>
    },{
        path:'/teacherdashboard',
        components: () => <TeacherDashboard/>
    },{
        path:'/studentdashboard',
        components:()=> <StudentDashBoard/>
    }
]