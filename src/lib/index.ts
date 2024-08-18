// place files you want to import through the `$lib` alias in this folder.
import font from './PHACKISOMETRIC.ttf?base64';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

export function generateSvg(
	content: string,
	fontSize: number,
	offset: number,
	yOffset: number
): string {
	content = content.toUpperCase();
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
	console.log(minY);
	const draw = SVG()
		.size('100%', '100%')
		.viewbox(`0 0 ${maxWidth * offset} ${(lines.length + 1) * fontSize - minY}`);
	draw.fontface('HackFont', `url("data:application/x-font-ttf;base64,${font}")`);
	let line = 0;
	for (const con of lines) {
		let i = 0;
		for (const char of con) {
			const text = draw.text(char);
			text
				.move(i * offset, fontSize + line * fontSize - i * yOffset - minY)
				.font({ family: 'HackFont', size: fontSize });
			i += 1;
		}
		line += 1;
	}

	return draw.svg();
}
