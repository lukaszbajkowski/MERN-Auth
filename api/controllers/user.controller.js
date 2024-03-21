import User from "../models/user.model.js";
import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";

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
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can update only your account!"));
    }

    try {
        const user = await User.findById(req.params.id);

        if (user.googleAccount) {
            return next(errorHandler(403, "Cannot update profile for Google account."));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updateFields = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
        };

        if (req.body.email) {
            updateFields.emailConfirmed = false;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: updateFields},
            {new: true}
        );

        const {password, ...rest} = updatedUser._doc;
        1
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
