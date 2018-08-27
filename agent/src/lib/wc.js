import { readFile } from 'fs'

/**
 * Total number of words in a file
 * @param {string} path path to file
 * @returns {Object}
 */
export default function wc (path) {
  return new Promise(async (resolve, reject) => {
    readFile(path, 'utf8', (err, contents) => {
      if (err) reject(err)
      const stats = counter(contents)
      resolve(stats)
    })
  })
}

function counter (str) {
  str = str.toLowerCase().replace(/[\W_]+/g, ' ')
  const uniqueWords = str
    .split(' ')
    .filter(Boolean)
    .filter((w, i, a) => a.indexOf(w) === i && w)

  return uniqueWords.map(word => {
    const regexp = new RegExp(word, 'g')
    const count = (str.match(regexp) || []).length
    return [ word, count ]
  }).sort((a, b) => b[1] - a[1])
}
