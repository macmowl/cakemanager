const DecoTag = ({ name, id, value, onChange, checked, children }) => {
    return (
        <div>
            <input
                type="checkbox"
                value={value}
                id={id}
                name={name}
                onChange={onChange}
                className="decoCheckbox"
                checked={checked}
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

DecoTag.defaultProps = {
    name: 'decoration',
    id: 'decoration',
    value: 'decoration',
}

export default DecoTag
