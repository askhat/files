import http from './http'

/**
 * @param {string} path text file location
 * @returns {Object} path of the file and array unique words count
 */
export default async function wc (path) {
  try {
  	const params = { path }
    const { data } = await http.get('/wc', { params })
    return data
  } catch (e) {
    throw e
  }
}
