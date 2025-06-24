import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { sanitizeInput } from '../utils/sanitizeInput';

export function ContactForm() {
  const sectionRef = useScrollAnimation('animate-zoomIn');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const circle = document.createElement('span');
    circle.className = 'ripple';
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    button.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitized = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    const emailBody = `
Name: ${sanitized.name}
Email: ${sanitized.email}

Message:
${sanitized.message}
    `.trim();

    const mailtoLink = `mailto:isumenuka@gmail.com?subject=${encodeURIComponent(sanitized.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-4">
          Get in Touch
        </h2>
        <p className="text-white/70 text-lg">Let's create something amazing together</p>
      </div>

      {/* Main glass container */}
      <div className="relative max-w-3xl mx-auto">
        {/* Outer glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-75" />
        
        {/* Glass container */}
        <div className="relative backdrop-blur-xl rounded-2xl border border-white/10 p-8 sm:p-10"
             style={{
               background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.1), rgba(236, 72, 153, 0.1))',
               boxShadow: '0 8px 32px rgba(31, 41, 55, 0.2)'
             }}>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2 group-hover:text-pink-300 transition-colors duration-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-900/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors duration-300 ease-out hover:border-purple-500/50"
                  placeholder="Your name"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2 group-hover:text-pink-300 transition-colors duration-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-900/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors duration-300 ease-out hover:border-purple-500/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="subject" className="block text-sm font-medium text-purple-300 mb-2 group-hover:text-pink-300 transition-colors duration-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                autoComplete="off"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-900/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors duration-300 ease-out hover:border-purple-500/50"
                placeholder="What's this about?"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-2 group-hover:text-pink-300 transition-colors duration-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-purple-900/10 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors duration-300 ease-out hover:border-purple-500/50 resize-none"
                placeholder="Your message here..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                onClick={createRipple}
                className="ripple-container group relative px-6 py-3 rounded-lg font-medium text-white transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/50 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #9333EA, #EC4899)',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                {/* Button content */}
                <span className="relative flex items-center gap-2">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}