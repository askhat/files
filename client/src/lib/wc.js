import http from './http'

export default async function wc (path) {
  try {
    const { data } = await http.put('/wc', { path })
    return data
  } catch (e) {
    throw e
  }
}
