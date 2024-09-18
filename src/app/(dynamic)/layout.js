import "@/app/global.css"
import Navbar from "../_Components/Navbar"
import NextTopLoader from "nextjs-toploader"

export const metadata = {
  title: 'profile',
  description: 'Quest castle teacher profile',
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
        {children}</body>
    </html>
  )
}
