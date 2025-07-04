import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

// Define types for links
interface FooterLink {
  name: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks: FooterLink[] = [
  { name: 'Twitter', href: 'https://twitter.com' },
  { name: 'GitHub', href: 'https://github.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-serif italic text-[#6b6f6f]">
          Debate<span className="text-white text-[33px]">Quiest</span>
        </h1>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Icons Section */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label={social.name}
            >
              {social.name === 'Twitter' && <FaTwitter size={24} />}
              {social.name === 'GitHub' && <FaGithub size={24} />}
              {social.name === 'LinkedIn' && <FaLinkedin size={24} />}
            </a>
          ))}
              </div>
              <hr />

        {/* Copyright Section */}
        <div className="text-center text-gray-400 text-xl mt-5">
          <p>
            &copy; {new Date().getFullYear()} Debitquiest. Made with{' '}
            <FaHeart className="inline text-red-500" /> by Aryansh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;