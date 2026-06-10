/**
 * The 6 SVG icons that scroll in the lens-marquee.
 * Source: www.svgrepo.com — free for commercial and non-commercial use,
 * no attribution required. viewBox 0 0 16 16 (mobile optical weight reads
 * as a stylistic choice against the 24x24 desktop set).
 * #schema:
 * {
 *   type: "module",
 *   module: "hero/icons.tsx"
 * }
 */

import React from 'react';

type IconComp = (props: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;

const KnightIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.68328 9.36656L4 12L2 14V16H14V14L10 9H14L15 5L9 2V0H8.47214C4.89767 0 2 2.89767 2 6.47214C2 7.4769 2.23394 8.46787 2.68328 9.36656ZM10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5Z" />
  </svg>
);

const GemIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 7L7 16H9L16 7V5L13 1H3L0 5V7ZM8 14H8.02183L13.4663 7H10.625L8 14ZM10.25 5H13.5L12 3H8.75L10.25 5Z" />
  </svg>
);

const FaceLaughIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5ZM10.5 7C11.3284 7 12 6.32843 12 5.5C12 4.67157 11.3284 4 10.5 4C9.67157 4 9 4.67157 9 5.5C9 6.32843 9.67157 7 10.5 7ZM4 9C4 11.2091 5.79086 13 8 13C10.2091 13 12 11.2091 12 9H4Z" />
  </svg>
);

const DnaIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.01717 9.33332C8.23022 9.1387 8.44783 8.94232 8.66896 8.74329L8.90839 8.5279C9.07797 8.37529 9.24931 8.22081 9.42128 8.06407L9.49147 8C11.7057 5.9758 14 3.57105 14 0H12C12 0.719834 11.8779 1.38003 11.6565 2H4.34354C4.1221 1.38003 4 0.719834 4 0H2C2 3.57105 4.29434 5.9758 6.50853 8C4.29434 10.0242 2 12.429 2 16H4C4 15.2802 4.1221 14.62 4.34354 14H11.6565C11.8779 14.62 12 15.2802 12 16H14C14 13.2115 12.6011 11.1342 10.9337 9.39389C10.7174 9.59149 10.5068 9.78069 10.3049 9.962L10.0069 10.2299C9.81254 10.4048 9.62552 10.5742 9.44577 10.7388C9.84726 11.1544 10.2154 11.5718 10.5397 12H5.46033C6.14452 11.0966 7.0241 10.2411 8 9.349L8.01717 9.33332ZM5.46033 4H10.5397C9.85548 4.90345 8.97591 5.75894 8 6.651C7.0241 5.75894 6.14452 4.90345 5.46033 4Z" />
  </svg>
);

const CodeIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" />
    <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z" />
    <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z" />
  </svg>
);

const BeeIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M11 3V4L15.3436 8.77793C15.766 9.24255 16 9.85471 16 10.4826C16 11.8633 14.8807 13 13.5 13C12.1193 13 11 11.8807 11 10.5V9.68629C11 9.79109 10.9979 9.89568 10.9939 10H5.00615C5.00206 9.89568 5 9.79109 5 9.68629V10.5C5 11.8807 3.88071 13 2.5 13C1.11929 13 0 11.8633 0 10.4826C0 9.85471 0.234044 9.24255 0.65643 8.77793L5 4V3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3ZM5 8H11V6H5V8Z" />
    <path d="M8.65685 15.3431C9.59779 14.4022 10.2801 13.251 10.6581 12H5.34187C5.71987 13.251 6.40221 14.4022 7.34315 15.3431L8 16L8.65685 15.3431Z" />
  </svg>
);

export const TICKER_ICONS: readonly IconComp[] = [
  KnightIcon, GemIcon, FaceLaughIcon, DnaIcon, CodeIcon, BeeIcon,
];
