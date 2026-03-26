import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/screener', label: 'Resume Screener' },
    { path: '/cover-letter', label: 'Cover Letter' },
    { path: '/history', label: 'History' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/screener" className="text-lg font-bold text-blue-600">
          ResumeAI
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User + logout */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}