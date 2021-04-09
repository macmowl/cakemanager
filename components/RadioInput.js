
const RadioInput = ({name, id, value, onChange, checked, children}) => {
    return (
        <>
            <label htmlFor={id} className="radioContainer">{children}
                <input
                    type="radio"
                    value={value}
                    id={id}
                    name={name}
                    onChange={onChange}
                    checked={checked}
                />
                <span className="checkmark"></span>
            </label>
        </>
    )
}

RadioInput.defaultProps = {
    name: 'radio',
    id: 'radio',
    value: 'radio',
    children: 'I am a beautiful radio button'
}

export default RadioInput
