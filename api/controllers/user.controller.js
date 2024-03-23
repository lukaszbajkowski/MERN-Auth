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
        // Sprawdzenie czy użytkownik próbuje aktualizować tylko swoje konto
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can update only your account!"));
        }

        // Pobranie użytkownika z bazy danych
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        // Sprawdzenie czy konto jest kontem Google
        if (user.googleAccount) {
            return next(errorHandler(403, "Cannot update profile for Google account."));
        }

        // Aktualizacja pola hasła jeśli zostało przesłane
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Aktualizacja pól użytkownika
        const updateFields = {
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            profilePicture: req.body.profilePicture || user.profilePicture,
        };

        // Jeśli przesłano nowy email, zaktualizuj pole emailConfirmed
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

            // Wysyłanie maila z linkiem aktywacyjnym
            await transporter.sendMail(mailOptions);
        }

        // Aktualizacja użytkownika w bazie danych
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        // Usunięcie hasła z zwracanych danych użytkownika
        const { password, ...rest } = updatedUser._doc;
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
