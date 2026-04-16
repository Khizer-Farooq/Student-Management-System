"use client";
import React, { useState, useEffect } from "react";

type Course = {
  title: string;
  description: string;
  details: string;
};

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const courses: Course[] = [
    {
      title: "AI Engineering 1",
      description: "AI using Python and Machine learning concepts.",
      details:
        "This course covers Python, Machine Learning, and model training and development concepts.",
    },
    {
      title: "Web Development Basics",
      description: "Learn HTML, CSS, and JavaScript.",
      details:
        "This course covers frontend development and responsive design.",
    },
    {
      title: "Data Science 101",
      description: "Introduction to data analysis.",
      details:
        "This course includes Pandas, NumPy, and visualization basics.",
    },
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Initialize filtered courses on mount
  useEffect(() => {
    setFilteredCourses(courses);
  }, []);

  return (
    <div className="md:ml-64">
      <h1 className="text-2xl font-bold ml-10 mt-6 ">Courses</h1>

      <div className="ml-10 mr-10 mt-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ml-10 mr-10">
        
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>

            <button
              onClick={() => setSelectedCourse(course)}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition "
            >
              View Details
            </button>
          </div>
        ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>No courses found matching "{searchQuery}"</p>
          </div>
        )}

      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">

            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold mb-3">
              {selectedCourse.title}
            </h2>

            <h1 className="text-lg font-semibold mb-2">
              Instructor: <span className="text-gray-700">Dr. Smith</span>
            </h1>
            <h1 className="text-lg font-semibold mb-2">
              Schedule: <span className="text-gray-700">Mon & Wed 10:00 AM - 11:30 AM</span>
            </h1>
            <h1 className="text-lg font-semibold mb-2">
              Credits: <span className="text-gray-700">3</span>
            </h1>
            <h1 className="text-lg font-semibold mb-2">
              Start Date: <span className="text-gray-700">2/03/26</span>
            </h1>

            <p className="text-gray-600 text-sm">
              {selectedCourse.details}
            </p>

            <button
              onClick={() => setSelectedCourse(null)}
              className="mt-5 w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}