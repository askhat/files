/**
 * Semantic UI icon name for filetype
 * @param {string} type filetype
 * @returns {string} icon name
 */
export default function fileIcon (type) {
  switch (type) {
    case 'directory':
      return 'folder'
    case 'archive':
      return 'archive'
    case 'us-ascii':
    case 'utf-8':
      return 'text file'
    default:
      return 'file'
  }
}
