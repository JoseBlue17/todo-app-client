import React from 'react';

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9.135 0.922727H8.6275V0H7.6125V0.922727H2.5375V0H1.5225V0.922727H1.015C0.45675 0.922727 0 1.33795 0 1.84545V9.22727C0 9.73477 0.45675 10.15 1.015 10.15H9.135C9.69325 10.15 10.15 9.73477 10.15 9.22727V1.84545C10.15 1.33795 9.69325 0.922727 9.135 0.922727ZM9.135 9.22727H1.015V4.15227H9.135V9.22727ZM9.135 3.22955H1.015V1.84545H9.135V3.22955Z"
      fill="#9D9D9D"
    />
  </svg>
);

export default CalendarIcon;
