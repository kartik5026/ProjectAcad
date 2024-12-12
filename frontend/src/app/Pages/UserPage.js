"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function UserPage() {
    useEffect(() => {
        getCourses();
        getEnrolledCourses();

    }, []);
    const router = useRouter();

    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [access,setAccess] = useState();
    async function getCourses() {
        const res = await axios.get('https://projectacad.onrender.com/user/getCourses', {withCredentials:true});
        if(res.data=='Access Denied'){
            setAccess(res.data)
           }
           else if(res.data=='Login first'){
             setAccess(res.data)
           }
             console.log(res.data);
             setCourses(res.data);
        setCourses(res.data);
    }

    async function handleEnroll(id) {
        const name = localStorage.getItem('user');
        
        
        if (enrolledCourses.includes(id)) {
            alert('You are already enrolled in this course!');
            return;
        }
        const res = await axios.post('https://projectacad.onrender.com/enroll', { name, id });
        if (res.data === 'Enrolled') {
            alert('Enrolled');

        }
        await getEnrolledCourses();
        console.log(enrolledCourses);
    }
    async function getEnrolledCourses() {
        const name = localStorage.getItem('user');
        console.log(name);


        try {
            const res = await axios.post('https://projectacad.onrender.com/getUserEnrollments', { name });
            console.log(res.data);
            setEnrolledCourses(res.data);  // Store the enrolled courses in state
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
        }
    }

    if(access=='Access Denied'){
        return(
          <div>Access Denied</div>
        )
      }
      if(access =='Login first'){
        return(
          <div>Login First</div>
        )
      }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">Available Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <div key={index} className="bg-gray-100 border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold text-teal-500 mb-3"> {course.title}</h2>
                        <p className="text-gray-800 mb-2">Description: {course.description}</p>
                        <p className="text-gray-800 mb-2">Duration: {course.duration}</p>
                        <p className="text-gray-800 mb-4">Instructor: {course.instructor}</p>
                        <button
                            className={`w-full py-2 rounded-lg ${enrolledCourses.includes(course._id) ? 'bg-gray-500 ' : 'bg-teal-500 text-white font-semibold hover:bg-teal-600'} transition-colors duration-300`}
                            onClick={() => handleEnroll(course._id)}>
                            {enrolledCourses.includes(course._id) ? 'Enrolled' : 'Enroll'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserPage;
