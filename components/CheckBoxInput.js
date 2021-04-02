
const CheckBoxInput = ({name, id, value, onChange, children}) => {
    return (
        <>
            <label htmlFor={id} className="checkboxContainer">{children}
                <input
                    type="checkbox"
                    value={value}
                    id={id}
                    name={name}
                    onChange={onChange}
                />
                <span className="boxcheckmark"></span>
            </label>
        </>
    )
}

export default CheckBoxInput
