"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { appBaseUrl } from '@/schema/appurl';

const AddEventForm = () => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState(''); // New state for location
    const [eventCategory, setEventCategory] = useState(''); // New state for category
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const jwtVerify = async () => {
            try {
                const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                    method: "POST"
                }).then(res => res.json());

                if (responseVerify.success) {
                    setUserId(responseVerify.verifytoken.userid);
                    fetchEvents(responseVerify.verifytoken.userid);
                }
            } catch (error) {
                // console.error("Error verifying token:", error);
            }
        };

        jwtVerify();
    }, []);

    const fetchEvents = async (userId) => {
        try {
            const response = await axios.get(`${appBaseUrl}/api/events`, {
                params: { userId }
            });
            // console.log("All events", response);
            setEvents([...response.data.data.Events]);
        } catch (error) {
            // console.error("Error fetching events:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.post(`${appBaseUrl}/api/events`, {
                userId,
                title: eventTitle,
                date: eventDate,
                description: eventDescription,
                location: eventLocation, // New field
                category: eventCategory // New field
            });
            setSuccess('Event added successfully!');
            setEventTitle('');
            setEventDate('');
            setEventDescription('');
            setEventLocation('');
            setEventCategory('');
            fetchEvents(userId);
        } catch (err) {
            setError('Failed to add event.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvents = async (id) => {
        try {
            await axios.delete(`${appBaseUrl}/api/events`, {
                data: { userId, id }
            });
            setEvents(prev => prev.filter(event => event._id !== id));
            setSuccess('Event deleted successfully!');
        } catch (err) {
            setError('Failed to delete event.');
        }
    };

    return (
        <div className='w-full font-[Poppins]'>
            <div className="max-w-lg w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-[#d42eeb] mb-4">Add New Event</h2>
                {success && <div className="mb-4 p-2 text-green-800 bg-green-100 border border-green-300 rounded">{success}</div>}
                {error && <div className="mb-4 p-2 text-red-800 bg-red-100 border border-red-300 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-sm font-medium">Event Title</label>
                        <input
                            type="text"
                            id="title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-gray-700 text-sm font-medium">Event Date</label>
                        <input
                            type="date"
                            id="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-medium">Event Description</label>
                        <textarea
                            id="description"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-gray-700 text-sm font-medium">Event Location</label>
                        <input
                            type="text"
                            id="location"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-700 text-sm font-medium">Event Category</label>
                        <input
                            type="text"
                            id="category"
                            value={eventCategory}
                            onChange={(e) => setEventCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white font-semibold rounded-md transition-colors duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'}`}
                    >
                        {loading ? 'Adding...' : 'Add Event'}
                    </button>
                    <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}}
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full mt-4 p-3 text-white font-semibold rounded-md bg-green-600 hover:bg-green-700"
                    >
                        View Events
                    </button>
                </form>
            </div>

            {/* Modal for viewing events */}
            {isModalOpen && (
                <div
                    className="fixed p-3 inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4">Your Events</h2>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <ul className="space-y-2">
                            {events.length === 0 ? (
                                <li>No events found.</li>
                            ) : (
                                events.map(event => (
                                    <li key={event._id} className="border border-gray-300 text-[12px] sm:text-[16px] p-3 rounded-md">
                                        <h4 className="font-semibold">{event.title}</h4>
                                        <p>{event.date}</p>
                                        <p>{event.description}</p>
                                        {event.location && <p><strong>Location:</strong> {event.location}</p>}
                                        {event.category && <p><strong>Category:</strong> {event.category}</p>}
                                        <button 
                                            onClick={() => handleDeleteEvents(event._id)}
                                            className="mt-2 text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddEventForm;
