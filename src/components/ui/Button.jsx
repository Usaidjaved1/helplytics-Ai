function Button({ children, onClick, variant = "primary" }) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    ghost: "bg-transparent hover:bg-gray-800 text-white border border-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}

export default Button;