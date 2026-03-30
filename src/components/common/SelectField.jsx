function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select Language Update",
  disabled = false,
}) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-[12px] font-normal text-[#8c8c8c]">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-[38px] w-full rounded-[3px] border border-[#dddddd] bg-white px-3 text-[13px] text-[#404040] outline-none disabled:bg-[#f7f7f7]"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;