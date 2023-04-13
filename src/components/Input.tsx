interface Props {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function Input({
  placeholder,
  value,
  type = 'text',
  onChange,
  disabled,
  label,
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 text-xl font-semibold text-white">{label}</p>
      )}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
          w-full
          rounded-md
          border-2
          border-neutral-800
          bg-black
          p-4
          text-lg
          text-white
          outline-none
          transition
          focus:border-2
          focus:border-sky-500
          disabled:cursor-not-allowed
          disabled:bg-neutral-900
          disabled:opacity-70
        "
      />
    </div>
  );
}
