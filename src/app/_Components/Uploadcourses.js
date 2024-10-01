"use client";
import { appBaseUrl } from '@/schema/appurl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Uploadcourses = () => {
    const [courseResult, setCourseResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loader, setloader] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, { method: 'POST' });
                const { verifytoken } = await responseVerify.json();
                const userid = verifytoken.userid;

                const courseRes = await fetch(`${appBaseUrl}/api/gettutor`, {
                    method: 'POST',
                    body: JSON.stringify({ userId: userid }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await courseRes.json();
                if (data.success==true) {
                    setCourseResult(data.message);
                    setFilteredCourses(data.message); // Initialize filtered courses
                }
            } catch (error) {
                // console.error("Error fetching courses:", error);
                toast.error("Error fetching courses.");
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        // Filter courses based on search query
        const filtered = courseResult.filter(course =>
            course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(filtered);
        setCurrentPage(1); // Reset to first page on search query change
    }, [searchQuery, courseResult]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const deleteCourse = async () => {
        try {
            setloader(true)
            const response = await fetch(`${appBaseUrl}/api/editcourse`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId: courseToDelete }),
            });
            const delres = await response.json();
            if (delres.success == true) {
                setloader(false)
                setCourseResult(courseResult.filter(course => course.courseId !== courseToDelete));
                setFilteredCourses(filteredCourses.filter(course => course.courseId !== courseToDelete));
                toast.success("Course deleted successfully.");
            } else {
                toast.error("Failed to delete course.");
            }
        } catch (error) {
            // console.error("Error deleting course:", error);
            toast.error("Error deleting course.");
        } finally {
            setloader(false)
            setIsModalOpen(false);
        }
    };

    return (
        <div className='w-full h-screen p-2 md:p-8'>
            <div className='relative'>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="searching bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <Link href="/teachers/uploadcourse">
                            <button style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} type="button" className="text-white flex items-center gap-2   focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Upload course
                                <span>
                                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                                    </svg>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-[poppins]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} className="text-xs text-white uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Course name</th>
                                <th scope="col" className="px-6 py-3">Course Description</th>
                                <th scope="col" className="px-6 py-3">Tutor</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Add</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.courseId} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.courseName}
                                    </th>
                                    <td className="px-4 py-3 max-w-[12rem] truncate">{item.courseDesc}</td>
                                    <td className="px-6 py-4">
                                        {item.tutorName}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {item.price}
                                    </td>
                                    <td className="py-4">
                                        <span style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} className=' w-24 p-1 flex items-center justify-center gap-1 text-white rounded-2xl'>
                                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
</svg>

                                            success</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/addchapters/${item.courseId}`} className="font-medium text-blue-600 hover:underline">
                                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                            </svg>
                                            <span className='sr-only'>Edit</span>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <div className='flex gap-1 items-center'>
                                        <svg class="w-4 h-4 text-blue-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
</svg>

                                        <Link href={`/editcourse/${item.courseId}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                        </div>
                                        <div className='flex items-center gap-1 rounded-e-md'>
                                        <svg class="w-4 h-4 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>

                                        <button
                                            onClick={() => { setCourseToDelete(item.courseId); setIsModalOpen(true); }}
                                                className='text-red-500 hover:text-red-700'
                                                
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span className="font-semibold text-gray-900">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCourses.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span>
                        </span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Modal for delete confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-4">Are you sure you want to delete this course?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setCourseToDelete(null);
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { deleteCourse() }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                {loader ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Uploadcourses;
