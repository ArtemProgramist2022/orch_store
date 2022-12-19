const emailRegExp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]/

export function validateEmail (value: string, callback: Function) {
  if (!value) return callback(new Error('Укажите email'))
  if (!value.match(emailRegExp)) return callback(new Error('Укажите корректный email'))
  return callback()
}