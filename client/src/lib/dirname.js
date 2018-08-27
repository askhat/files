/**
 * @param {string} path basename
 * @returns {string} super path
 */
export default function dirname (path) {
  const pathArr = path.split('/').filter(Boolean)
  pathArr.pop()
  if (pathArr.length === 1) return '/'
  return `/${pathArr.join('/')}`
}
