import tailwindColors from 'tailwindcss/colors'

const colorsMap = {
	rojo: tailwindColors.red,
	verde: tailwindColors.green,
	amarillo: tailwindColors.yellow,
	azul: tailwindColors.blue,
	magenta: tailwindColors.fuchsia,
	cian: tailwindColors.cyan,
	gris: tailwindColors.gray,
	indigo: tailwindColors.indigo,
	morado: tailwindColors.purple,
}

export const colors = {
	negro: tailwindColors.black,
	blanco: tailwindColors.white,
}

for (const color in colorsMap) {
	;[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach((level) => {
		const propertyName = `${color}${level}`
		colors[propertyName] = colorsMap[color][level]

		if (level === 500) {
			colors[color] = colorsMap[color][500]
		}
	})
}

for (const c in colors) {
	if (Object.hasOwnProperty.call(colors, c)) {
		colors[`fondo${c[0].toUpperCase()}${c.slice(1)}`] = colors[c]
	}
}
