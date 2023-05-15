import './popup.css'
const getLocal = (x) => localStorage.getItem(x)
const getForId = (x) => document.getElementById(x)
const getTrans = (x) => chrome.i18n.getMessage(x)

const checkLanguage = () => {
  if (getTrans('isEn') == 'false') {
    getForId('symbolsCheckBoxSpan').innerHTML = getTrans('symbols')
    getForId('copyButton').innerHTML = getTrans('copy')
  }
}

const checkLocalStorage = () => {
  if (getLocal('length') === null) {
    getForId('range').setAttribute('value', '25')
    getForId('length').value = '25'
  } else {
    getForId('range').setAttribute('value', getLocal('length'))
    getForId('length').value = getLocal('length')
  }

  if (getLocal('symbols') === 'true') {
    getForId('symbolsCheckBox').setAttribute('checked', 'true')
  }
}

const createPassword = () => {
  const length = getForId('length').value
  const symbols = getForId('symbolsCheckBox').checked
  let str = '01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if (symbols === true) str = str.concat('!@#$%^&*()_+-=[]{}:./?')
  let password = ''
  for (var i = 0; i < length; i++) {
    password = password.concat(str[Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) * str.length)])
  }
  getForId('password').innerHTML = password
}

const changeRange = () => {
  if (getForId('length').value == '') {
    getForId('range').value = 0
  } else
    getForId('range').value = getForId('length').value
}

const changeLength = () => {
  getForId('length').value = getForId('range').value
}

const saveLocal = () => {
  localStorage.setItem('length', getForId('range').value)
  localStorage.setItem('symbols', getForId('symbolsCheckBox').checked)
}

const createPasswordByLength = () => {
  changeRange()
  createPassword()
  saveLocal()
}

const createPasswordByRange = () => {
  changeLength()
  createPassword()
  saveLocal()
}

const createPasswordBysymbolsCheckBox = () => {
  createPassword()
  saveLocal()
}

const copy = () => {
  var pw = getForId('password').innerText
  navigator.clipboard.writeText(pw)
}

const minus = () => {
  getForId('length').value--
  createPasswordByLength()
}

const plus = () => {
  getForId('length').value++
  createPasswordByLength()
}

getForId('length').oninput = createPasswordByLength
getForId('range').oninput = createPasswordByRange
getForId('symbolsCheckBox').onchange = createPasswordBysymbolsCheckBox
getForId('minus').onclick = minus
getForId('plus').onclick = plus
getForId('copyButton').onclick = copy

document.addEventListener('DOMContentLoaded', () => {
  checkLanguage()
  checkLocalStorage()
  createPassword()
})