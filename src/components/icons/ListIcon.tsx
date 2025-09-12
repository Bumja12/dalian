interface ListIconProps {
  className?: string;
}

export default function ListIcon({ className = "h-6 w-6" }: ListIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_list)">
        <path
          d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_list">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
