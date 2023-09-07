import { forwardRef } from "react";

const Input = forwardRef(({label, name, type, value, onChange, fields, placeholder} : any, ref) => {
    return (
        <div>
            <label htmlFor={name} className="capitalize block pb-2">
                {label} <span className="text-red-600">*</span>
            </label>
            <input
                ref={ref}
                id={name}
                name={name}
                type={type}
                {...fields}
                className="w-full border border-[#D8DDE6] rounded h-10 px-2"
                placeholder={placeholder}
                onChange={onChange} 
                value={value}
            />
      </div>
    );
})
 
export default Input;