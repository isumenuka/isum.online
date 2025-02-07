import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the email body with proper line breaks
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `.trim();

    // Create the mailto link with proper encoding
    const mailtoLink = `mailto:isumenuka@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Create and click a temporary link
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Reset form after submission
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl blur-xl" />
        
        <div className="relative bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-8">
            <Mail className="text-white/80 w-6 h-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Get in Touch</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-white/30 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-white/30 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-white/30 transition-all duration-300"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-white/30 transition-all duration-300 resize-none"
                placeholder="Your message here..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
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