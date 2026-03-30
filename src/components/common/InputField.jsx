function InputField({
  label,
  value,
  readOnly = false,
  placeholder = "",
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      <label className="mb-2 block text-[12px] font-normal text-[#8c8c8c]">
        {label}
      </label>
      <input
        type="text"
        value={value || ""}
        readOnly={readOnly}
        placeholder={placeholder}
        className="h-[38px] w-full rounded-[3px] border border-[#dddddd] bg-[#f7f7f7] px-3 text-[13px] text-[#404040] outline-none"
      />
    </div>
  );
}

export default InputField;