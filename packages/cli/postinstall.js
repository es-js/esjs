import { consola } from 'consola'
import { colors } from 'consola/utils'
import packageJson from './package.json' assert { type: 'json' }

const version = packageJson.version || '0.0.0'

consola.log(
  `${colors.bgMagenta(colors.white(colors.bold(' EsJS ')))} CLI v${version} instalado correctamente

Puedes ejecutar ${colors.bgWhite(colors.black(' esjs '))} para comenzar a usarlo`,
)
