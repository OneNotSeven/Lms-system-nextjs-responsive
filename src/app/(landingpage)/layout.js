import { Inter } from "next/font/google";

import '@/app/global.css'
import LandpageNavbar from "../_Components/LandpageNavbar";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quest Castle",
  description: "Online learning and streaming platform | watch courses and learn from teacher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className=" box-border">
      <NextTopLoader
            color="#d42eeb"
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
          />
     
        <div className="w-full h-full overflow-x-hidden">
           <LandpageNavbar/>  
        {children} 
</div>
      
      
      </body>
    </html>
  );
}
