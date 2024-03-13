import PropTypes from 'prop-types';

const CountrySelect = ({countries, selectedCountry, handleCountryChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Country
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <select
                    id="country"
                    name="country"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                    className="appearance-none bg-slate-100 rounded-lg border border-gray-300 text-gray-900 text-sm
                    block w-full p-2.5"
                >
                    {countries.map(country => (
                        <option key={country._id} value={country._id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

CountrySelect.propTypes = {
    countries: PropTypes.array.isRequired,
    selectedCountry: PropTypes.string.isRequired,
    handleCountryChange: PropTypes.func.isRequired,
};

export default CountrySelect;
