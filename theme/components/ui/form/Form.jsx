import { useState } from 'react';
import { sendEmail } from '@/utils/sendEmail'; 
// import Button from '../Button/Button.astro';

const ContactForm = ({ inputs, textarea, disclaimer, button = "Contact us", description = "" }) => {
  const [formStatus, setFormStatus] = useState({ success: false, error: "" });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    const formData = new FormData(event.target);

    // Prepare the email data
    const emailData = {
      email: formData.get('email'),
      fullname: formData.get('name'),
      phone: formData.get('phone') || '',
      message: formData.get('message'),
    };

    try {
      const result = await sendEmail(emailData); // Send email using the utility
      if (result) {
        setFormStatus({ success: true, error: "" });
      } else {
        setFormStatus({ success: false, error: "Failed to send message." });
      }
    } catch (error) {
      setFormStatus({
        success: error,
        error: "An error occurred while sending the message.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs &&
        inputs.map(({ name = "", label = "", autocomplete = "on", placeholder = "" }) =>
          name ? (
            <div className="mb-6" key={name}>
              {label && (
                <label htmlFor={name} className="block text-sm font-medium">
                  {label}
                </label>
              )}
              <input
                type="text"
                name={name}
                id={name}
                autoComplete={autocomplete}
                placeholder={placeholder}
                className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
              />
            </div>
          ) : null
        )}

      {textarea && (
        <div>
          <label htmlFor="textarea" className="block text-sm font-medium">
            {textarea.label}
          </label>
          <textarea
            id="textarea"
            name={textarea.name || 'message'}
            rows={textarea.rows || 4}
            placeholder={textarea.placeholder}
            className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
          />
        </div>
      )}

      {disclaimer && (
        <div className="mt-3 flex items-start">
          <div className="flex mt-0.5">
            <input
              id="disclaimer"
              name="disclaimer"
              type="checkbox"
              className="cursor-pointer mt-1 py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
            />
          </div>
          <div className="ml-3">
            <label
              htmlFor="disclaimer"
              className="cursor-pointer select-none text-sm text-gray-600 dark:text-white"
            >
              {disclaimer.label}
            </label>
          </div>
        </div>
      )}

      {button && (
        <div className="mt-10 grid">
          <button variant="primary" type="submit">
            {button}
          </button>
        </div>
      )}

      {description && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600 dark:text-white">{description}</p>
        </div>
      )}

      {/* Display submit result */}
      {formStatus.success && (
        <div className="mt-3 text-center text-green-600">
          Message sent successfully!
        </div>
      )}
      {formStatus.error && (
        <div className="mt-3 text-center text-red-600">
          Error: {formStatus.error}
        </div>
      )}
    </form>
  );
};

export default ContactForm