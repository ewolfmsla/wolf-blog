const posts = [1, 12, 3, 8, 9]

posts.forEach(i => console.log(i))

const x = posts.slice(0, 2).concat(posts.slice(3, posts.length))

const newVal = 5

const y = [...x, newVal].sort()


console.log(x)
console.log(y)

const stuff = [1]
const deletedStuff = stuff.slice(0, 1)
console.log('deletedStuff = ', deletedStuff)