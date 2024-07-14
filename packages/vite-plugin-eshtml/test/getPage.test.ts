import { describe, expect, it } from 'vitest'
import { Opciones } from '../src'
import { getPage } from '../src/lib/getPage'

describe('getPage', () => {
	const options: Opciones = {
		paginas: {
			indice: { titulo: 'Página de inicio' },
			'acerca-de': { titulo: 'Acerca de' },
			contacto: { titulo: 'Contacto' },
		},
	}

	it('returns the index page when pageName is "index"', () => {
		const result = getPage(options, 'index')
		expect(result).toEqual({ titulo: 'Página de inicio' })
	})

	it('returns the index page when pageName is "indice"', () => {
		const result = getPage(options, 'indice')
		expect(result).toEqual({ titulo: 'Página de inicio' })
	})

	it('returns undefined for non-existent pages', () => {
		const result = getPage(options, 'nonexistent')
		expect(result).toBeUndefined()
	})

	it('returns the correct page for a valid pageName', () => {
		const result = getPage(options, 'acerca-de')
		expect(result).toEqual({ titulo: 'Acerca de' })
	})

	it('handles options without paginas gracefully', () => {
		const result = getPage({}, 'index')
		expect(result).toBeUndefined()
	})

	it('handles null options gracefully', () => {
		const result = getPage(null, 'index')
		expect(result).toBeUndefined()
	})
})
