import React from 'react'

const InputField = ({ title, placeholder, optional, ...props }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend text-left">{title}</legend>
            <input {...props} type="text" className="input" placeholder={placeholder} />
            {optional && <p className="label">{optional}</p>}
        </fieldset>
    )
}

export default InputField