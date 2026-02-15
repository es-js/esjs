import * as apoderado from './apoderado'
import * as booleano from './booleano'
import * as cadena from './cadena'
import * as consola from './consola'
import * as documento from './documento'
import * as enterogrande from './enterogrande'
import * as fecha from './fecha'
import * as funcion from './funcion'
import * as json from './json'
import * as mate from './mate'
import * as matriz from './matriz'
import * as navegador from './navegador'
import * as numero from './numero'
import * as objetos from './objetos'
import * as promesa from './promesa'
import * as simbolo from './simbolo'
import * as soporte from './soporte'
import * as audio from './audio'
import * as contextoaudio from './contextoaudio'
import * as basecontextoaudio from './basecontextoaudio'
import * as nodoaudio from './nodoaudio'
import * as parametroaudio from './parametroaudio'
import * as mapaparametroaudio from './mapaparametroaudio'
import * as nodofuentedeaudioprogramable from './nodofuentedeaudioprogramable'
import * as nodooscilador from './nodooscilador'
import * as bufferaudio from './bufferaudio'
import * as nodofuentedebufferaudio from './nodofuentedebufferaudio'
import * as nodofuentedeaudioelementodemedios from './nodofuentedeaudioelementodemedios'
import * as nodofuentedeaudioflujodemedio from './nodofuentedeaudioflujodemedio'
import * as nodofuentedeaudiopistaflujodemedios from './nodofuentedeaudiopistaflujodemedios'
import * as nodofiltrobiquad from './nodofiltrobiquad'
import * as nodoconvolucionador from './nodoconvolucionador'
import * as nodoretraso from './nodoretraso'
import * as nodocompresordinamico from './nodocompresordinamico'
import * as nodoganancia from './nodoganancia'
import * as nodomoldeadordeonda from './nodomoldeadordeonda'
import * as ondaperiodica from './ondaperiodica'
import * as nodofiltroiir from './nodofiltroiir'
import * as nododestinodeaudio from './nododestinodeaudio'
import * as nododestinodeaudioflujodemedios from './nododestinodeaudioflujodemedios'
import * as nodoanalizador from './nodoanalizador'
import * as nododivisordecanales from './nododivisordecanales'
import * as nodofusionadordecanales from './nodofusionadordecanales'
import * as oyenteaudio from './oyenteaudio'
import * as nodopanoramico from './nodopanoramico'
import * as nodopanoramicoestereo from './nodopanoramicoestereo'
import * as procesadordeaudio from './procesadordeaudio'
import * as nodoprocesadordeaudio from './nodoprocesadordeaudio'
import * as procesadortrabajodeaudio from './procesadortrabajodeaudio'
import * as ambitoglobaldeprocesadordeaudio from './ambitoglobaldeprocesadordeaudio'
import * as contextoaudiosinconexion from './contextoaudiosinconexion'
import * as eventodefinalizaciondeaudiosinconexion from './eventodefinalizaciondeaudiosinconexion'
import * as elementohtmldemedios from './elementohtmldemedios'
import * as eventodemedioscifrados from './eventodemedioscifrados'
import * as listadepistasdeaudio from './listadepistasdeaudio'
import * as eventodepista from './eventodepista'
import * as pistadeaudio from './pistadeaudio'
import * as fuentedemedios from './fuentedemedios'
import * as reproduccionremota from './reproduccionremota'
import * as clavesmultimedia from './clavesmultimedia'
import * as listadepistasdetexto from './listadepistasdetexto'
import * as listadepistasdevideo from './listadepistasdevideo'
import * as pistadevideo from './pistadevideo'
import * as pistadetexto from './pistadetexto'
import * as listademarcadoresdepistadetexto from './listademarcadoresdepistadetexto'
import * as tipos from './tipos'
import { setToEsJS } from './utils'
import * as ventana from './ventana'

export const plugins = [
  ['consola', consola],
  ['matriz', matriz],
  ['cadena', cadena],
  ['fecha', fecha],
  ['numero', numero],
  ['promesa', promesa],
  ['mate', mate],
  ['booleano', booleano],
  ['funcion', funcion],
  ['soporte', soporte],
  ['json', json],
  ['navegador', navegador],
  ['ventana', ventana],
  ['apoderado', apoderado],
  ['simbolo', simbolo],
  ['enterogrande', enterogrande],
  ['documento', documento],
  ['audio', audio],
  ['contextoaudio', contextoaudio],
  ['basecontextoaudio', basecontextoaudio],
  ['nodoaudio', nodoaudio],
  ['parametroaudio', parametroaudio],
  ['mapaparametroaudio', mapaparametroaudio],
  ['nodofuentedeaudioprogramable', nodofuentedeaudioprogramable],
  ['nodooscilador', nodooscilador],
  ['bufferaudio', bufferaudio],
  ['nodofuentedebufferaudio', nodofuentedebufferaudio],
  ['nodofuentedeaudioelementodemedios', nodofuentedeaudioelementodemedios],
  ['nodofuentedeaudioflujodemedio', nodofuentedeaudioflujodemedio],
  ['nodofuentedeaudiopistaflujodemedios', nodofuentedeaudiopistaflujodemedios],
  ['nodofiltrobiquad', nodofiltrobiquad],
  ['nodoconvolucionador', nodoconvolucionador],
  ['nodoretraso', nodoretraso],
  ['nodocompresordinamico', nodocompresordinamico],
  ['nodoganancia', nodoganancia],
  ['nodomoldeadordeonda', nodomoldeadordeonda],
  ['ondaperiodica', ondaperiodica],
  ['nodofiltroiir', nodofiltroiir],
  ['nododestinodeaudio', nododestinodeaudio],
  ['nododestinodeaudioflujodemedios', nododestinodeaudioflujodemedios],
  ['nodoanalizador', nodoanalizador],
  ['nododivisordecanales', nododivisordecanales],
  ['nodofusionadordecanales', nodofusionadordecanales],
  ['oyenteaudio', oyenteaudio],
  ['nodopanoramico', nodopanoramico],
  ['nodopanoramicoestereo', nodopanoramicoestereo],
  ['procesadordeaudio', procesadordeaudio],
  ['nodoprocesadordeaudio', nodoprocesadordeaudio],
  ['procesadortrabajodeaudio', procesadortrabajodeaudio],
  ['ambitoglobaldeprocesadordeaudio', ambitoglobaldeprocesadordeaudio],
  ['contextoaudiosinconexion', contextoaudiosinconexion],
  [
    'eventodefinalizaciondeaudiosinconexion',
    eventodefinalizaciondeaudiosinconexion,
  ],
  ['elementohtmldemedios', elementohtmldemedios],
  ['eventodemedioscifrados', eventodemedioscifrados],
  ['listadepistasdeaudio', listadepistasdeaudio],
  ['eventodepista', eventodepista],
  ['pistadeaudio', pistadeaudio],
  ['fuentedemedios', fuentedemedios],
  ['reproduccionremota', reproduccionremota],
  ['clavesmultimedia', clavesmultimedia],
  ['listadepistasdetexto', listadepistasdetexto],
  ['listadepistasdevideo', listadepistasdevideo],
  ['pistadevideo', pistadevideo],
  ['pistadetexto', pistadetexto],
  ['listademarcadoresdepistadetexto', listademarcadoresdepistadetexto],
  ['tipos', tipos],
  ['objetos', objetos],
]

export { setToEsJS }
