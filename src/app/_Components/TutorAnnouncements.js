"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { appBaseUrl } from '@/schema/appurl';

const TutorAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const jwtVerify = async () => {
            try {
                const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                    method: "POST"
                }).then(res => res.json());

                if (responseVerify.success==true) {
                    setUserId(responseVerify.verifytoken.userid);
                }
            } catch (error) {
                // console.error("Error verifying token:", error);
            }
        };

        jwtVerify();
    }, []);

    // Fetch announcements when userId is available
    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`${appBaseUrl}/api/tutorannouncements`, {
                    params: { userId }
                });
                setAnnouncements(response.data.data.Announcements || []);
            } catch (err) {
                setError('Failed to load announcements.');
            }
        };
        fetchAnnouncements();
    }, [userId]);

    // Handle adding a new announcement
    const handleAddAnnouncement = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`${appBaseUrl}/api/tutorannouncements`, { userId, message: newAnnouncement });
            setAnnouncements([...response.data.data.Announcements]);
            setNewAnnouncement('');
            console.log("ann",response)
            setSuccess('Announcement added successfully!');
        } catch (err) {
            setError('Failed to add announcement.');
        } finally {
            setLoading(false);
        }
    };

    // Handle deleting an announcement
    const handleDeleteAnnouncement = async (id) => {
        try {
            await axios.delete(`${appBaseUrl}/api/tutorannouncements`, {
                data: { userId, id }
            });
            setAnnouncements(prev => prev.filter(ann => ann._id !== id ));
            setSuccess('Announcement deleted successfully!');
        } catch (err) {
            setError('Failed to delete announcement.');
        }
    };

    // Open modal with selected announcement details
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedAnnouncement(null);
    };

    return (
        <div className="max-w-2xl w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#d42eeb] flex gap-4 items-center mb-4">Notify <san className="font-[Poppins] mt-1 text-xs font-medium">(Notification to your follower)</san></h2>

            {success && <div className="mb-4 p-2 text-green-800 bg-green-100 border border-green-300 rounded">{success}</div>}
            {error && <div className="mb-4 p-2 text-red-800 bg-red-100 border border-red-300 rounded">{error}</div>}

            <form onSubmit={handleAddAnnouncement} className="mb-6">
                <div>
                    <label htmlFor="announcement" className="block text-gray-700 text-sm font-medium">New Notification</label>
                    <textarea
                        id="announcement"
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                        required
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
                    type="submit"
                    disabled={loading}
                    className={`mt-4 w-full p-3 text-white font-semibold rounded-md transition-colors duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'}`}
                >
                    {loading ? 'Sending...' : 'Send Noitification'}
                </button>
            </form>

            <button 
                onClick={openModal}
                className="text-[#b93cc9] hover:text-blue-700 focus:outline-none"
            >
                View Notification
            </button>

            {/* Custom Modal for viewing announcement details */}
            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white w-full h-full p-6 rounded-lg shadow-lg max-w-lg mx-auto relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">Notification Details</h2>
                        {announcements.length > 0 ? (
                            <ul className="space-y-4">
                                {announcements.map((items) => (
                                    <li key={items._id} className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center">
                                        <p className="text-gray-800">{items.description}</p>
                                        <button
                                            onClick={() => handleDeleteAnnouncement(items._id)}
                                            className="text-red-600 hover:text-red-700 focus:outline-none"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No announcements to show.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TutorAnnouncements;
