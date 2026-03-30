const baseStyles =
  "inline-flex h-[38px] min-w-[88px] items-center justify-center rounded-[3px] px-5 text-[13px] font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-[#0b69c7] text-white hover:bg-[#095cad]",
  dangerGhost: "bg-transparent text-[#ef4444] hover:text-[#dc2626]",
};

function Button({
  type = "button",
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;