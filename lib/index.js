/**
 * think-collapse host entry: a minimal Cordis plugin so the loader mounts
 * this package as an entry. The real work is client-side (grouping each
 * completed turn's pre-result process behind one duration disclosure); the client half is auto-discovered from
 * package.json's `dsh.client` declaration and `exports["./client"]`.
 */
export const name = 'think-collapse'

export function apply(ctx) {
  // No host-side work. The entry exists so the client module system scans
  // this package and loads its `client/client.js` bundle.
}
