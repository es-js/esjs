typeof BiquadFilterNode;
let myContexto = new AudioContext()
let myNodo = myContexto.createBiquadFilter()
myNodo.frequency;
myNodo.detune;
myNodo.Q;
myNodo.gain;
myNodo.type;
myNodo.getFrequencyResponse()