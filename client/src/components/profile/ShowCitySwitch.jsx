import Switch from "react-switch";
import PropTypes from "prop-types";

const ShowCitySwitch = ({checked, onChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Show city in profile
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                    <Switch
                        checked={checked}
                        onChange={onChange}
                    />
                </div>
            </div>
        </>
    );
};


ShowCitySwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ShowCitySwitch;
