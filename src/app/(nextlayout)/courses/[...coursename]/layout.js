import React from "react"
import "@/app/global.css"
import Navbar from "@/app/_Components/Navbar"
import NextTopLoader from "nextjs-toploader"

export const metadata = {
    title: 'courses',
    description: 'courses videos',
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
          <Navbar/>
          <div style={{background:'linear-gradient(140deg, #d357e414, #c75fd529)'}} className="flex">


            {children}
          </div>
        </body>
      </html>
    )
  }
  