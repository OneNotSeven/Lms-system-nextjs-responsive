import "@/app/global.css"
import NextTopLoader from "nextjs-toploader"

export const metadata = {
  title: 'Edit courses',
  description: 'edit details of courses',
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
        {children}</body>
    </html>
  )
}
