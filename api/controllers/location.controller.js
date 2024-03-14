import City from "../models/city.model.js";
import Country from "../models/country.model.js";

export const getAllCities = async (req, res, next) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        next(error);
    }
};

export const getCitiesByCountry = async (req, res, next) => {
    try {
        const cities = await City.find({country: req.params.countryId});
        res.status(200).json(cities);
    } catch (error) {
        next(error);
    }
};

export const getAllCountries = async (req, res, next) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};
