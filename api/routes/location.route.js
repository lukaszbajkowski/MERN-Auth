import express from "express";
import {getAllCities, getAllCountries, getCitiesByCountry} from "../controllers/location.controller.js";

const router = express.Router();

router.get("/cities", getAllCities);
router.get("/cities/:countryId", getCitiesByCountry);
router.get("/countries", getAllCountries);

export default router;

