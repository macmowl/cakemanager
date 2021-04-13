
const CheckBoxInput = ({name, id, value, onChange, checked, children}) => {
    return (
        <>
            <label htmlFor={id} className="checkboxContainer">{children}
                <input
                    type="checkbox"
                    value={value}
                    id={id}
                    name={name}
                    onChange={onChange}
                    checked={checked}
                />
                <span className="boxcheckmark"></span>
            </label>
        </>
    )
}

CheckBoxInput.defaultProps = {
    name: 'checkbox',
    id: 'checkbox',
    value: 'checkbox',
    children: 'I am a beautiful checkbox button'
}

export default CheckBoxInput
