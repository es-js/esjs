import { describe, it, expect } from 'vitest'
import { compile } from '../src/index'

describe('EsCSS Compiler', () => {
  describe('EsCSS to CSS', () => {
    it('should transform basic properties', () => {
      const input = `.tarjeta {
  mostrar: flex;
  ancho: 100%;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('display: flex')
      expect(output).toContain('width: 100%')
    })

    it('should transform flex properties', () => {
      const input = `.contenedor {
  mostrar: flex;
  flex-direccion: columna;
  justificar-contenido: centro;
  alinear-elementos: centro;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('display: flex')
      expect(output).toContain('flex-direction: column')
      expect(output).toContain('justify-content: center')
      expect(output).toContain('align-items: center')
    })

    it('should transform background properties', () => {
      const input = `.elemento {
  color-fondo: azul;
  fondo-color: rojo;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('background-color')
    })

    it('should transform margin and padding', () => {
      const input = `.caja {
  margen: 1rem;
  relleno: 2rem;
  margen-arriba: 10px;
  relleno-abajo: 20px;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('margin: 1rem')
      expect(output).toContain('padding: 2rem')
      expect(output).toContain('margin-top: 10px')
      expect(output).toContain('padding-bottom: 20px')
    })

    it('should transform border properties', () => {
      const input = `.elemento {
  borde: 1px solido negro;
  borde-radio: 5px;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('border: 1px solid black')
      expect(output).toContain('border-radius: 5px')
    })

    it('should transform pseudo-classes', () => {
      const input = `.boton:encima {
  color-fondo: azul;
}
.enlace:activo {
  color: rojo;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain(':hover')
      expect(output).toContain(':active')
    })

    it('should transform pseudo-elements', () => {
      const input = `.elemento::antes {
  contenido: "";
}
.elemento::despues {
  contenido: "";
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('::before')
      expect(output).toContain('::after')
    })

    it('should transform @media queries', () => {
      const input = `@medios (minimo-ancho: 768px) {
  .contenedor {
    ancho: 100%;
  }
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('@media')
      expect(output).toContain('min-width')
      expect(output).toContain('width: 100%')
    })

    it('should transform @keyframes', () => {
      const input = `@fotogramas deslizar {
  from {
    opacidad: 0;
  }
  to {
    opacidad: 1;
  }
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('@keyframes')
      expect(output).toContain('opacity: 0')
      expect(output).toContain('opacity: 1')
    })

    it('should transform CSS values', () => {
      const input = `.elemento {
  mostrar: bloque;
  posicion: relativo;
  visibilidad: oculto;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('display: block')
      expect(output).toContain('position: relative')
      expect(output).toContain('visibility: hidden')
    })

    it('should transform properties with ñ (tamaño)', () => {
      const input = `.elemento {
  fuente-tamaño: 16px;
  fondo-tamaño: cubrir;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('font-size: 16px')
      expect(output).toContain('background-size: cover')
    })

    it('should transform newly translated properties', () => {
      const input = `.elemento {
  fuente-variante: normal;
  texto-decoracion-grosor: 2px;
  transicion-propiedad: todo;
  lista-estilo-tipo: disco;
  vacio-celdas: oculto;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('font-variant: normal')
      expect(output).toContain('text-decoration-thickness: 2px')
      expect(output).toContain('transition-property: all')
      expect(output).toContain('list-style-type: disc')
      expect(output).toContain('empty-cells: hidden')
    })

    it('should transform grid row properties', () => {
      const input = `.elemento {
  cuadricula-fila: 1;
  fila-espacio: 10px;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('grid-row: 1')
      expect(output).toContain('row-gap: 10px')
    })

    it('should transform color names', () => {
      const input = `.elemento {
  color: azul;
  fondo-color: rojo;
  borde-color: verde-oscuro;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('color: blue')
      expect(output).toContain('background-color: red')
      expect(output).toContain('border-color: darkgreen')
    })
  })

  describe('CSS to EsCSS', () => {
    it('should transform basic properties', () => {
      const input = `.card {
  display: flex;
  width: 100%;
}`

      const output = compile(input, { from: 'css', to: 'escss' })

      expect(output).toContain('mostrar: flex')
      expect(output).toContain('ancho: 100%')
    })

    it('should transform pseudo-classes', () => {
      const input = `.button:hover {
  background-color: blue;
}`

      const output = compile(input, { from: 'css', to: 'escss' })

      expect(output).toContain(':encima')
    })

    it('should transform @media queries', () => {
      const input = `@media (min-width: 768px) {
  .container {
    width: 100%;
  }
}`

      const output = compile(input, { from: 'css', to: 'escss' })

      expect(output).toContain('@medios')
      expect(output).toContain('minimo-ancho')
    })

    it('should transform properties to ñ tokens', () => {
      const input = `.element {
  font-size: 16px;
  background-size: cover;
}`

      const output = compile(input, { from: 'css', to: 'escss' })

      expect(output).toContain('fuente-tamaño: 16px')
      expect(output).toContain('fondo-tamaño: cubrir')
    })
  })

  describe('Edge cases', () => {
    it('should preserve unknown properties', () => {
      const input = `.elemento {
  --custom-property: value;
  unknown-property: test;
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('--custom-property: value')
      expect(output).toContain('unknown-property: test')
    })

    it('should preserve values with functions', () => {
      const input = `.elemento {
  ancho: calc(100% - 20px);
  fondo-imagen: url("test.jpg");
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('width: calc(100% - 20px)')
      expect(output).toContain('background-image: url("test.jpg")')
    })

    it('should return same content when from equals to', () => {
      const input = `.elemento { display: flex; }`

      const output = compile(input, { from: 'css', to: 'css' })

      expect(output).toBe(input)
    })

    it('should handle ñ in media query properties', () => {
      const input = `@medios (maximo-ancho: 768px) {
  .elemento {
    fuente-tamaño: 14px;
  }
}`

      const output = compile(input, { from: 'escss', to: 'css' })

      expect(output).toContain('@media')
      expect(output).toContain('max-width: 768px')
      expect(output).toContain('font-size: 14px')
    })

    it('should handle empty input', () => {
      const output = compile('', { from: 'escss', to: 'css' })
      expect(output).toBe('')
    })
  })
})
