import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  useEffect(() => {
    getCourses();
  }, []);
  const [courses, setCourses] = useState([]);
  const [access,setAccess] = useState();
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: ''
  });
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: ''
  });
  const [showForm, setShowForm] = useState(false);


  async function getCourses() {
    const res = await axios.get('https://projectacad.onrender.com/admin/getCourses', {withCredentials:true});
    console.log(res.data);
    
    if(res.data=='Access Denied'){
     setAccess(res.data)
    }
    else if(res.data=='Login first'){
      setAccess(res.data)
    }
      console.log(res.data);
      setCourses(res.data);
    
    
  }

  const handleEditClick = (course) => {
    setEditingCourse(course._id);
    setUpdatedCourse({
      title: course.title,
      description: course.description,
      duration: course.duration,
      instructor: course.instructor
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({ ...updatedCourse, [name]: value });
  };

  const handleSaveClick = async (id) => {
    const updatedCourses = courses.map((course) => {
      if (course._id === id) {
        return { ...course, ...updatedCourse };
      }
      return course;
    });
    setCourses(updatedCourses);
    setEditingCourse(null); // Exit edit mode

    // Update on backend
    const res = await axios.put(`https://projectacad.onrender.com/updateCourse/${id}`, updatedCourse);
    if (res.data === 'Updated') {
      alert('Course updated successfully!');
    }
  };

  async function handleDeleteClick(id){
    const res = await axios.delete(`https://projectacad.onrender.com/deleteCourse/${id}`);
    if(res.data=='Deleted'){
      alert('Course Delted');
    }
  }

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = async () => {
    if (newCourse.title && newCourse.description && newCourse.duration && newCourse.instructor) {
      const newCourseWithId = { ...newCourse, id: courses.length + 1 };
      setCourses([...courses, newCourseWithId]);
      setNewCourse({ title: '', description: '', duration: '', instructor: '' });
      setShowForm(false);

      const res = await axios.post('https://projectacad.onrender.com/addCourse', newCourse);
      if (res.data === 'Added') {
        alert('New course added!');
        getCourses(); // Refresh the courses list
      }
    } else {
      alert('Please fill out all fields before adding the course.');
    }
  };

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
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white p-2 rounded mb-6"
      >
        Add a New Course
      </button>

      {showForm && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add a New Course</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleNewCourseChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Course Title"
            />
            <textarea
              name="description"
              value={newCourse.description}
              onChange={handleNewCourseChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Course Description"
            />
            <input
              type="text"
              name="duration"
              value={newCourse.duration}
              onChange={handleNewCourseChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Course Duration"
            />
            <input
              type="text"
              name="instructor"
              value={newCourse.instructor}
              onChange={handleNewCourseChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Instructor Name"
            />
            <button
              onClick={handleAddCourse}
              className="bg-green-500 text-white p-2 rounded mt-4"
            >
              Add Course
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {courses.map((course,index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-6 w-80 shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
          >
            {editingCourse === course._id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={updatedCourse.title}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  placeholder="Course Title"
                />
                <textarea
                  name="description"
                  value={updatedCourse.description}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  placeholder="Course Description"
                />
                <input
                  type="text"
                  name="duration"
                  value={updatedCourse.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  placeholder="Course Duration"
                />
                <input
                  type="text"
                  name="instructor"
                  value={updatedCourse.instructor}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  placeholder="Instructor Name"
                />
                <button
                  onClick={() => handleSaveClick(course._id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <button
                  onClick={() => handleEditClick(course)}
                  className="bg-green-500 text-white p-2 rounded mt-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(course._id)}
                  className="bg-red-500 text-white p-2 mx-2 rounded mt-4"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
