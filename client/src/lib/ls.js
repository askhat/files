import http from './http'

/**
 * @param {string} dir path to get listing of
 * @returns {Array<Object>} listing of the directory
 */
export default async function ls (path) {
  try {
  	const params = { path }
    const { data } = await http.get('/ls', { params })
    return data
  } catch (e) {
    throw e
  }
}
