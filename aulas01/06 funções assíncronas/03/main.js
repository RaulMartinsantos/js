console.log(1);

queueMicrotask(() => {
  console.log(2)
})

setTimeout(() => {
  console.log(3)
},1000)

console.log(4)

Promise.resolve(true).then(() =>{ 
  console.log(5)
})