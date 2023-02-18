import { describe, expect, it } from 'vitest'
import { unifyImports } from '../src/composables/utils'

describe('utils', () => {
  it('unify duplicated imports', () => {
    const imports = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'
import { afirmarIguales, assert, pruebas } from '@es-js/prueba'`

    const expected = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('unify imports', () => {
    const imports = `import { pruebas, afirmar, assert, afirmarIguales } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'
import { afirmarObjetosIguales } from '@es-js/prueba'`

    const expected = `import { afirmar, afirmarIguales, afirmarObjetosIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('doesnt unify imports if not needed', () => {
    const imports = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
 import { Terminal } from '@es-js/terminal'`

    const expected = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('works with cdn imports', () => {
    const imports = `import { Terminal } from '@es-js/terminal'
import { tirarPapeles } from 'https://cdn.esjs.dev/JYWwDg9gTgLgBAYwgOwGYFMY2HVUIhwDkAFlmAM4BcA9DQgCbIB0FA1gJ5gCGCbzDdADd63ZEO4UAtEjSZsRANwAoZegAekWNyi4ArsgTAUcbFB0AFbmHQAbdBQAUDPeaMoAosgCywW8Ap0AHMDBggKAEo4AG9lOEQUCnhUYGQ4AF44ADF0BBJuZm4SaG5HKIBqOBc3Y2QvX39AkOQwilV4hxhuACN7BHQoAElkGAGJWwhHOPj9Q1qymOmZuAocRxy8gqKShYA+TJTkKNjl5ahMaGQdJZmAX3bT2QwsYEcT0-ieWGAEewBhCAGGBUOAAdgANDdlmIgvYQQA2AAMkI+8QoYHO3AYIIArDiUajoMAgqkQdE4OoQYi4PcPrcIiooQk5C83kzPjpsL90ACgSCIey4DC4XAAIwAJmRgvRmOxcDxBI+RJJyDJFJBoppTPpKmWt0VYoAzIbQdMIsp7kA'
import tiza from 'https://cdn.jsdelivr.net/npm/@es-js/tiza@0.0.2/+esm'
import centrar from 'https://cdn.skypack.dev/align-text'`

    const expected = `import tiza from 'https://cdn.jsdelivr.net/npm/@es-js/tiza@0.0.2/+esm'
import centrar from 'https://cdn.skypack.dev/align-text'
import { Terminal } from '@es-js/terminal'
import { tirarPapeles } from 'https://cdn.esjs.dev/JYWwDg9gTgLgBAYwgOwGYFMY2HVUIhwDkAFlmAM4BcA9DQgCbIB0FA1gJ5gCGCbzDdADd63ZEO4UAtEjSZsRANwAoZegAekWNyi4ArsgTAUcbFB0AFbmHQAbdBQAUDPeaMoAosgCywW8Ap0AHMDBggKAEo4AG9lOEQUCnhUYGQ4AF44ADF0BBJuZm4SaG5HKIBqOBc3Y2QvX39AkOQwilV4hxhuACN7BHQoAElkGAGJWwhHOPj9Q1qymOmZuAocRxy8gqKShYA+TJTkKNjl5ahMaGQdJZmAX3bT2QwsYEcT0-ieWGAEewBhCAGGBUOAAdgANDdlmIgvYQQA2AAMkI+8QoYHO3AYIIArDiUajoMAgqkQdE4OoQYi4PcPrcIiooQk5C83kzPjpsL90ACgSCIey4DC4XAAIwAJmRgvRmOxcDxBI+RJJyDJFJBoppTPpKmWt0VYoAzIbQdMIsp7kA'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })
})
