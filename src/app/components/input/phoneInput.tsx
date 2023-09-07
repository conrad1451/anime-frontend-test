import PhoneInput from "react-phone-input-2";

const CustomPhoneInput = ({label, value, onChange, placeholder, mandatory=true}: any) => {
    const handleOnChange = (phone: any) => {
        onChange(phone);
    };

    return (
        <div>
            <label htmlFor={label} className="capitalize block pb-2">
                {label} {mandatory && <span className="text-red-600">*</span>}
            </label>
            <div className="w-full">
                <PhoneInput
                    country={"gh"}
                    value={value}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    inputProps={{
                        required: false,
                    }}
                    buttonStyle={{
                        backgroundColor: "white",
                        height: "40px",
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                    }}
                    inputStyle={{
                        width: "100%",
                        height: "40px",
                        borderColor: "#D8DDE6",
                        borderRadius: "4px",
                    }}
                    dropdownStyle={{
                        width: "410px",
                        borderRadius: "4px",
                    }}
                />
            </div>
        </div>
    );
}
 
export default CustomPhoneInput;

