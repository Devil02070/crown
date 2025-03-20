'use client'
import Ballpit from '@/components/ui/Ballpit'
import RollingGallery from '@/components/ui/RollingGallery'
import PixelTransition from '@/components/ui/Pixel';


export default function Body() {
    return (
        <>
            <RollingGallery autoplay={true} pauseOnHover={true} />
            <div className='h-lvh overflow-hidden w-full bg-[#f53256]'>
                <Ballpit
                    count={50}
                    gravity={0.5}
                    friction={1}
                    wallBounce={1}
                    followCursor={false}
                    colors={['#ffffff', '#FF4D6E', '#DF0D3D']}
                />
            </div>
            <section className='fixed w-full top-[100px] py-20 px-5'>
                <div className="container m-auto">
                    <div className="row flex flex-wrap md:flex-nowrap justify-between items-center">
                        <div className="col w-full lg:w-1/2">
                            <h2 className='text-4xl lg:text-8xl font-extrabold text-[#8f0928] mt-5 lg:mt-0'>$CROWN</h2>
                            <h1 className='text-4xl lg:text-8xl font-bold uppercase mt-6 lg:mt-10'>The Meme Coin of Kings!</h1>
                            <p className='pt-10 text-lg md:text-2xl'>Step into the world of Crown, the meme coin built for those who rule the crypto kingdom. Powered by Supra Chain, we bring speed, security, and a community-driven revolution. Are you ready to claim your place in the royal court?</p>
                        </div>
                        <div className="col w-full lg:w-1/2 flex justify-end pt-10 md:pt-0">
                            <PixelTransition
                                firstContent={
                                    <img src="/media/crown.png" alt="$crown" className='h-full w-full object-cover' />
                                }
                                secondContent={
                                    <div className='w-full h-full grid items-center bg-[#DF0D3D]'>
                                        <p className="font-extrabold text-4xl text-white text-center">$CROWN</p>
                                    </div>
                                }
                                gridSize={12}
                                pixelColor='#f53256'
                                animationStepDuration={0.4}
                            // className="custom-pixel-card"
                            />
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}


