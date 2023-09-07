import { forwardRef } from "react";

const TextArea = forwardRef(({label, name, type, value, onChange, fields, placeholder}: any, ref) => {
    return (
        <div>
            <label htmlFor={name} className="capitalize block pb-2">
                {label} <span className="text-red-600">*</span>
            </label>
            <textarea 
                ref={ref} 
                id={name}
                name={name}  
                rows="4"
                cols="30"
                type={type}
                {...fields}
                placeholder={placeholder}
                onChange={onChange} 
                value={value} 
                className="w-full border border-[#D8DDE6] rounded p-2"
            ></textarea>
      </div>
    );
})
 
export default TextArea;