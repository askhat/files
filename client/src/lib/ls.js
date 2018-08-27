import http from './http'

const HOME_DIR = process.env['HOME_DIR']

/**
 * @param {string} dir path to get listing of
 * @returns {Array<Object>} listing of the directory
 */
export default async function ls (dir = HOME_DIR) {
  try {
    const { data } = await http.put('/ls', { path: dir })
    const { path, listing } = data
    return { path, listing }
  } catch (e) {
    throw e
  }
}
