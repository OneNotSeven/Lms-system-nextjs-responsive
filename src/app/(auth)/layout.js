import "@/app/global.css"
import NextTopLoader from "nextjs-toploader"

export const metadata = {
  title: 'Quest Castle',
  description: 'Authorization page of Quest Castle',
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
