import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
});

const City = mongoose.model("City", citySchema);

export default City;
