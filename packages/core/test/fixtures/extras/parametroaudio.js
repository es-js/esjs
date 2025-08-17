AudioParam;
let myaudioContexto = new AudioContext()
let mynodoGanancia = myaudioContexto.createGain()
mynodoGanancia.gain.defaultValue;
mynodoGanancia.gain.maxValue;
mynodoGanancia.gain.minValue;
mynodoGanancia.gain.value;
mynodoGanancia.gain.setValueAtTime()
mynodoGanancia.gain.linearRampToValueAtTime()
mynodoGanancia.gain.exponentialRampToValueAtTime()
mynodoGanancia.gain.setTargetAtTime()
mynodoGanancia.gain.setValueCurveAtTime()
mynodoGanancia.gain.cancelScheduledValues()
mynodoGanancia.gain.cancelAndHoldAtTime()