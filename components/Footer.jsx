import image from '../src/assets/public.gif'

function Footer() {

    return (
        <>
        <footer className="bg-black h-[10vh] w-full flex items-center justify-between shadow-inner p-4">
        <img src={image} alt="Footer Image" className="h-16 w-16 ml-4" />
        <div className="flex-grow flex items-center justify-end gap-10 mr-4 text-white">
          <h1 className="text-lg font-semibold hover:underline ease-in-out duration-200">
            Privacy Policy
          </h1>
          <h1 className="text-lg font-semibold hover:underline ease-in-out duration-200">
            Terms of Service
          </h1>
          <h1 className="text-lg font-semibold hover:underline ease-in-out duration-200">
            Contact Us
          </h1>
        </div>
      </footer>
        </>
    )
}

export default Footer;