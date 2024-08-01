import image from '../assets/home.webp'
import HomeLayout from '../Layouts/HomeLayout'
function Home() {
    return (
            <HomeLayout>
                <div className="flex items-center justify-between bg-[#014751]">
                    <div className='w-auto flex items-center mt-[-30px]'>
                        <div className='flex flex-col items-center justify-center ml-7 mt-[-90px]'>
                            <h1 className='text-[#aae5ee] text-wrap text-5xl font-bold'>Turn your <span className='text-white'>tests</span> <br /> into success stories</h1>
                            <h1 className='text-xl text-white text-wrap ml-36 mt-2 font-semibold'>AI-powered skills and knowledge assessment software, serving 2.5M+ business and educational users worldwide.</h1>
                        </div>
                    </div>
                    <img src={image} alt="HomeImage" className="h-[90vh] w-1/2"/>
                </div>
            </HomeLayout>
    )
}

export default Home;