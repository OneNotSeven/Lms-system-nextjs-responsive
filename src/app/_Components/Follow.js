"use client"
import { appBaseUrl } from '@/schema/appurl'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

// Define a fetcher function for use with SWR
const fetcher = (url) => fetch(url).then(res => res.json())

const Follow = ({ teacherid }) => {
    const [userid, setUserId] = useState(null)
    const [followState, setFollowState] = useState(null)

    useEffect(() => {
        const jwtVerify = async () => {
            try {
                const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                    method: "POST"
                }).then(res => res.json())

                if (responseVerify.success==true) {
                    setUserId(responseVerify.verifytoken.userid)
                }
            } catch (error) {
                // console.error("Error verifying token:", error)
            }
        }

        jwtVerify()
    }, [])

    // Use SWR for fetching follow state
    const { data, error } = useSWR(
        userid && teacherid ? `${appBaseUrl}/api/follow/${userid}/${teacherid}` : null,
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    useEffect(() => {
        // console.log("follow state",data)
        if (data) {
            setFollowState(data.followed)
        }
    }, [data])

    const followed = async () => {
        if (userid) {
            const text = document.querySelector(".follow")
            if (text) {
                text.innerHTML = text.innerHTML== "Follow" ? "Following" : "Follow"
            }

            try {
                const response = await fetch(`${appBaseUrl}/api/follow`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ profileId: userid, teacherid: teacherid })
                }).then(res => res.json())

                if (response.followed) {
                    setFollowState(true)
                } else {
                    setFollowState(false)
                }
            } catch (error) {
                console.error("Error updating follow state:", error)
            }
        }
    }

    return (
        <>
            <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} onClick={() => { followed() }} className='follow text-white w-full h-fit rounded-xl p-1 text-[12px] md:text-[16px]'>
                {followState ? "Following" : "Follow"}
            </button>
        </>
    )
}

export default Follow
