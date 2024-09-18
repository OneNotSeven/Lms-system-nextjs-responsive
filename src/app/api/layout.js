import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'Quest Castle',
  description: 'Online learning platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextTopLoader
            color="#fa1238"
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
          />
      <body>{children}</body>
    </html>
  )
}
