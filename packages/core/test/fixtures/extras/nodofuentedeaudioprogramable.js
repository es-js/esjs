typeof AudioScheduledSourceNode;
let myContexto = new AudioContext()
let myNodoProgramable = myContexto.createOscillator()
myNodoProgramable.start()
myNodoProgramable.stop()