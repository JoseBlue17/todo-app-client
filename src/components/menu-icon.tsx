type MenuIconProps = {
  className?: string;
};

export default function MenuIcon({ className }: MenuIconProps) {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.66666 1H16.5555V4.33333H7.66666V1ZM7.66666 9.33333H18.7778V12.6667H7.66666V9.33333ZM7.66666 17.6667H22.1111V21H7.66666V17.6667Z"
        fill="#C18EC7"
        stroke="#C18EC7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.11111 3.77776C2.72476 3.77776 3.22222 3.2803 3.22222 2.66665C3.22222 2.053 2.72476 1.55554 2.11111 1.55554C1.49746 1.55554 1 2.053 1 2.66665C1 3.2803 1.49746 3.77776 2.11111 3.77776Z"
        fill="#C18EC7"
        stroke="#C18EC7"
        stroke-width="2"
      />
      <path
        d="M2.11111 12.1111C2.72476 12.1111 3.22222 11.6136 3.22222 11C3.22222 10.3863 2.72476 9.88889 2.11111 9.88889C1.49746 9.88889 1 10.3863 1 11C1 11.6136 1.49746 12.1111 2.11111 12.1111Z"
        fill="#C18EC7"
        stroke="#C18EC7"
        stroke-width="2"
      />
      <path
        d="M2.11111 20.4445C2.72476 20.4445 3.22222 19.947 3.22222 19.3333C3.22222 18.7197 2.72476 18.2222 2.11111 18.2222C1.49746 18.2222 1 18.7197 1 19.3333C1 19.947 1.49746 20.4445 2.11111 20.4445Z"
        fill="#C18EC7"
        stroke="#C18EC7"
        stroke-width="2"
      />
    </svg>
  );
}
