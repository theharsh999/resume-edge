import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Builder', path: '/builder' },
    { name: 'Templates', path: '/templates' },
  ];

  const activeStyle = "text-primary font-semibold text-sm transition-colors duration-200";
  const inactiveStyle = "text-muted hover:text-text text-sm transition-colors duration-200";

  return (
    <nav className="border-b border-slate-900 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-text shadow-premium-glow group-hover:scale-105 transition-transform duration-200">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-text">
              Resume<span className="text-primary-light">Edge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link to="/builder">
              <Button size="sm">Start Building</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted hover:bg-slate-800 hover:text-text focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-background/95 backdrop-blur-lg">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-base font-medium rounded-md px-3 ${
                    isActive ? 'bg-slate-800 text-primary' : 'text-muted hover:bg-slate-800/50 hover:text-text'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 px-3">
              <Link to="/builder" onClick={() => setIsOpen(false)}>
                <Button className="w-full" size="md">
                  Start Building
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
