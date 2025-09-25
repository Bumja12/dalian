interface MapMarkerIconProps {
  className?: string;
}

export default function MapMarkerIcon({ className = "" }: MapMarkerIconProps) {
  return (
    <svg
      width="23"
      height="31"
      viewBox="0 0 23 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_201_4869)">
        <path
          d="M10.3561 29.6366C1.93875 17.434 0.376343 16.1816 0.376343 11.697C0.376343 5.554 5.35619 0.574158 11.4992 0.574158C17.6422 0.574158 22.622 5.554 22.622 11.697C22.622 16.1816 21.0596 17.434 12.6423 29.6366C12.0899 30.4346 10.9084 30.4345 10.3561 29.6366Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_201_4869">
          <rect
            width="22.2457"
            height="29.6609"
            fill="white"
            transform="translate(0.376343 0.574219)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
