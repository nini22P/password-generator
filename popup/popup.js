function createpassword(){
    var length = document.getElementById('range').value;
    var symbols = document.getElementById('symbolscheckbox').checked;
    var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(symbols === true) str += '!@#$%^&*()_+-=[]{}:./?';
    var passwords = '';
    for(var i = 0; i < length; i++){
        passwords += str[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)  * str.length)];
    }
    document.getElementById('password').innerHTML = passwords;
}

function checklength(){
    if(localStorage.getItem('length') === null) {
        document.getElementById('range').setAttribute('value', '20');
        document.getElementById('length').innerHTML = '20';
    } else {
        document.getElementById('range').setAttribute('value', localStorage.getItem('length'));
        document.getElementById('length').innerHTML = localStorage.getItem('length');
    }
}

function changelength(){
    document.getElementById('length').innerHTML=document.getElementById('range').value;
    createpassword();
}

function savelength(){
    localStorage.setItem('length', document.getElementById('range').value);
}

function checksymbols(){
        if(localStorage.getItem('symbols') === 'true') {
            document.getElementById('symbolscheckbox').setAttribute('checked', 'true');
        }
}

function changesymbols(){
    localStorage.setItem('symbols', document.getElementById('symbolscheckbox').checked);
    createpassword();
}

function copy(){
    var pw = document.getElementById('password').innerText;
    navigator.clipboard.writeText(pw);
}

checklength();
checksymbols();
createpassword();
document.getElementById('range').oninput = changelength;
document.getElementById('range').onmouseup = savelength;
document.getElementById('symbolscheckbox').onchange = changesymbols;
document.getElementById('copy').onclick = copy;