"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { appBaseUrl } from '@/schema/appurl';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const verifyResponse = await fetch(`${appBaseUrl}/api/tokengetter`, {
          method: "POST"
        });
        const responseVerify = await verifyResponse.json();
        if (responseVerify.success) {
          const userInfo = await fetch(`${appBaseUrl}/api/editprofile`, {
            method: "POST",
            body: JSON.stringify({ profileId: responseVerify.verifytoken.userid })
          });
          const userRes = await userInfo.json();
          if (userRes.success) {
            setUserDetails({
              name: userRes.message[0].name,
              email: userRes.message[0].email
            });
          }
        }
      } catch {
        console.log("error");
      }
    }
    fetchUser();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const newPath = `/search/search?query=${encodeURIComponent(searchText.trim())}`;
      console.log(`Navigating to: ${newPath}`);
      router.push(newPath);
    }
  };

  const handleSubmit = (searchText) => {
    if (searchText.trim()) {
      const newPath = `/search/search?query=${encodeURIComponent(searchText.trim())}`;
      console.log(`Navigating to: ${newPath}`);
      router.push(newPath);
    }
  };

  const handleSignOut = async () => {
    try {
      // Implement the actual sign-out functionality here
      await fetch(`${appBaseUrl}/api/logout`, {
        method: 'POST',
      });
      router.push('/login'); 
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div>
      <nav className="top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-[Poppins]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full sm:w-full justify-between rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-[#c649d7] dark:text-white">Quest Castle</span>
              </Link>
              <div className='flex gap-1'>
                <form onSubmit={handleSearchSubmit} className="relative w-96 md:block">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input
                    type="text"
                    id="search-navbar"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="w-full p-2 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Search..."
                  />
                </form>
                <button
                  onClick={() => { handleSubmit(searchText) }}
                  type="submit"
                  style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }}
                  className="text-white pt-0 pb-0 pl-3 rounded-md font-[Poppins] pr-3"
                >
                  Submit
                </button>
              </div>

              <div style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} className='teacher mr-6 pl-3 pr-3 pt-1 pb-1 text-sm font-semibold text-[#fff] font-[Poppins] rounded'>
                <span><a href='/teachers'>Be a Tutor</a></span>
              </div>
            </div>

            <div className="flex relative items-center">
              <div className="flex items-center ms-3 group">
                <div>
                  <div
                    type="button"
                    className="cursor-pointer flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="/profiledummy.png" alt="user photo" />
                  </div>
                </div>
                <div className="z-50 hidden absolute top-4 right-0 group-hover:block my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">{userDetails.name}</p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">{userDetails.email}</p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link href="/stdashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</Link>
                    </li>
                    <li>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowSignOutModal(true)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign Out Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Sign Out</h2>
            <p className="mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
