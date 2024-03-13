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
    const updateFields = {
        ...(req.body.username && {username: req.body.username}),
        ...(req.body.email && {email: req.body.email}),
        ...(req.body.password && {password: req.body.password}),
    };

    await updateUserFields(req, res, next, updateFields);
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
