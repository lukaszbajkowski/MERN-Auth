import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";
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

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});

    try {
        const user = await User.findOne({username});
        const emailadress = await User.findOne({email});

        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already exist.",
            });
        }

        if (emailadress) {
            return res.status(404).json({
                success: false,
                message: "Email already exist.",
            });
        }

        const token = crypto.randomBytes(20).toString("hex");
        newUser.emailConfirmedToken = token;
        newUser.emailConfirmedExpires = Date.now() + 3600000;

        await newUser.save();

        const confirmationLink = `${process.env.APP_URL}/confirm-email/${token}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Confirmation of registration",
            html: `Click <a href="${confirmationLink}">here</a> ,to confirm your registration.`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return next(
                    errorHandler(500, "Error while sending password reset email.")
                );
            }
        });

        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        next(error);
    }
};

export const confirmEmail = async (req, res, next) => {
    const {token} = req.params;

    try {
        const user = await User.findOne({
            emailConfirmedToken: token,
            emailConfirmedExpires: {$gt: Date.now()},
        });

        if (!user) {
            return next(errorHandler(404, "Invalid or expired email address confirmation."));
        }

        user.emailConfirmed = true;
        user.emailConfirmedToken = undefined;
        user.emailConfirmedExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email address confirmed successfully.",
        });
    } catch (error) {
        next(error)
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        if (!user.emailConfirmed) {
            return next(errorHandler(400, "Email not confirmed"));
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return next(errorHandler(400, "Invalid credentials"));
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const {password: userPassword, ...userData} = user._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res
            .cookie("access_token", token, {httpOnly: true, expiryDate: expiryDate})
            .status(200)
            .json(userData);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const checkemail = await User.findOne({email: req.body.email});
        const user = await User.findOne({relatedAccount: req.body.email});

        if (checkemail && !checkemail.googleAccount) {
            res.status(200).json(user);
        }

        if (user) {
            if (!user.googleAccount || user.relatedAccount !== "") {
                res.status(200).json(user);
            } else {
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
                const {password: userPassword, ...userData} = user._doc;
                const expiryDate = new Date(Date.now() + 3600000);

                res
                    .cookie("access_token", token, {
                        httpOnly: true,
                        expiryDate: expiryDate,
                    })
                    .status(200)
                    .json(userData);
            }
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
                emailConfirmed: true,
                googleAccount: true,
                relatedAccount: req.body.email
            });

            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password: userPassword, ...userData} = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);

            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    expiryDate: expiryDate,
                })
                .status(200)
                .json(userData);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res) => {
    res.clearCookie("access_token").status(200).json({message: "Logged out"});
};

export const requestPasswordReset = async (req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const resetLink = `${process.env.APP_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `Click <a href="${resetLink}">here</a> to reset your password.`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return next(
                    errorHandler(500, "Error while sending password reset email.")
                );
            }
        });

        res
            .status(200)
            .json({success: false, message: "Password reset instructions sent to your email."});
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    const {token} = req.params;
    const {newPassword} = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()},
        });

        if (!user) {
            return next(errorHandler(400, "Invalid or expired reset token."));
        }

        const isPasswordCorrect = bcryptjs.compareSync(newPassword, user.password);

        if (isPasswordCorrect) {
            return res.status(400).json({success: false, message: "New password cannot be the same."});
        }

        user.password = bcryptjs.hashSync(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res
            .status(200)
            .json({success: true, message: "Password reset successfully."});
    } catch (error) {
        next(error);
    }
};

