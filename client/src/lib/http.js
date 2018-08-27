import axios from 'axios'
/**
 * HTTP client instance with configured `baseURL`
 */
export default axios.create({
  baseURL: process.env['AGENT_URL']
})
