import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
        unique: true,
    },
    cities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        }
    ]
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
