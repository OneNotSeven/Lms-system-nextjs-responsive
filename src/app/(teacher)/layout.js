import React from "react"
import '@/app/global.css'
import Teachersidebar from "../_Components/Teachersidebar"
import Mentor from "../_Components/Mentor"
import NextTopLoader from "nextjs-toploader"

export const metadata = {
    title: 'Teacher Dashboard',
    description: 'teacher dashboard and courses upload',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
        <NextTopLoader
            color="#d42eeb"
            crawlSpeed={200}
            height={2}
            crawl={true}
            
            easing="ease"
          />
               <Mentor/>
          <div className="flex">

<Teachersidebar/>
            {children}
          </div>
        </body>
      </html>
    )
  }
  