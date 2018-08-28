import http from './http'

/**
 * @param {string} dir path to get listing of
 * @returns {Array<Object>} listing of the directory
 */
export default async function ls (path, recursive) {
  try {
  	const params = { path, recursive }
    const { data } = await http.get('/ls', { params, recursive })
    return data
  } catch (e) {
    throw e
  }
}
