import { Link } from 'react-router-dom'
import error from '../assets/error.svg'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="text-center max-w-md p-6 bg-white rounded-2xl shadow-2xl transform transition duration-700 hover:scale-105 hover:shadow-blue-200 animate-fade-in">
        <img
          src={error}
          alt="error"
          className="w-60 mx-auto mb-6 animate-bounce-slow"
        />
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to={"/"} className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 hover:-translate-y-1">
          <button>Go back home</button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
