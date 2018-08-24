/**
 * Generates random id
 * @param {string} alphabet symbols permitted in uuid
 * @param {number} n length of uuid
 * @returns {string} unique id
 */
export default function uuidgen (alphabet = 'abcdefghijklmnopqrstuvwxyz', n = 4) {
  let alphabetLength = alphabet.length
  let string = ''
  for (let i = 0; i < n; i++) {
    string += alphabet[Math.floor(Math.random() * alphabetLength)]
  }
  return string
}
