import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Activity, FileText, Upload, HelpCircle, MessageSquare } from 'lucide-react'; // Added MessageSquare icon

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { path: '/symptoms', name: 'Symptoms Analysis', icon: <Activity size={20} /> },
    { path: '/features', name: 'Our Features', icon: <FileText size={20} /> },
    { path: '/image-analysis', name: 'Image Analysis', icon: <Upload size={20} /> },
    { path: '/chatbot', name: 'Chatbot', icon: <MessageSquare size={20} /> }, 
    { path: '/faq', name: 'FAQ', icon: <HelpCircle size={20} /> },
  ];

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <Activity className="h-8 w-8 text-teal-600" />
          <span className="ml-2 text-xl font-bold text-teal-600">heal.ai</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition duration-300 ${
                  isActive
                    ? 'bg-teal-50 text-teal-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-1.5">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full fade-in">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition duration-300 ${
                    isActive
                      ? 'bg-teal-50 text-teal-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-2">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
