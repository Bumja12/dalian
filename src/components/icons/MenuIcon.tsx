interface MenuIconProps {
  className?: string;
  size?: number;
}

export default function MenuIcon({
  className = "w-4 h-5",
  size,
}: MenuIconProps) {
  const sizeProps = size ? { width: size, height: (size * 19) / 16 } : {};

  return (
    <svg
      className={className}
      {...sizeProps}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.25 3.625C0.25 3.00273 0.752734 2.5 1.375 2.5H14.875C15.4973 2.5 16 3.00273 16 3.625C16 4.24727 15.4973 4.75 14.875 4.75H1.375C0.752734 4.75 0.25 4.24727 0.25 3.625ZM0.25 9.25C0.25 8.62773 0.752734 8.125 1.375 8.125H14.875C15.4973 8.125 16 8.62773 16 9.25C16 9.87227 15.4973 10.375 14.875 10.375H1.375C0.752734 10.375 0.25 9.87227 0.25 9.25ZM16 14.875C16 15.4973 15.4973 16 14.875 16H1.375C0.752734 16 0.25 15.4973 0.25 14.875C0.25 14.2527 0.752734 13.75 1.375 13.75H14.875C15.4973 13.75 16 14.2527 16 14.875Z"
        fill="currentColor"
      />
    </svg>
  );
}
