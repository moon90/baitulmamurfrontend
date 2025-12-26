'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const res = await fetch('/api/contact', { // Assuming /api/contact endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setResponseMessage(t('Your message has been sent successfully!'));
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setStatus('error');
        setResponseMessage(data.msg || t('Failed to send your message. Please try again.'));
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMessage(t('An unexpected error occurred. Please try again later.'));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">{t('Contact Us')}</h2>
      <p className="text-center text-neutral-dark mb-8">{t('We would love to hear from you. Please fill out the form below.')}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-neutral-dark text-sm font-bold mb-2">
            {t('Name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-neutral-dark text-sm font-bold mb-2">
            {t('Email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-neutral-dark text-sm font-bold mb-2">
            {t('Subject')}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-neutral-dark text-sm font-bold mb-2">
            {t('Message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline resize-none focus:border-primary"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? t('Sending...') : t('Send Message')}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded-md text-center">
          {responseMessage}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-center">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
