import image from './assets/public.gif'
function App() {

  return (
    <>
      <div className="bg-white h-[10vh] w-full flex items-center justify-start shadow-lg gap-10">
      <img src={image} alt="Image" className="h-16 w-16 ml-4" />
      <div className="flex-grow flex items-center justify-end gap-10 mr-4">
        <h1 className="text-lg font-semibold text-gray-950 hover:underline ease-in-out duration-200">
          Take Test
        </h1>
        <h1 className="text-lg font-semibold text-gray-950 hover:underline ease-in-out duration-200">
          Create Test
        </h1>
        <h1 className="text-lg font-semibold text-gray-950 hover:underline ease-in-out duration-200">
          Results
        </h1>
        <button className="bg-black text-white p-2 px-4 text-xl font-semibold rounded-md">
          Login
        </button>
      </div>
    </div>
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

export default App
