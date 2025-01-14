import React, { useState } from "react";
import Navbar from "../shared/Navbar";

const Interview = () => {
  const [emailData, setEmailData] = useState({
    recruiterEmail: "",
    studentEmail: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = () => {
    const { recruiterEmail, studentEmail, subject, message } = emailData;
    const mailtoLink = `mailto:${studentEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `From: ${recruiterEmail}\n\n${message}`
    )}`;
    window.location.href = mailtoLink; // Opens the default mail client
  };

  return (
    <>
      <style>{`
        .email-sender-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background: #f7f9fc;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .email-sender-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #555;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 5px;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .form-textarea {
          height: 120px;
          resize: vertical;
        }

        .send-email-button {
          display: inline-block;
          width: 100%;
          background: #007bff;
          color: white;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .send-email-button:hover {
          background: #0056b3;
        }

        @media (max-width: 768px) {
          .email-sender-container {
            padding: 15px;
          }

          .send-email-button {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>

      <Navbar />
      <div className="email-sender-container">
        <h2 className="email-sender-title">Schedule Interview Email</h2>
        <div className="email-sender-form">
          <div className="form-group">
            <label>Recruiter Email:</label>
            <input
              type="email"
              name="recruiterEmail"
              value={emailData.recruiterEmail}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Student Email:</label>
            <input
              type="email"
              name="studentEmail"
              value={emailData.studentEmail}
              onChange={handleChange}
              required
              placeholder="Student's Email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              required
              placeholder="Email Subject"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={emailData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here..."
              className="form-textarea"
            ></textarea>
          </div>
          <button
            onClick={handleSendEmail}
            className="send-email-button"
          >
            Send Email
          </button>
        </div>
      </div>
    </>
  );
};

export default Interview;
