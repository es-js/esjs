```esjs
funcion serieFibonacci(n) {
  si (n === 1) {
    retornar [0]
  }

  var serie = [0, 1]

  para (var i = 2; i < n; i++) {
    serie[i] = serie[i - 1] + serie[i-2]
  }

  retornar serie
}

consola.escribir(
  'Los 10 primeros números de la Serie de Fibonacci son:', 
  ...serieFibonacci(10)
)
```
