import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Github,
  Heart,
  Mail
} from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/isumenuka",
      label: "GitHub",
      color: "hover:text-[#2ea44f]"
    },
    {
      icon: <Youtube size={20} />,
      href: "https://www.youtube.com/@ezsummextra",
      label: "YouTube",
      color: "hover:text-[#ff0000]"
    },
    {
      icon: <Twitter size={20} />,
      href: "https://x.com/ezsumm",
      label: "Twitter",
      color: "hover:text-[#1DA1F2]"
    },
    {
      icon: <Facebook size={20} />,
      href: "https://www.facebook.com/ezsumm",
      label: "Facebook",
      color: "hover:text-[#4267B2]"
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/ezsumm/",
      label: "Instagram",
      color: "hover:text-[#E4405F]"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/isuma/",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]"
    }
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-8 md:py-12">
      <div className="max-w-[2000px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center justify-between">
          {/* Company Info */}
          <div className="space-y-4 max-w-md">
            <h3 className="text-white text-xl font-semibold mb-4 relative inline-block">
              ezsumm (isumenuka)
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Let's Dream Out Of The Box...
            </p>
            <div className="flex items-center gap-2 text-white/70">
              <Mail size={16} />
              <a href="mailto:contact@ezsum.com" className="text-sm hover:text-white transition-colors">
                isumenuka@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 w-full md:w-auto">
            <h3 className="text-white text-xl font-semibold mb-4 relative inline-block">
              Connect
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></span>
            </h3>
            <div className="grid grid-cols-6 md:grid-cols-3 gap-4 md:gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 hover:scale-110 ${social.color} transition-all duration-300 group`}
                  aria-label={social.label}
                >
                  <div className="relative">
                    {social.icon}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center sm:text-left">
              © 2025 ezsumm. All rights reserved.
            </p>
            <div className="flex items-center gap-2 group">
              <span className="text-white/70 text-sm">Crafted with</span>
              <Heart 
                className="text-red-500 group-hover:animate-ping" 
                size={16} 
                fill="currentColor"
              />
              <span className="text-white/70 text-sm">by ezsumm</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}