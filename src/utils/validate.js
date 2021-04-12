/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
 */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }
export function validUsername(str) {
  str = str.trim()
  if (!(11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(str))) {
    return false
  } else {
    return true
  }
}

export function validPassword(str) {
  // const valid_map = ['admin', 'editor', '13200000006']
  return str.length < 6
}

export function validSno(str) {
  str = str.trim()
  if (!(/^(\d{9})$/.test(str))) {
    return false
  } else {
    return true
  }
}
