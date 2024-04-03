import PropTypes from 'prop-types';

const CitySelect = ({cities, selectedCity, handleCityChange, currentUserCity}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                City
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <select
                    id="city"
                    name="city"
                    onChange={handleCityChange}
                    value={selectedCity}
                    className="appearance-none bg-slate-100 rounded-lg border border-gray-300 text-gray-900 text-sm
                    block w-full p-2.5 cursor-pointer"
                >
                    {currentUserCity ? (
                        <></>
                    ) : (
                        <option value="" disabled>
                            Wybierz miasto
                        </option>
                    )}
                    {cities.map(city => (
                        <option key={city._id} value={city._id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

CitySelect.propTypes = {
    cities: PropTypes.array.isRequired,
    selectedCity: PropTypes.string.isRequired,
    handleCityChange: PropTypes.func.isRequired,
    currentUserCity: PropTypes.string.isRequired,
};

export default CitySelect;
