import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default:
                "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
        },
        name: {
            type: String,
        },
        aboutUser: {
            type: String,
        },
        emailConfirmed: {
            type: Boolean,
            default: false,
        },
        emailConfirmedToken: {
            type: String
        },
        emailConfirmedExpires: {
            type: Date
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        googleAccount: {
            type: Boolean,
            default: false,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            default: '65f1be260bfe769bf6cd020a'
        },
        showCity: {
          type: Boolean,
          default: true,
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
            default: '65f1be220bfe769bf6cd0203'
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;
