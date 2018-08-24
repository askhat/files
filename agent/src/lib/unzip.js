import os from 'os'
import { join } from 'path'
import AdmZip from 'adm-zip'
import uuidgen from './uuidgen'
import { tmpZips } from '../index'

/**
 * Extracts zip file into temp directory
 * @param {string} path zip to be extracted
 * @returns {Promise<string>} path to extracted zip contents
 */
export default function unzip (zip) {
  return new Promise(resolve => {
    const archive = new AdmZip(zip)
    const tmpdir = tmpZips.get(zip)
      || join(os.tmpdir(), `${uuidgen()}_${zip.split('/').pop().replace('zip', 'open')}`)

    archive.extractAllTo(tmpdir, true)
    tmpZips.set(zip, tmpdir)
    resolve(tmpdir)
  })
}

