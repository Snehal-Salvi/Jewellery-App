import nodemailer from 'nodemailer';
import Company from '../model/company.model.js';
import { errorHandler } from '../utils/error.js';

export const sendQueryEmail = async (req, res, next) => {
    const { companyId, userName, userEmail, userQuery } = req.body;

    if (!companyId || !userName || !userEmail || !userQuery) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Fetch the company details from the database
        const company = await Company.findById(companyId);

        if (!company) {
            return next(errorHandler(404, 'Company not found'));
        }

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // or use a different SMTP server
            auth: {
                user: process.env.EMAIL_USERNAME, // your email address
                pass: process.env.EMAIL_PASSWORD  // your email password
            }
        });

        // Define email options
        let mailOptions = {
            from: userEmail, // sender address
            to: company.ownerEmail, // list of receivers
            subject: `Query from ${userName} about ${company.name}`, // Subject line
            text: `User Name: ${userName}\nUser Email: ${userEmail}\nQuery: ${userQuery}`, // plain text body
            html: `<p><strong>User Name:</strong> ${userName}</p>
                   <p><strong>User Email:</strong> ${userEmail}</p>
                   <p><strong>Query:</strong> ${userQuery}</p>` // html body
        };

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);

        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        next(error);
    }
};
