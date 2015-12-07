export default function jsonFile(process, { replacer = null, indent = 2 } = {}) {
  return (contents, ...rest) => JSON.stringify(process(JSON.parse(contents || '{}'), ...rest), replacer, indent);
}
