
export function printCache (cache: typeof require.cache) {
  return [...new Set(
    Object.keys(cache)
      .map(dep => dep.split('node_modules/').pop())
      .map(dep => dep?.split('/').shift()) // name of the module
  )].join(', ')
}
