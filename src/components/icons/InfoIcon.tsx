export default function InfoIcon(props: { className?: string }) {
	return (
		<svg
			className={props.className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 4 18"
		>
			<path fill="currentColor" d="M4 0H0v3.8h4V0ZM4 6.6H0V18h4V6.6Z" />
		</svg>
	);
}
