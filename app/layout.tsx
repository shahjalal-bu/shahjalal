import './globals.css'
import { Grand_Hotel, Lato, Luckiest_Guy } from "next/font/google";

const lato = Lato({
  weight: ["300", "400", "900", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const grandHotel = Grand_Hotel({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-grand-hotel",
});
const luckiestGuy = Luckiest_Guy({
  weight: [ "400"],
  subsets: ["latin"],
  variable: "--font-luckiest-guy"
})
export const metadata = {
  title: 'Shahjalal | Full Stact Web developer | Programmer',
  description: 'I am a web developer with a strong foundation in JavaScript. My passion is to make the web more accessible and open to the world through my code. I am study in Barishal University, Bangladesh. I am eager to find job opportunities that align with my interests and skills.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${grandHotel.variable} ${luckiestGuy.variable}`}>
      <body className={lato.className}>
        <div className='max-w-6xl mx-auto'>
        {children}
        </div>
 
        </body>
    </html>
  )
}
