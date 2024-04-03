import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const DatePickerComponent = ({selectedDate, handleChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Cake day
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <DatePicker
                    id="birthDate"
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="yyyy-MM-dd"
                    className="mt-1"
                />
            </div>
        </>
    );
};

DatePickerComponent.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default DatePickerComponent;
