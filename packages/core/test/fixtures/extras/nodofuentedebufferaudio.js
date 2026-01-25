typeof AudioBufferSourceNode;
let myContexto = new AudioContext()
let myNodo = myContexto.createBufferSource()
myNodo.buffer;
myNodo.detune;
myNodo.loop;
myNodo.loopStart;
myNodo.loopEnd;
myNodo.playbackRate;
myNodo.start()