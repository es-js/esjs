AnalyserNode;
let myContexto = new AudioContext()
let myNodo = myContexto.createAnalyser()
myNodo.fftSize;
myNodo.frequencyBinCount;
myNodo.smoothingTimeConstant;
myNodo.minDecibels;
myNodo.maxDecibels;
myNodo.getFloatTimeDomainData()
myNodo.getByteTimeDomainData()
myNodo.getFloatFrequencyData()
myNodo.getByteFrequencyData()