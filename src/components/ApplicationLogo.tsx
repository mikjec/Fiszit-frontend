export default function ApplicationLogo({ className = 'w-[200px]', ...props }) {
	return (
		<svg
			viewBox='0 0 120 60'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			{...props}>
			<defs>
				<linearGradient
					id='cardDarkGradient'
					x1='0'
					y1='0'
					x2='0'
					y2='1'>
					<stop
						offset='0%'
						stopColor='#3730a3'
					/>
					<stop
						offset='100%'
						stopColor='#1e1b4b'
					/>
				</linearGradient>
			</defs>

			<g transform='translate(5, 5)'>
				<rect
					x='22'
					y='2'
					width='28'
					height='40'
					rx='4'
					fill='#9CE4FF'
					stroke='#1e293b'
					strokeWidth='1.5'
				/>
				<rect
					x='5'
					y='10'
					width='28'
					height='40'
					rx='4'
					fill='url(#cardDarkGradient)'
					stroke='#9CE4FF'
					strokeWidth='2'
				/>
				<line
					x1='10'
					y1='20'
					x2='22'
					y2='20'
					stroke='#9CE4FF'
					strokeWidth='2'
					strokeLinecap='round'
				/>
				<line
					x1='10'
					y1='26'
					x2='28'
					y2='26'
					stroke='#9CE4FF'
					strokeWidth='2'
					strokeLinecap='round'
				/>
				<line
					x1='10'
					y1='42'
					x2='25'
					y2='42'
					stroke='#9CE4FF'
					strokeWidth='2'
					strokeLinecap='round'
				/>
			</g>

			<text
				x='65'
				y='45'
				fontFamily='Arial, Helvetica, sans-serif'
				fontWeight='800'
				fontSize='16'
				fill='#1f2937'>
				Fisz<tspan fill='#9CE4FF'>It!</tspan>
			</text>
		</svg>
	)
}
