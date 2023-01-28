function checkLanguage() {
  if (chrome.i18n.getMessage("isEn") == "false") {
    document.getElementById("symbolsCheckBoxSpan").innerHTML =
      chrome.i18n.getMessage("symbols");
    document.getElementById("copyButton").innerHTML =
      chrome.i18n.getMessage("copy");
  }
}

function checkLocalStorage() {
  if (localStorage.getItem("length") === null) {
    document.getElementById("range").setAttribute("value", "25");
    document.getElementById("length").value = "25";
  } else {
    document
      .getElementById("range")
      .setAttribute("value", localStorage.getItem("length"));
    document.getElementById("length").value = localStorage.getItem("length");
  }

  if (localStorage.getItem("symbols") === "true") {
    document.getElementById("symbolsCheckBox").setAttribute("checked", "true");
  }
}

function createPassword() {
  var length = document.getElementById("length").value;
  var symbols = document.getElementById("symbolsCheckBox").checked;
  var str =
    "01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (symbols === true) str += "!@#$%^&*()_+-=[]{}:./?";
  var passwords = "";
  for (var i = 0; i < length; i++) {
    passwords +=
      str[
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
            str.length
        )
      ];
  }
  document.getElementById("password").innerHTML = passwords;
}

function changeRange() {
  if (document.getElementById("length").value == "") {
    document.getElementById("range").value = 0;
  } else
    document.getElementById("range").value =
      document.getElementById("length").value;
}

function changeLength() {
  document.getElementById("length").value =
    document.getElementById("range").value;
}

function saveLength() {
  localStorage.setItem("length", document.getElementById("range").value);
}

function saveSymbols() {
  localStorage.setItem(
    "symbols",
    document.getElementById("symbolsCheckBox").checked
  );
}

function createPasswordByLength() {
  changeRange();
  saveLength();
  createPassword();
}

function createPasswordByRange() {
  changeLength();
  saveLength();
  createPassword();
}

function createPasswordBysymbolsCheckBox() {
  saveSymbols();
  createPassword();
}

function copy() {
  var pw = document.getElementById("password").innerText;
  navigator.clipboard.writeText(pw);
}

function minus() {
  document.getElementById("length").value--;
  createPasswordByLength();
}

function plus() {
  document.getElementById("length").value++;
  createPasswordByLength();
}

checkLanguage();
checkLocalStorage();
createPassword();
document.getElementById("length").oninput = createPasswordByLength;
document.getElementById("range").oninput = createPasswordByRange;
document.getElementById("symbolsCheckBox").onchange =
  createPasswordBysymbolsCheckBox;
document.getElementById("minus").onclick = minus;
document.getElementById("plus").onclick = plus;
document.getElementById("copyButton").onclick = copy;
