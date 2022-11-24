/*
  Usages:
    clx(null, false, 'bar', undefined, 0, 1, { baz: null }, '') => "bar 1"
    clx('test', 1, styles.container, ['arr1', 'arr2', styles.show], { obj1: true, obj2: 0, [styles['one-liner']]: 1 }) => "test 1 Select_container__1tADn arr1 arr2 Select_show__SNHV4 obj1 Select_one-liner__80OPS"
*/
export default function clx (...args) {
  let classes = []

  for (var i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue

    const argType = typeof arg

    if (['string', 'number'].includes(argType)) {
      classes.push(arg)
    } else if (Array.isArray(arg) && arg.length) {
        const arrClx = clx.apply(null, arg)
        if (arrClx) {
          classes.push(arrClx)
        }
    } else if (argType === 'object') {
      for (let key in arg) {
        if (arg[key]) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}
