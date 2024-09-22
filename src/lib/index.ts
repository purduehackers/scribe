// place files you want to import through the `$lib` alias in this folder.
import font from './Font.ttf?base64';
import fontInverted from './FontInverted.ttf?base64';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

export function generateSvg(
	content: string,
	fontSize: number,
	offset: number,
	yOffset: number,
	color: string,
	invert: boolean
): string {
	const lines = content.split('\n');
	let maxWidth = 0;
	let minY = 0;
	let lineIndex = 0;
	for (const c of lines) {
		maxWidth = Math.max(c.length, maxWidth);
		const greatestYOffset = c.length * yOffset;
		const minPossibleYPosition = lineIndex * yOffset - greatestYOffset;
		minY = Math.min(minPossibleYPosition, minY);

		lineIndex += 1;
	}
	const draw = SVG()
		.size('100%', '100%')
		.viewbox(`0 0 ${maxWidth * offset} ${(lines.length + 1) * fontSize - minY}`);
	draw.fontface(
		invert ? 'HackFontInverted' : 'HackFont',
		`url("data:application/x-font-ttf;base64,${invert ? fontInverted : font}")`
	);
	let line = 0;
	for (const con of lines) {
		let i = 0;
		let accumulator = 0;
		let yCorrection = 0;
		for (const char of con) {
			const kernedOffset = (function o(c: string) {
				if (c === 'i' || c === 'l') {
					return (offset * 1300) / 2048;
				} else if (c === 'f' || c === 'j') {
					return (offset * 1700) / 2048;
				} else {
					return offset;
				}
			})(char);
			const text = draw.text(char);
			// Extra offset for lowercase drop characters like p
			text
				.move(accumulator, fontSize + line * (fontSize + 10) - i * yOffset - minY + yCorrection)
				.font({ family: invert ? 'HackFontInverted' : 'HackFont', size: fontSize })
				.fill(color);
			i += 1;

			accumulator += kernedOffset;
			yCorrection += (function o(c: string) {
				if (c === 'i' || c === 'l') {
					return yOffset * 0.2;
				} else if (c === 'f' || c === 'j') {
					return yOffset * 0.3;
				} else {
					return 0;
				}
			})(char);
		}
		line += 1;
	}

	return draw.svg();
}
