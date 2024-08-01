import { Link } from 'react-router-dom';
import image from '../assets/public.gif'

function Header() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }
    return(
        <div className="bg-[#014751] h-[10vh] w-full flex items-center justify-start shadow-lg gap-10 p-4">
        <Link to={'/'}><img src={image} alt="Image" className="h-16 w-16 ml-4" /></Link>
        <div className="flex-grow flex items-center justify-end gap-10 mr-4 p-4">
          <Link to={'/tests'} className="text-lg font-semibold text-white hover:underline ease-in-out cursor-pointer duration-200">
            Take Test
          </Link >
          <Link to={'/createtest'} className="text-lg font-semibold text-white hover:underline underline-[#014751] cursor-pointer ease-in-out duration-200">
            Create Test
          </Link >
          <Link to={'/results'}  className="text-lg font-semibold text-white hover:underline cursor-pointer ease-in-out duration-200">
            Results
          </Link >
          {
            isLoggedIn ? (
              <button onClick={handleLogout} className="bg-[#014751] border-2 border-[#60d0e2] cursor-pointer text-white p-2 px-4 text-xl font-semibold rounded-md">
                Logout
              </button>
            ) : (
              <Link to={'/login'} className="bg-[#014751] border-2 border-[#60d0e2] cursor-pointer text-white p-2 px-4 text-xl font-semibold rounded-md">
                Login
              </Link>
            )
          }
        </div>
      </div>
    )
}

export default Header;