const defaultIndent = 2;
export default function jsonFile(process, { replacer = null, indent = defaultIndent } = {}) {
  return (contents, ...rest) => JSON.stringify(process(JSON.parse(contents || '{}'), ...rest), replacer, indent);
}
