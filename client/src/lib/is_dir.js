export default function isDir (type, regex = /directory|archive/) {
  return type.match(regex)
}
