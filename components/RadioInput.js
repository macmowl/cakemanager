
const RadioInput = ({name, id, value, onChange, children}) => {
    return (
        <>
            <label htmlFor={id} className="radioContainer">{children}
                <input
                    type="radio"
                    value={value}
                    id={id}
                    name={name}
                    onChange={onChange}
                />
                <span className="checkmark"></span>
            </label>
        </>
    )
}

export default RadioInput
