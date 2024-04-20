Promise.all([1, 2, 3]).then(console.log)

Promise.allSettled([1, 2, 3]).then(console.log).catch(console.error)

Promise.any([1, 2, 3]).then(console.log).catch(console.error)

Promise.race([1, 2, 3]).then(console.log).catch(console.error)

Promise.reject('error').catch(console.error)

Promise.resolve('ok').then(console.log)

