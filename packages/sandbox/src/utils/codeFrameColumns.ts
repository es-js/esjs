type Location = {
	column: number
	line: number
}

type NodeLocation = {
	end?: Location
	start: Location
}

export interface Options {
	/**  The number of lines to show above the error. default: 2 */
	linesAbove?: number
	/**  The number of lines to show below the error. default: 3 */
	linesBelow?: number
	/**
	 * Pass in a string to be displayed inline (if possible) next to the
	 * highlighted location in the code. If it can't be positioned inline,
	 * it will be placed above the code frame.
	 * default: nothing
	 */
	message?: string
}

/**
 * RegExp to test for newlines in terminal.
 */

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/

/**
 * Extract what lines should be marked and highlighted.
 */

type MarkerLines = Record<number, true | [number, number]>

function getMarkerLines(
	loc: NodeLocation,
	source: Array<string>,
	opts: Options,
): {
	start: number
	end: number
	markerLines: MarkerLines
} {
	const startLoc: Location = {
    // @ts-ignore
		column: 0,
    // @ts-ignore
		line: -1,
		...loc.start,
	}
	const endLoc: Location = {
		...startLoc,
		...loc.end,
	}
	const { linesAbove = 2, linesBelow = 3 } = opts || {}
	const startLine = startLoc.line
	const startColumn = startLoc.column
	const endLine = endLoc.line
	const endColumn = endLoc.column

	let start = Math.max(startLine - (linesAbove + 1), 0)
	let end = Math.min(source.length, endLine + linesBelow)

	if (startLine === -1) {
		start = 0
	}

	if (endLine === -1) {
		end = source.length
	}

	const lineDiff = endLine - startLine
	const markerLines: MarkerLines = {}

	if (lineDiff) {
		for (let i = 0; i <= lineDiff; i++) {
			const lineNumber = i + startLine

			if (!startColumn) {
				markerLines[lineNumber] = true
			} else if (i === 0) {
				const sourceLength = source[lineNumber - 1].length

				markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1]
			} else if (i === lineDiff) {
				markerLines[lineNumber] = [0, endColumn]
			} else {
				const sourceLength = source[lineNumber - i].length

				markerLines[lineNumber] = [0, sourceLength]
			}
		}
	} else {
		if (startColumn === endColumn) {
			if (startColumn) {
				markerLines[startLine] = [startColumn, 0]
			} else {
				markerLines[startLine] = true
			}
		} else {
			markerLines[startLine] = [startColumn, endColumn - startColumn]
		}
	}

	return { start, end, markerLines }
}

function formatError(message: string): string {
	return `<span style="color: #ef4444">${message}</span>`
}

export function codeFrameColumns(
	rawLines: string,
	loc: NodeLocation,
	opts: Options = {},
): string {
	const lines = rawLines.split(NEWLINE)
	const { start, end, markerLines } = getMarkerLines(loc, lines, opts)
	const hasColumns = loc.start && typeof loc.start.column === 'number'

	const numberMaxWidth = String(end).length

	let frame = rawLines
		.split(NEWLINE, end)
		.slice(start, end)
		.map((line, index) => {
			const number = start + 1 + index
			const paddedNumber = ` ${number}`.slice(-numberMaxWidth)
			const gutter = ` ${paddedNumber} |`
			const hasMarker = markerLines[number]
			const lastMarkerLine = !markerLines[number + 1]
			if (hasMarker) {
				let markerLine = ''
				if (Array.isArray(hasMarker)) {
					const markerSpacing = line
						.slice(0, Math.max(hasMarker[0] - 1, 0))
						.replace(/[^\t]/g, ' ')
					const numberOfMarkers = hasMarker[1] || 1

					markerLine = [
						'\n ',
						gutter.replace(/\d/g, ' '),
						' ',
						markerSpacing,
						'^'.repeat(numberOfMarkers),
					].join('')

					if (lastMarkerLine && opts.message) {
						markerLine += ` ${opts.message}`
					}
				}
				return [
					'>',
					gutter,
					line.length > 0 ? ` ${line}` : '',
					formatError(markerLine),
				].join('')
			}

			return ` ${gutter}${line.length > 0 ? ` ${line}` : ''}`
		})
		.join('\n')

	if (opts.message && !hasColumns) {
		frame = `${' '.repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`
	}

	return frame
}
