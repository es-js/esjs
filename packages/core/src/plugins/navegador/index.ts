import { 
  replaceObjectStaticMethods,
  replaceObjectStaticProperties
} from '../utils'
export const report = () => 'Converts navegador to navigator'

export const properties = new Map<string, string>([
    ["credenciales", "credentials"],
    ["memoriaDispositivo", "deviceMemory"],
    ["concurrenciaHardware", "hardwareConcurrency"],
    ["idioma", "language"],
    ["idiomas", "languages"],
    ["puntosContactoMax", "maxTouchPoints"],
    ["enLinea", "onLine"],
    ["visorPdfHabilitado", "pdfViewerEnabled"],
    ["agenteUsuario", "userAgent"],
    ["controladorWeb", "webdriver"],
    ["conexion", "connection"],
    ["cookieHabilitada", "cookieEnabled"],
    ["geoLocalizacion", "geolocation"],
    ["teclado", "keyboard"],
    ["claves", "locks"],
    ["capacidadesMedio", "mediaCapabilities"],
    ["dispositivosMultimedia", "mediaDevices"],
    ["sesionMultimedia", "mediaSession"],
    ["permisos", "permissions"],
    ["presentacion", "presentation"],
    ["servicioTrabajo", "serviceWorker"],
    ["almacenamiento", "storage"],
    ["activacionUsuario", "userActivation"],
    ["datosAgenteUsuario", "userAgentData"],
    ["controlesVentanaSuperpuestos", "windowControlsOverlay"],
    ["hid", "hid"],
    ["serial", "serial"],
    ["re", "xr"]
])

export const objects = new Map<string, string>([['navegador', 'navigator']])

export const methods = new Map<string, string>([
  ["puedeCompartir", "canShare"],
  ["borrarInsigniaApp", "clearAppBadge"],
  ["obtenerBateria", "getBattery"],
  ["registrarControladorProtocolo", "registerProtocolHandler"],
  ["solicitarAccesoSistemaClavesMultimedia", "requestMediaKeySystemAccess"],
  ["solicitarAccesoMIDI", "requestMIDIAccess"],
  ["enviarBeacon", "sendBeacon"],
  ["establecerInsigniaApp", "setAppBadge"],
  ["compartir", "share"],
  ["vibrar", "vibrate"]
])

export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'navegador',
        to: 'navigator',
        methods,
      }),
      ...replaceObjectStaticProperties({
        from: 'navegador',
        to: 'navigator',
        properties,
      })
    }
}