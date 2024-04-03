import {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import PropTypes from "prop-types";

const DatePickerComponent = ({selectedDate, handleChange}) => {
    const [value, setValue] = useState({
        startDate: selectedDate,
        endDate: selectedDate
    });

    const handleValueChange = (newValue) => {
        setValue(newValue);
        handleChange(newValue.startDate.toString().substring(0, 10) + "T00:00:00.000Z")
    }

    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Birthday
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <Datepicker
                    id={"birthDate"}
                    primaryColor={"emerald"}
                    inputClassName={"bg-slate-100 rounded-lg p-2.5 border border-gray-300 text-gray-900 text-sm w-full"}
                    asSingle={true}
                    useRange={false}
                    displayFormat={"DD/MM/YYYY"}
                    placeholder="Select a date"
                    value={value}
                    onChange={handleValueChange}
                />
            </div>
        </>
    );
};

DatePickerComponent.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default DatePickerComponent;