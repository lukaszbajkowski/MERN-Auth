import User from "../models/user.model.js";
import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const updateUserFields = async (req, res, next, updateFields) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: updateFields},
            {new: true}
        );

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const updateEmail = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can update only your account!"));
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        if (!req.body.email) {
            return next(errorHandler(400, "Email is required."));
        }

        req.body.emailConfirmed = false;
        const token = crypto.randomBytes(20).toString("hex");
        req.body.emailConfirmedToken = token;
        req.body.emailConfirmedExpires = Date.now() + 3600000;

        const confirmationLink = `${process.env.APP_URL}/confirm-email/${token}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: "Confirmation of registration",
            html: `Click <a href="${confirmationLink}">here</a> ,to confirm your registration.`,
        };

        await transporter.sendMail(mailOptions);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    email: req.body.email,
                    emailConfirmed: false,
                    emailConfirmedToken: token,
                    emailConfirmedExpires: req.body.emailConfirmedExpires
                }
            },
            {new: true}
        );

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


export const updateUsername = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can update only your account!"));
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        if (!req.body.username) {
            return next(errorHandler(400, "Username is required."));
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {username: req.body.username}},
            {new: true}
        );

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


export const updatePassword = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can update only your account!"));
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        if (!req.body.currentPassword) {
            return next(errorHandler(400, "Current password is required."));
        }

        const passwordMatch = await bcryptjs.compare(req.body.currentPassword, user.password);
        if (!passwordMatch) {
            return next(errorHandler(400, "Invalid current password."));
        }

        if (!req.body.password) {
            return next(errorHandler(400, "New password is required."));
        }

        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {password: hashedPassword}},
            {new: true}
        );

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const updateUserProfilePicture = async (req, res, next) => {
    const updateFields = {
        profilePicture: req.body.profilePicture,
    };

    await updateUserFields(req, res, next, updateFields);
};

export const updateUserAbout = async (req, res, next) => {
    const updateFields = {
        name: req.body.name,
        aboutUser: req.body.aboutUser,
        city: req.body.city,
        country: req.body.country,
        showCity: req.body.showCity,
        gender: req.body.gender,
    };

    await updateUserFields(req, res, next, updateFields);
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can delete only your account!"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        next(error);
    }
};

export const deleteUserMessage = async (req, res) => {
    try {
        const { recipientEmail, senderEmail, subject, content } = req.body;

        if (!recipientEmail || !senderEmail || !subject || !content) {
            return res.status(400).json({ success: false, message: 'Missing required data.' });
        }

        const mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            subject: subject,
            text: content
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
};