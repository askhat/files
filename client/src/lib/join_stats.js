/**
 * @param {Array<Array>} statsArr array with multiple files stats
 * @return {Array} joined stats
 */
export default function joinStats (statsArr) {
  return statsArr.reduce((acc = [], stats) => {
    stats.forEach(word => {
      const existing = acc.find(w => w[0] === word[0])
      if (existing) {
        existing[1] += word[1]
      } else {
        acc.push(word)
      }
    })
    return acc
  }, [])
}