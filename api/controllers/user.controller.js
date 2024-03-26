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

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        const isPasswordValid = bcryptjs.compareSync(req.body.currentPassword, user.password);
        if (!isPasswordValid) {
            return next(errorHandler(401, "Current password is incorrect"));
        }

        if (user.googleAccount) {
            return next(errorHandler(403, "Cannot update profile for Google account."));
        }

        if (req.body.newPassword) {
            req.body.newPassword = bcryptjs.hashSync(req.body.newPassword, 10);
        }

        const updateFields = {
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            password: req.body.newPassword || user.password,
            profilePicture: req.body.profilePicture || user.profilePicture,
        };

        if (req.body.email) {
            updateFields.emailConfirmed = false;
            const token = crypto.randomBytes(20).toString("hex");
            updateFields.emailConfirmedToken = token;
            updateFields.emailConfirmedExpires = Date.now() + 3600000;

            const confirmationLink = `${process.env.APP_URL}/confirm-email/${token}`;
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: req.body.email,
                subject: "Confirmation of registration",
                html: `Click <a href="${confirmationLink}">here</a> ,to confirm your registration.`,
            };

            await transporter.sendMail(mailOptions);
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


export const updateUserProfilePicture = async (req, res, next) => {
    const updateFields = {
        profilePicture: req.body.profilePicture,
    };

    await updateUserFields(req, res, next, updateFields);
};

export const updateUserAbout = async (req, res, next) => {
    const updateFields = {
        aboutUser: req.body.aboutUser,
        city: req.body.city,
        country: req.body.country,
        showCity: req.body.showCity,
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
