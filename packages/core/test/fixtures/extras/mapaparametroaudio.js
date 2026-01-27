typeof AudioParamMap;
let mycontextoAudio = new AudioContext()
let myNodo = new AudioWorkletNode(mycontextoAudio, 'mi-procesador')
let myParametros = myNodo.parameters;
myParametros.size;
myParametros.entries()
myParametros.forEach()
myParametros.get()
myParametros.has()
myParametros.keys()
myParametros.values()