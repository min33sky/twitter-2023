interface Props {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

export default function Button({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-full
        border-2
        font-semibold
        outline-none
        transition
        hover:opacity-80
        focus:ring-4
        focus:ring-sky-500
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-sky-500'}
        ${secondary ? 'text-black' : 'text-white'}
        ${secondary ? 'border-black' : 'border-sky-500'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}
      `}
    >
      {label}
    </button>
  );
}
