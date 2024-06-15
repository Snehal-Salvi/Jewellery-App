// controllers/email.controller.js

import nodemailer from 'nodemailer';
import Company from '../model/company.model.js';
import { errorHandler } from '../utils/error.js';

// Function to send query email
export const sendQueryEmail = async (req, res, next) => {
    const { companyId, userName, userEmail, userQuery } = req.body; // Destructure request body to get necessary data

    // Validate required fields
    if (!companyId || !userName || !userEmail || !userQuery) {
        return next(errorHandler(400, 'All fields are required')); // If any required field is missing, send a 400 error
    }

    try {
        // Fetch the company details from the database using the companyId
        const company = await Company.findById(companyId);

        if (!company) {
            return next(errorHandler(404, 'Company not found')); // If company with provided ID is not found, send a 404 error
        }

        // Create a transporter object using nodemailer with Gmail service
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // or use a different SMTP server if necessary
            auth: {
                user: process.env.EMAIL_USERNAME, // Your email address for authentication
                pass: process.env.EMAIL_PASSWORD  // Your email password for authentication
            }
        });

        // Define email options
        let mailOptions = {
            from: userEmail, // Sender's email address (user's email)
            to: company.ownerEmail, // Recipient's email address (company's owner email)
            subject: `Query from ${userName} about ${company.name}`, // Email subject line
            text: `User Name: ${userName}\nUser Email: ${userEmail}\nQuery: ${userQuery}`, // Plain text body
            html: `<p><strong>User Name:</strong> ${userName}</p>
                   <p><strong>User Email:</strong> ${userEmail}</p>
                   <p><strong>Query:</strong> ${userQuery}</p>` // HTML body
        };

        // Send the email using the transporter
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId); // Log message ID upon successful email send

        res.status(200).json({ success: true, message: 'Email sent successfully' }); // Respond with success message

    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
};
