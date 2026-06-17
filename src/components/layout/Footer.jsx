import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';
import { Container } from '../ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950/20 backdrop-blur-sm mt-auto">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-text group-hover:scale-105 transition-transform duration-200">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-text">
                Resume<span className="text-primary-light">Edge</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-sm">
              Create professional, ATS-optimized resumes that stand out. Accelerate your career growth and get more interviews with our builder.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors duration-200" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors duration-200" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-text">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/builder" className="text-sm text-muted hover:text-text transition-colors duration-200">Resume Builder</Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-muted hover:text-text transition-colors duration-200">Templates</Link>
              </li>
              <li>
                <a href="#features" className="text-sm text-muted hover:text-text transition-colors duration-200">ATS Optimizer</a>
              </li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-text font-medium">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="text-sm text-muted hover:text-text transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#privacy" className="text-sm text-muted hover:text-text transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="text-sm text-muted hover:text-text transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted">
          <p>&copy; {currentYear} ResumeEdge. All rights reserved.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Crafted for job seekers worldwide.
          </p>
        </div>
      </Container>
    </footer>
  );
}
