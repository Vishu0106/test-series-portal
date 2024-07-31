import image from '../src/assets/public.gif'

function Header() {
    return(
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
    )
}

export default Header;