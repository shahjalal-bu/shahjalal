"use client"
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaHeart } from 'react-icons/fa';
import { BsArrowUp } from 'react-icons/bs';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/shahjalal-bu', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/shahjalal-bu', label: 'LinkedIn' },
    { icon: FaFacebook, href: 'https://fb.com/shahjalal.bu', label: 'Facebook' },
    { icon: FaEnvelope, href: 'mailto:mdshahjalal.bu@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-background/50 border-t border-border mt-20">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-4 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg glow-blue hover:glow-violet transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <BsArrowUp size={20} />
      </button>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-primary">Md Shahjalal</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full Stack Developer passionate about building scalable web applications and sharing knowledge through code.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gradient-glow border border-border hover:border-blue-500/50 transition-all duration-300 hover:glow-card hover:-translate-y-1 text-foreground hover:text-blue-500"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gradient-secondary">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-blue-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gradient-secondary">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Backend Development</li>
              <li>• API Design & Development</li>
              <li>• Database Architecture</li>
              <li>• Cloud Deployment (AWS)</li>
              <li>• Full Stack Solutions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gradient-secondary">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>South Banasree, Dhaka</p>
              <p>Bangladesh</p>
              <a href="tel:+8801835343686" className="block hover:text-blue-500 transition-colors">
                +880 1835 343686
              </a>
              <a href="mailto:mdshahjalal.bu@gmail.com" className="block hover:text-blue-500 transition-colors">
                mdshahjalal.bu@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              © {currentYear} Md Shahjalal. Made with <FaHeart className="text-red-500" /> using Next.js
            </p>
            <div className="flex gap-6">
              <Link href="/blog" className="hover:text-blue-500 transition-colors">
                Blog
              </Link>
              <Link href="#contact" className="hover:text-blue-500 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
