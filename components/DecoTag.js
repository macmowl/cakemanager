const DecoTag = ({ name, id, value, onChange, children }) => {
    return (
        <div>
            <input
                type="checkbox"
                value={value}
                id={id}
                name={name}
                onChange={onChange}
                className="decoCheckbox"
                />
            <label
                htmlFor={id}
                className="decoLabelCheckbox flex items-center rounded-full px-3 py-0 m-1 text-xs"
                >
                {children}
            </label>
        </div>
    )
}

export default DecoTag
