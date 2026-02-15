typeof AudioBuffer;
let mycontextoAudio = new AudioContext()
let myBuffer = mycontextoAudio.createBuffer()
myBuffer.sampleRate;
myBuffer.length;
myBuffer.duration;
myBuffer.numberOfChannels;
myBuffer.getChannelData()
myBuffer.copyFromChannel()
myBuffer.copyToChannel()