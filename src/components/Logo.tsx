import React from 'react'

function Logo() {
	return (
		<div>
			<svg
				viewBox='0 0 120 60'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='w-[200px]'>
				<defs>
					<linearGradient
						id='cardDarkGradient'
						x1='0'
						y1='0'
						x2='0'
						y2='1'>
						<stop
							offset='0%'
							stop-color='#3730a3'
						/>
						<stop
							offset='100%'
							stop-color='#1e1b4b'
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
						stroke-width='1.5'
					/>

					<rect
						x='5'
						y='10'
						width='28'
						height='40'
						rx='4'
						fill='url(#cardDarkGradient)'
						stroke='#9CE4FF'
						stroke-width='2'
					/>

					<line
						x1='10'
						y1='20'
						x2='22'
						y2='20'
						stroke='#9CE4FF'
						stroke-width='2'
						stroke-linecap='round'
					/>
					<line
						x1='10'
						y1='26'
						x2='28'
						y2='26'
						stroke='#9CE4FF'
						stroke-width='2'
						stroke-linecap='round'
					/>
					<line
						x1='10'
						y1='42'
						x2='25'
						y2='42'
						stroke='#9CE4FF'
						stroke-width='2'
						stroke-linecap='round'
					/>
				</g>

				<text
					x='65'
					y='45'
					font-family='Arial, Helvetica, sans-serif'
					font-weight='800'
					font-size='34'
					fill='#1f2937'>
					Fisz<tspan fill='#9CE4FF'>It!</tspan>
				</text>
			</svg>
		</div>
	)
}

export default Logo
