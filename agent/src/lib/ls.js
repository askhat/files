import { readdir, lstatSync, existsSync } from 'fs'
import { join } from 'path'
import { Magic, MAGIC_MIME_ENCODING } from 'mmmagic'
import unzip from './unzip'
import { tmpZips } from '../index'
import { ENCODING } from '../settings'

/**
 * Returns list of files at a given path
 * @param {string} dir a directory to list
 * @returns {Promise<Object>} representation of a directory
 */
export default function ls (path) {
  return new Promise(async (resolve, reject) => {

    path = await replaceZipPath(path)

    if (!existsSync(path)) {
      reject(new Error(`${path} does not exist`))
    }

    const stats = lstatSync(path)
    if (stats.isDirectory()) {
      readdir(path, ENCODING, (err, fileNames) => {
        if (err) reject(err)

        const files = fileNames.map(async name => {
          const filePath = join(path, name)
          const type = await detectType(filePath)
          return { name, type, path: filePath  }
        })

        Promise.all(files).then(listing => resolve(listing))
      })
    } else {
      reject(new Error(`${dir} is not a directory`))
    }
  })
}

/**
 * Retuns charset for files and 'directory' for dirs
 * @param {string} path file to be inspected
 * @returns {Promise<string>} file's type (charset)
 */
function detectType (path) {
  return new Promise((resolve, reject) => {

    const stats = lstatSync(path)
    if (stats.isDirectory()) {
      resolve('directory')
    } else if (path.match(/\.zip$/)) {
      resolve('archive')
    } else if (stats.isFile()) {
      const magic = new Magic(MAGIC_MIME_ENCODING)

      magic.detectFile(path, (err, enc) => {
        if (err) reject(err)

        resolve(enc)
      })
    }
  })
}

/**
 * Replaces occurence of path to zip with path to extracted temporary directory
 * @param {string} path raw path
 * @returns {string} replaced path
 */
async function replaceZipPath (path) {
  const zipMatch = path.match(/\.zip/)
  if (zipMatch) {
    const zipPath = path.slice(0, zipMatch.index + 4)
    const tmpZip = tmpZips.get(zipPath)
    let tmpPath
    if (tmpZip) {
      tmpPath = tmpZip
    } else {
      tmpPath = await unzip(zipPath)
    }
    return path.replace(zipPath, tmpPath)
  } else {
    return path
  }
}
