import { Inter } from "next/font/google";
import Sidebar from "../_Components/Sidebar";
import Navbar from "../_Components/Navbar";
import '@/app/global.css'
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Student Dashboard",
  description: "student dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className=" contain-content box-border">
      <NextTopLoader
            color="#d42eeb"
            crawlSpeed={200}
            height={2}
            crawl={true}
            
            easing="ease"
          />
      <Navbar/>
        <div className="flex">
        <Sidebar/>
        {children} 
</div>
      
      
      </body>
    </html>
  );
}
