const SvgArchive = ({ width = 40, height = 40, fillColor = 'black', isActive = false }) => {
  const strokeWidth = isActive ? 1 : 0.5
  return (<svg width={width} height={height} viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 10.22V19C19.5 21 19 22 16.5 22H7.5C5 22 4.5 21 4.5 19V10.22" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 2H19C21 2 22 3 22 5V7C22 9 21 10 19 10H5C3 10 2 9 2 7V5C2 3 3 2 5 2Z" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.18 14H13.82" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>)
}
export default SvgArchive