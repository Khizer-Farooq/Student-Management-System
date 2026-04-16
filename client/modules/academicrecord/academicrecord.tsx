"use client";
import React from "react";

export default function AcademicRecord() {
    return (
        <div className="md:ml-64">
          <h1 className="text-2xl font-bold ml-10 mt-6">Academic Record</h1>
            <div className="bg-white rounded-lg shadow m-10 p-4">

                <h2 className="text-xl font-semibold mb-2">GPA: 3.8</h2>
                <h2 className="text-xl font-semibold mb-2">Completed Credits: 90</h2>
                <h2 className="text-xl font-semibold mb-2">Current Semester: Fall 2026</h2>

                <h3 className="text-lg font-semibold mt-4 mb-2">Course History</h3>
                <table className="w-full text-left min-w-100 text-xs sm:text-sm">
                    <thead>
                        <tr>
                            <th className="border-b p-1 sm:p-2">Course Code</th>
                            <th className="border-b p-1 sm:p-2">Course Title</th>
                            <th className="border-b p-1 sm:p-2">Grade</th>
                            <th className="border-b p-1 sm:p-2">Semester</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b p-1 sm:p-2">CS101</td>
                            <td className="border-b p-1 sm:p-2">Introduction to Computer Science</td>
                            <td className="border-b p-1 sm:p-2">A</td>
                            <td className="border-b p-1 sm:p-2">Fall 2025</td>
                        </tr>
                        <tr>
                            <td className="border-b p-1 sm:p-2">MATH201</td>
                            <td className="border-b p-1 sm:p-2">Calculus II</td>
                            <td className="border-b p-1 sm:p-2">A-</td>
                            <td className="border-b p-1 sm:p-2">Spring 2026</td>
                        </tr>
                        <tr>
                            <td className="border-b p-1 sm:p-2">ENG150</td>
                            <td className="border-b p-1 sm:p-2">English Literature</td>
                            <td className="border-b p-1 sm:p-2">B+</td>
                            <td className="border-b p-1 sm:p-2">Fall 2025</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );


}