import { expect, describe, it } from 'vitest'
import { generatePagesInput } from '../src/lib/generatePagesInput'

describe('generatePagesInput', () => {
	const options = {
		paginas: {
			inicio: { titulo: 'Inicio' },
			'acerca-de': { titulo: 'Acerca de' },
			contacto: { titulo: 'Contacto' },
		},
	}

	it('adds html paths for existing pages', () => {
		const input = {}
		const expected = {
			inicio: 'inicio.html',
			'acerca-de': 'acerca-de.html',
			contacto: 'contacto.html',
		}
		const result = generatePagesInput(input, options)
		expect(result).toEqual(expected)
	})

	it('merges with existing input without overriding', () => {
		const input = { personalizado: 'personalizado.html' }
		const expected = {
			personalizado: 'personalizado.html',
			inicio: 'inicio.html',
			'acerca-de': 'acerca-de.html',
			contacto: 'contacto.html',
		}
		const result = generatePagesInput(input, options)
		expect(result).toEqual(expected)
	})

	it('handles empty options gracefully', () => {
		const result = generatePagesInput({}, {})
		expect(result).toEqual({})
	})

	it('handles null options gracefully', () => {
		const result = generatePagesInput({}, null)
		expect(result).toEqual({})
	})

	it('preserves existing paths when options are empty', () => {
		const input = { existing: 'existing.html' }
		const result = generatePagesInput(input, {})
		expect(result).toEqual({ existing: 'existing.html' })
	})

	it('preserves input defined by the user', () => {
		const input = { inicio: 'custom.html' }
		const result = generatePagesInput(input, options)
		expect(result).toEqual({
			inicio: 'custom.html',
			'acerca-de': 'acerca-de.html',
			contacto: 'contacto.html',
		})
	})
})
