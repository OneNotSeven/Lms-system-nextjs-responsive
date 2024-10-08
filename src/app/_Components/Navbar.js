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
      <nav className="top-0 z-50 w-full bg-white border-b border-gray-200  font-[Poppins]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full sm:w-full justify-between rtl:justify-end">
              <button onClick={() => {
                const side = document.querySelector("#logo-sidebar")
                side.classList.toggle("-translate-x-full")
              }}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-[#c649d7] ">Quest Castle</span>
              </Link>
              <div className='flex gap-1'>
                <form onSubmit={handleSearchSubmit} className="relative hidden lg:block w-96">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input
                    type="text"
                    id="search-navbar"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="w-full p-2 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 focus:outline-none"
                    placeholder="Search..."
                  />
                </form>
                <button
                  onClick={() => { handleSubmit(searchText) }}
                  type="submit"
                  style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }}
                  className="text-white pt-0 pb-0 pl-3 hidden lg:block rounded-md font-[Poppins] pr-3"
                >
                  Submit
                </button>
              </div>
              <div className='flex'>
                
              <div style={{ background: 'linear-gradient(110deg, #e278ef, #ffa2f2)' }} className='teacher justify-center items-center  mr-6 pl-3 pr-3 pt-1 pb-1 text-sm font-semibold text-[#fff] font-[Poppins] hidden sm:flex rounded'>
                <span><a href='/teachers'>Be a Tutor</a></span>
              </div>
              <Link href="/teachers">
              
              <svg className="w-6 h-6 text-[#d42eeb] block sm:hidden " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
              </Link>

            <div className="flex relative items-center">
              <div className="flex items-center ms-3 group">
                <div>
                  <div
                    type="button"
                    className="cursor-pointer flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="/profiledummy.png" alt="user photo" />
                  </div>
                </div>
                <div className="z-50 hidden absolute top-4 right-0 group-hover:block my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 " role="none">{userDetails.name}</p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">{userDetails.email}</p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link href="/stdashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</Link>
                    </li>
                    <li>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowSignOutModal(true)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
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
          </div>
        </div>
        <form onSubmit={handleSearchSubmit} className="relative block lg:hidden w-full p-1">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input
                    type="text"
                    id="search-navbar"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="w-full p-2 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    placeholder="Search..."
                  />
                </form>
      </nav>

      {/* Sign Out Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white  p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Sign Out</h2>
            <p className="mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
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
