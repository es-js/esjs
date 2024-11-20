import {
    replaceExpressionMethods,
    replaceInstanceof,
    replaceObjectStaticProperties,
    replaceObjectStaticMethods,
    replaceObjects,
  } from '../utils'

export const report = () => 'Converts Documento methods to JavaScript'

export const methods = new Map<string, string>([
    ['adoptarNodo', 'adoptNode'],
    ['agregar', 'append'],
    ['temasNavegador', 'browsingTopics'],
    ['posicionCursorPunto', 'caretPositionFromPoint'],
    ['rangoCursorPunto', 'caretRangeFromPoint'],
    ['crearAtributo', 'createAttribute'],
    ['crearAtributoNS', 'createAttributeNS'],
    ['crearSeccionCDATA', 'createCDATASection'],
    ['crearComentario', 'createComment'],
    ['crearFragmentoDocumento', 'createDocumentFragment'],
    ['crearElemento', 'createElement'],
    ['crearElementoNS', 'createElementNS'],
    ['crearEvento', 'createEvent'],
    ['crearIteradorNodo', 'createNodeIterator'],
    ['crearInstruccionProcesamiento', 'createProcessingInstruction'],
    ['crearRango', 'createRange'],
    ['crearNodoTexto', 'createTextNode'],
    ['crearToque', 'createTouch'],
    ['crearListaToque', 'createTouchList'],
    ['crearCaminanteArboles', 'createTreeWalker'],
    ['elementoDesdePunto', 'elementFromPoint'],
    ['elementosDesdePunto', 'elementsFromPoint'],
    ['salirPantallaCompleta', 'exitFullscreen'],
    ['salirPantallaEnPantalla', 'exitPictureInPicture'],
    ['salirBloqueoPuntero', 'exitPointerLock'],
    ['obtenerAnimaciones', 'getAnimations'],
    ['obtenerElementoPorId', 'getElementById'],
    ['obtenerElementosPorNombreClase', 'getElementsByClassName'],
    ['obtenerElementosPorNombreEtiqueta', 'getElementsByTagName'],
    ['obtenerElementosPorNombreNSEtiqueta', 'getElementsByTagNameNS'],
    ['obtenerSeleccion', 'getSelection'],
    ['tieneAccesoAlmacenamiento', 'hasStorageAccess'],
    ['tieneAccesoCookiesSinParticiones', 'hasUnpartitionedCookieAccess'],
    ['importarNodo', 'importNode'],
    ['mozEstablecerElementoImagen', 'mozSetImageElement'],
    ['anteponer', 'prepend'],
    ['consultarSeleccion', 'querySelector'],
    ['consultarSelectoresTodo', 'querySelectorAll'],
    ['liberarCaptura', 'releaseCapture'],
    ['reemplazarSecundario', 'replaceChildren'],
    ['solicitarAccesoAlmacenamiento', 'requestStorageAccess'],
    ['solicitarAccesoAlmacenamientoPara', 'requestStorageAccessFor'],
    ['iniciarVerTransicion', 'startViewTransition'],
    ['crearExpresion', 'createExpression'],
    ['crearSolucionarNS', 'createNSResolver'],
    ['evaluar', 'evaluate'],
    ['cerrar', 'close'],
    ['ejecComando', 'execCommand'],
    ['obtenerElementosPorNombre', 'getElementsByName'],
    ['estaEnfocado', 'hasFocus'],
    ['abrir', 'open'],
    ['consultarComandoActivo', 'queryCommandEnabled'],
    ['escribir', 'write'],
    ['escribirEn', 'writeln']
])

export const staticMethods = new Map<string, string>([
  ['analizarHTMLInseguro', 'parseHTMLUnsafe']
])

export const properties = new Map<string, string>([
  ['elementoActivo', 'activeElement'],
  ['hojasEstiloAdoptadas', 'adoptedStyleSheets'],
  ['cuerpo', 'body'],
  ['caracteresEstablecidos', 'characterSet'],
  ['longitudElementosSecundarios', 'childElementCount'],
  ['secundarios', 'children'],
  ['modoEstricto', 'compatMode'],
  ['tipoContenido', 'contentType'],
  ['scriptActual', 'currentScript'],
  ['tipoDoc', 'doctype'],
  ['elementoDocumento', 'documentElement'],
  ['documentoURI', 'documentURI'],
  ['incrustados', 'embeds'],
  ['politicaCaracteristicas', 'featurePolicy'],
  ['primerElementoSecundario', 'firstElementChild'],
  ['fuentes', 'fonts'],
  ['formularios', 'forms'],
  ['fragmentoDirectivo', 'fragmentDirective'],
  ['elementoPantallaCompleta', 'fullscreenElement'],
  ['cabecera', 'head'],
  ['oculta', 'hidden'],
  ['imagenes', 'images'],
  ['implementacion', 'implementation'],
  ['ultimoElementoSecundario', 'lastElementChild'],
  ['links', 'links'],
  ['elementoImagenEnImagen', 'pictureInPictureElement'],
  ['imagenEnImagenActivo', 'pictureInPictureEnabled'],
  ['complementos', 'plugins'],
  ['bloqueoPunteroElemento', 'pointerLockElement'],
  ['preRenderizacion', 'prerendering'],
  ['scripts', 'scripts'],
  ['desplazarElemento', 'scrollingElement'],
  ['hojasEstilo', 'styleSheets'],
  ['lineaTiempo', 'timeline'],
  ['estadoVisibilidad', 'visibilityState'],
  ['cookie', 'cookie'],
  ['vistaPorDefecto', 'defaultView'],
  ['modoEditor', 'designMode'],
  ['dir', 'dir'],
  ['pantallaCompletaActiva', 'fullscreenEnabled'],
  ['ultimaModificacion', 'lastModified'],
  ['ubicacion', 'location'],
  ['estadoCarga', 'readyState'],
  ['referencia', 'referrer'],
  ['titulo', 'title'],
  ['URL', 'URL']
])

export const objects = new Map<string, string>([['Documento', 'Document']])

export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'Documento',
        to: 'Document',
        methods: staticMethods,
      }),
      ...replaceExpressionMethods({
        methods,
      }),
      ...replaceObjectStaticProperties({
        from: 'Documento',
        to: 'Document',
        properties,
      }),
      ...replaceInstanceof({
        from: 'Documento',
        to: 'Document',
      }),
      ...replaceObjects({
        objects,
      }),
    }
  }
  