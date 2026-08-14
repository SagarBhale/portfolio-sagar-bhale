import React, { useCallback } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from '../../../hooks/useForm';
import { contact as contactData } from '../../../data/portfolio';
import styles from './Contact.module.css';

const iconMap = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Twitter: TwitterIcon,
};

const initialValues = { name: '', email: '', message: '' };

const validate = (values) => {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Name is required';
  if (!values.email?.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!values.message?.trim()) errors.message = 'Message is required';
  return errors;
};

const Contact = React.memo(function Contact({ onSnackbar }) {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialValues,
    validate
  );

  const onSubmit = useCallback(
    () => {
      if (onSnackbar) {
        onSnackbar({ type: 'success', message: '🚀 Message sent! I\'ll get back to you soon.' });
      }
    },
    [onSnackbar]
  );

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>Let's Connect</span>
          <h2 className={styles.heading}>Get In Touch</h2>
          <p className={styles.subheading}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        {/* Split Layout */}
        <div className={styles.layout}>
          {/* Left: Contact Info */}
          <div className={styles.infoPanel}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Let's Build Something Together</h3>
              <p className={styles.infoText}>
                Whether you need a MERN stack web app, an AI-powered tool, or just want to say hi —
                my inbox is always open. I typically reply within 24 hours.
              </p>

              {/* Contact details */}
              <div className={styles.contactDetails}>
                <a href={`mailto:${contactData.email}`} className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <EmailIcon fontSize="small" />
                  </div>
                  <div>
                    <div className={styles.contactLabel}>Email</div>
                    <div className={styles.contactValue}>{contactData.email}</div>
                  </div>
                </a>
                {contactData.phone && (
                  <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <div className={styles.contactLabel}>Phone</div>
                      <div className={styles.contactValue}>{contactData.phone}</div>
                    </div>
                  </a>
                )}
                {contactData.location && (
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <div className={styles.contactLabel}>Location</div>
                      <div className={styles.contactValue}>{contactData.location}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social links */}
              <div className={styles.socialSection}>
                <h4 className={styles.socialTitle}>Find me on</h4>
                <div className={styles.socialLinks}>
                  {contactData.social.map(({ name, url, icon }) => {
                    const Icon = iconMap[icon] || GitHubIcon;
                    return (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={name}
                      >
                        <Icon fontSize="small" />
                        <span>{name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability badge */}
              <div className={styles.availBadge}>
                <span className={styles.availDot} />
                Available for freelance & full-time opportunities
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.formPanel}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    required
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    required
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={6}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                />
                {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
              </div>

              <button type="submit" className={styles.submitBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
