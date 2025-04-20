const timeout = setTimeout(() => {
  console.log('timeout')
})

const interval = setInterval(() => {
  console.log('interval')
})

console.log(isNaN('a'))

clearTimeout(timeout)

clearInterval(interval)

alert('alert')

prompt('prompt')

confirm('confirm')

fetch('https://jsonplaceholder.typicode.com/todos/1').then((respuesta) => { return respuesta.json() })

console.log(decodeURI('https://jsonplaceholder.typicode.com/todos/1'))

console.log(decodeURIComponent('https%3A%2F%2Fjsonplaceholder.typicode.com%2Ftodos%2F1'))

console.log(encodeURI('https://jsonplaceholder.typicode.com/todos/1'))

console.log(encodeURIComponent('https://jsonplaceholder.typicode.com/todos/1'))
