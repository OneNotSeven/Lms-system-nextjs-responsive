"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Page = () => {
  const router=useRouter()
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (window.scrollY > 650) { // Adjust this value based on when you want the change to occur
        navbar.classList.add('bg-gray-900', 'shadow-lg');
      } else {
        navbar.classList.remove('bg-gray-900', 'shadow-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className='w-full h-screen flex justify-center relative overflow-hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2000 1500'
          className='absolute inset-0 w-full h-full'
          preserveAspectRatio='xMidYMid slice'
        >
          <rect fill='#FF89E4' width='100%' height='100%' />
          <defs>
            <radialGradient id='a' gradientUnits='objectBoundingBox'>
              <stop offset='0' stopColor='#FF56D3' />
              <stop offset='1' stopColor='#FF89E4' />
            </radialGradient>
            <linearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'>
              <stop offset='0' stopColor='#ff70dc' />
              <stop offset='1' stopColor='#FF89E4' />
            </linearGradient>
            <path
              id='s'
              fill='url(#b)'
              d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'
            />
            <g id='g'>
              <use href='#s' transform='scale(0.12) rotate(60)' />
              <use href='#s' transform='scale(0.2) rotate(10)' />
              <use href='#s' transform='scale(0.25) rotate(40)' />
              <use href='#s' transform='scale(0.3) rotate(-20)' />
              <use href='#s' transform='scale(0.4) rotate(-30)' />
              <use href='#s' transform='scale(0.5) rotate(20)' />
              <use href='#s' transform='scale(0.6) rotate(60)' />
              <use href='#s' transform='scale(0.7) rotate(10)' />
              <use href='#s' transform='scale(0.835) rotate(-40)' />
              <use href='#s' transform='scale(0.9) rotate(40)' />
              <use href='#s' transform='scale(1.05) rotate(25)' />
              <use href='#s' transform='scale(1.2) rotate(8)' />
              <use href='#s' transform='scale(1.333) rotate(-60)' />
              <use href='#s' transform='scale(1.45) rotate(-30)' />
              <use href='#s' transform='scale(1.6) rotate(10)' />
            </g>
          </defs>
          <g>
            <circle fill='url(#a)' r='3000' />
            <g opacity='0.5'>
              <circle fill='url(#a)' r='2000' />
              <circle fill='url(#a)' r='1800' />
              <circle fill='url(#a)' r='1700' />
              <circle fill='url(#a)' r='1651' />
              <circle fill='url(#a)' r='1450' />
              <circle fill='url(#a)' r='1250' />
              <circle fill='url(#a)' r='1175' />
              <circle fill='url(#a)' r='900' />
              <circle fill='url(#a)' r='750' />
              <circle fill='url(#a)' r='500' />
              <circle fill='url(#a)' r='380' />
              <circle fill='url(#a)' r='250' />
            </g>
            <g>
              <use href='#g' transform='rotate(10)' />
              <use href='#g' transform='rotate(120)' />
              <use href='#g' transform='rotate(240)' />
            </g>
            <circle fillOpacity='0.1' fill='url(#a)' r='3000' />
          </g>
        </svg>


        <div className='flex lg:flex-row flex-col-reverse  absolute top-[96px] items-center justify-center flex-1 p-6 text-center md:flex-row md:justify-between md:text-left'>
          
        
      <div className=' ml-0 lg:ml-28 w-fit font-[Poppins] flex flex-col justify-center gap-8'>
            <div>
<span className='text-[28px] sm:text-[4vw] font-semibold text-white'>Welcome to Quest Castle</span>
            </div>
            <div className=' w-full md:w-[42vw]'>
              <span className=' text-[20px] sm:text-[2.5vw] text-[#80286e]  font-semibold'>Thunder of knowledge,wisdom and prosperity</span>
        </div>
        <div>
          <button onClick={()=>{router.push("/login")}} style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} className='md:text-[1.6vw] border-2 text-[24px] justify-center border-pink-100 w-full lg:w-[90%]   bg-[#f3a3fd] rounded-lg p-3 font-semibold text-white flex gap-2'>GET STARTED

          <svg className="md:w-[vw] md:h-[2vw] w-9 h-9 text-white font-semibold dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
</svg>


          </button>
        </div>
          </div>
          <div className='w-[200px] mr-5 lg:mr-0 lg:w-full order-2' >

         
          
            <Image
              src="/boy.png"
            
                width={500}
              height={500}
              
              className="object-contain hidden lg:block"
              alt="Boy"
            />

<Image
              src="/clip-pics-of-animated-cartoons-8-removebg-preview.png"
            
                width={500}
              height={500}
              
              className="object-contain mix-blend-luminosity lg:hidden"
              alt="Boy"
            />
        
        </div>
</div>
      </div>
      <div>
      <section id='Services' className="w-full py-12 md:py-24 lg:py-32 bg-muted font-[Poppins]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className=" text-primary"><svg class="w-20 h-20 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z" clip-rule="evenodd"/>
</svg>
</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Accelerate Your Learning</h3>
                  <p className="text-muted-foreground">
                    Our platform enables you to learn faster and more efficiently, offering interactive lessons and personalized feedback to enhance your learning experience.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="text-primary"><svg class="w-20 h-20 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M19.003 3A2 2 0 0 1 21 5v2h-2V5.414L17.414 7h-2.828l2-2h-2.172l-2 2H9.586l2-2H9.414l-2 2H3V5a2 2 0 0 1 2-2h14.003ZM3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Zm2-2.414L6.586 5H5v1.586Zm4.553 4.52a1 1 0 0 1 1.047.094l4 3a1 1 0 0 1 0 1.6l-4 3A1 1 0 0 1 9 18v-6a1 1 0 0 1 .553-.894Z" clip-rule="evenodd"/>
</svg>
</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Accessible Anytime, Anywhere</h3>
                  <p className="text-muted-foreground">
                    Learn anytime, anywhere with our platform, designed to be both desktop and mobile-friendly. Available 24/7 to accommodate your busy lifestyle.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="text-primary"><svg class="w-20 h-20 text-[#d42eeb] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
</svg>
</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Earn Recognized Certificates</h3>
                  <p className="text-muted-foreground">
                    Showcase your achievements with industry-recognized certificates upon course completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="About" className="w-full py-12 md:py-24 lg:py-32 font-[Poppins]">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Students Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover what our satisfied students have to say about their experiences with our e-learning platform.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2 rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                    <div className="text-primary"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
</svg>
</div>
                      <div>
                        <div className="text-sm font-medium">John Doe</div>
                        <div className="text-xs text-muted-foreground">Software Engineer</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      The e-learning platform has greatly influenced my learning experience. The courses are interactive, the instructors are highly skilled, and the flexible structure allows me to advance at a pace that fits my personal schedule.
                    </p>
                  </div>
                  <div className="grid gap-2 rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                    <div className="text-primary"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
</svg>
</div>
                      <div>
                        <div className="text-sm font-medium">Jane Smith</div>
                        <div className="text-xs text-muted-foreground">Marketing Manager</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Thanks to the wide range of courses available on this platform, I have been able to enhance my skills 
                      and stay ahead in my field. I highly recommend it to anyone aiming to grow in their career.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2 rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                    <div className="text-primary"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
</svg>
</div>
                      <div>
                        <div className="text-sm font-medium">Sarah Lee</div>
                        <div className="text-xs text-muted-foreground">Graphic Designer</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      The e-learning platform has truly transformed my learning experience. The courses are captivating, 
                      the instructors bring deep expertise, and the flexibility has empowered me to progress at a pace that
                      works best for me.
                    </p>
                  </div>
                  <div className="grid gap-2 rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2">
                    <div className="text-primary"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
</svg>
</div>
                      <div>
                        <div className="text-sm font-medium">Michael Chen</div>
                        <div className="text-xs text-muted-foreground">Data Analyst</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      I have been able to enhance my skills and stay ahead in my field, 
                        thanks to the wide variety of courses available on this platform. I highly recommend it to anyone looking to boost their career development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <form id="contact-form" class="w-full py-12 md:py-24 lg:py-32 font-[Poppins]">
  <div class="container flex justify-center  gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div class="space-y-4">
      <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
      <p class="text-gray-600">
        Please complete the form below, and we will respond to you promptly.
      </p>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" type="text" placeholder="Enter your name" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"/>
          </div>
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" placeholder="Enter your email" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"/>
          </div>
        </div>
        <div class="space-y-2">
          <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
          <input id="subject" type="text" placeholder="Enter the subject" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"/>
        </div>
        <div class="space-y-2">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" placeholder="Enter your message" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm min-h-[150px]"></textarea>
        </div>
        <button style={{background: 'linear-gradient(110deg, #e278ef, #ffa2f2)'}} type="submit" class="w-full px-4 py-2  text-white font-semibold rounded-md shadow-sm">
          Send Message
        </button>
      </div>
            </div>
          </div>
        </form>
        <section>
          

<footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4 font-[Poppins]">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
           
                <span class="self-center text-2xl font-semibold font-[Poppins] whitespace-nowrap text-[#d42eeb] ">Quest Castle</span>
            
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="About" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <span class="hover:underline">Quest Castle</span>. All Rights Reserved.</span>
    </div>
</footer>


        </section>
      </div>
    </>
  )
}

export default Page
