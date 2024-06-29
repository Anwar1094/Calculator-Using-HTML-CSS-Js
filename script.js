var MainDiv = document.querySelectorAll("div.Calculator")

let Scibtns = [
    ["2nd", "π", "e", "AC", "C"],
    ["x²", "√", "xʸ", "2ˣ", "ln"],
    ["1/x", "(", ")", "n!", "/"],
    ["|x|", "7", "8", "9", "*"],
    ["exp", "4", "5", "6", "-"],
    ["log", "1", "2", "3", "+"],
    ["mod", "+/-", "0", ".", "="]
]

let ScibtnsII = [
    ["2ND", "π", "e", "AC", "C"],
    ["x³", "∛", "x√y", "10ˣ", "eˣ"],
    ["1/x", "(", ")", "n!", "/"],
    ["|x|", "7", "8", "9", "*"],
    ["exp", "4", "5", "6", "-"],
    ["logᵧx", "1", "2", "3", "+"],
    ["mod", "+/-", "0", ".", "="]
]

let Basicbtns = [
    ["x²", "+/-", "√", "x³"],
    ["AC", "C", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["00", "0", ".", "="]
]

MainDiv.forEach(element => {
    for (let i = 0; i < 7; i++) {
        let div = element.append(createDiv());
    }
})
setBasicButtons();

function createDiv() {
    div = document.createElement('div');
    div.className = "BasicCalc"
    return div;
}

function factorial(num) {
    if (num == 0 || num == 1)
        return 1;
    return num * factorial(num - 1);
}

function createButton(text, cls = null) {
    let btn = document.createElement('button');
    btn.appendChild(document.createTextNode(text))
    btn.id = "btn";
    if (cls != null) {
        btn.className = cls
    }
    return btn;
}

function modifyCSS() {
    document.querySelectorAll('button').forEach(button => {
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.fontSize = '18px';
    })
    document.getElementById('input').style.width = '335px';
}

function setBasicButtons() {
    const divs = document.querySelectorAll("div.BasicCalc");
    for (let i = 0; i < divs.length - 1; i++) {
        for (let j = 0; j < Basicbtns[i].length; j++) {
            if (Basicbtns[i][j] == "=")
                divs[i].appendChild(createButton(Basicbtns[i][j], "equalbtn"));
            else if (Basicbtns[i][j] == "%" || Basicbtns[i][j] == "/" || Basicbtns[i][j] == "+" ||
                Basicbtns[i][j] == "-" || Basicbtns[i][j] == "*" || Basicbtns[i][j] == "C" ||
                Basicbtns[i][j] == "AC") {
                divs[i].appendChild(createButton(Basicbtns[i][j], "operatorbtn"));
            } else if (Basicbtns[i][j] == "2nd" || Basicbtns[i][j] == "+/-" || Basicbtns[i][j] == "M+" ||
                Basicbtns[i][j] == "M-") {
                divs[i].appendChild(createButton(Basicbtns[i][j], "specialbtn"));
            } else {
                divs[i].appendChild(createButton(Basicbtns[i][j]));
            }
        }
    }
}

function setInput(value) {
    text = value;
    document.getElementById("lbl").value = text;
}

function changeButton(type) {
    document.querySelectorAll('button').forEach(button => {
        button.remove();
    });
    let divs = document.querySelectorAll("div.BasicCalc");
    if (type == "2nd") {
        for (let i = 0; i < divs.length; i++) {
            for (let j = 0; j < ScibtnsII[i].length; j++) {
                if (ScibtnsII[i][j] == "=")
                    divs[i].appendChild(createButton(ScibtnsII[i][j], "equalbtn"));
                else if (Scibtns[i][j] in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] == false)
                    divs[i].appendChild(createButton(ScibtnsII[i][j], "operatorbtn"));
                else
                    divs[i].appendChild(createButton(ScibtnsII[i][j]));
            }
        }
    } else {

        for (let i = 0; i < divs.length; i++) {
            for (let j = 0; j < ScibtnsII[i].length; j++) {
                if (Scibtns[i][j] == "=")
                    divs[i].appendChild(createButton(Scibtns[i][j], "equalbtn"));
                else if (Scibtns[i][j] in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] == false)
                    divs[i].appendChild(createButton(Scibtns[i][j], "operatorbtn"));
                else
                    divs[i].appendChild(createButton(Scibtns[i][j]));
            }
        }
    }
    modifyCSS();
}

let input = document.getElementById('input');
let string = "0";
let text = "";

function evaluate() {
    if (text[text.length - 1] == "^") {
        text += string;
        string = String(Math.pow(parseFloat(text.substring(0, text.length - 1)), parseFloat(string)));
        input.value = string;
    } else if (text[text.length - 1] == "√") {
        text += string;
        string = String(Math.pow(parseFloat(text.substring(0, text.length - 1)), 1 / parseFloat(string)));
        input.value = string;
    } else if (text.substring(0, text.length - 1) == "logᵧ") {
        text += string;
        string = String(Math.log(parseFloat(text.substring(4, text.length - 1))) / Math.log(parseFloat(string)));
        input.value = string;
    } else {
        text = text + string;
        string = String(eval(text));
        input.value = string;
    }
    setInput(text);
    text = "";
}

function addOprt(oprt) {
    if (string != "0") {
        text += string + oprt;
        string = "0";
        setInput(text);
    } else {
        text = text.substring(0, text.length - 1);
        if (text == "")
            text = 0;
        text += oprt;
        string = "0";
        setInput(text);
    }
}
document.body.addEventListener("keyup", (ev) => {
    if (ev.key == "Enter" || ev.key == "=") {
        evaluate();
    } else if (ev.key in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
        if (string == "0")
            string = ev.key;
        else
            string += ev.key;
        input.value = string;
    } else if (ev.key == "+" || ev.key == "-" || ev.key == "*" || ev.key == "/" ||
        ev.key == "%") {
        addOprt(ev.key);
    } else if (ev.key == ".") {
        if (string.indexOf(".") == -1)
            string += ev.key;
        input.value = string;
    } else if (ev.code == "Escape") {
        text = "";
        string = "0";
        input.value = string;
        setInput(text);
    } else if (ev.key == "Backspace") {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
})

function execute(choice = "Basic") {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                if (e.target.innerHTML == "=") {
                    evaluate();
                } else if (e.target.innerHTML == "AC") {
                    setInput("");
                    string = "0";
                    input.value = string;
                } else if (e.target.innerHTML == "C") {
                    string = string.substring(0, string.length - 1);
                    input.value = string;
                } else if (e.target.innerHTML == Basicbtns[0][0]) {
                    setInput(string + "²");
                    string = String(eval(string * string));
                    input.value = string;
                } else if (e.target.innerHTML == Basicbtns[0][1]) {
                    string = -(string);
                    input.value = string;
                } else if (e.target.innerHTML == Basicbtns[0][2]) {
                    setInput("√" + string)
                    string = String(Math.sqrt(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == Basicbtns[0][3]) {
                    setInput(string + "³");
                    string = String(Math.pow(parseFloat(string), 3));
                    input.value = string;
                } else if (e.target.innerHTML == "+" || e.target.innerHTML == "-" ||
                    e.target.innerHTML == "*" || e.target.innerHTML == "/" ||
                    e.target.innerHTML == "%") {
                    if (string != "0") {
                        text += string + e.target.innerHTML;
                        string = "0";
                        setInput(text);
                    } else {
                        text = text.substring(0, text.length - 1);
                        if (text == "")
                            text = 0;
                        text += e.target.innerHTML;
                        string = "0";
                        setInput(text);
                    }
                } else if (e.target.innerHTML == "00") {
                    if (string != "0") {
                        string += e.target.innerHTML;
                    }
                    input.value = string;
                } else if (e.target.innerHTML == "π") {
                    if (string == "0")
                        string = ""
                    string += String(Math.PI);
                    input.value = string;
                } else if (e.target.innerHTML == "e") {
                    if (string == "0")
                        string = "";
                    string += String(Math.E);
                    input.value = string;
                } else if (e.target.innerHTML == "10ˣ") {
                    string = String(Math.pow(10, parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "ln") {
                    string = String(Math.log(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "1/x") {
                    string = String(eval("1/" + string));
                    input.value = string;
                } else if (e.target.innerHTML == "log") {
                    string = String(Math.log10(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "n!") {
                    string = String(factorial(parseInt(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "|x|") {
                    string = String(Math.abs(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "exp") {
                    if (string == "0")
                        string = String(Math.exp(parseFloat(string)));
                    string += String(Math.exp(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "mod") {
                    text = (string + e.target.innerHTML);
                    setInput(text);
                    text = (string + " % ");
                    string = "0"
                } else if (e.target.innerHTML == "(" || e.target.innerHTML == ")") {
                    if (string == "0")
                        string = "";
                    string += e.target.innerHTML;
                    input.value = string;
                } else if (e.target.innerHTML == "2nd") {
                    changeButton(e.target.innerHTML);
                    execute();
                } else if (e.target.innerHTML == "2ND") {
                    changeButton("2ND");
                    execute();
                } else if (e.target.innerHTML == "xʸ") {
                    text = string + "^";
                    setInput(text);
                    string = "0"
                } else if (e.target.innerHTML == "2ˣ") {
                    string = String(Math.pow(2, parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "∛") {
                    string = String(Math.cbrt(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "x√y") {
                    text = string + "√";
                    setInput(text);
                    string = "0"
                } else if (e.target.innerHTML == "eˣ") {
                    string = String(Math.exp(parseFloat(string)));
                    input.value = string;
                } else if (e.target.innerHTML == "logᵧx") {
                    text = "logᵧ" + string;
                    setInput(text);
                    string = "0"
                } else {
                    if (string[0] == "0" && e.target.innerHTML != "." && string.length == 1)
                        string = e.target.innerHTML;
                    else if (string.indexOf(".") != -1 && string.length > 1 && e.target.innerHTML == ".")
                        string = string;
                    else
                        string += e.target.innerHTML;
                    input.value = string;
                }
            } catch (err) {
                console.log(err);
                input.value = 'Error';
            }
        })
    })
}
document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13: //Your Code Here (13 is ascii code for 'ENTER')
            break;
    }
}
let choice = document.getElementById("selectCalc")
choice.addEventListener("change", function() {
    if (choice.value == "Scientific") {
        const btns = document.querySelectorAll('button')
        btns.forEach(button => {
            button.remove();
        })
        const divs = document.querySelectorAll("div.BasicCalc");
        for (let i = 0; i < divs.length; i++) {
            for (let j = 0; j < Scibtns[i].length; j++) {
                if (Scibtns[i][j] == "=")
                    divs[i].appendChild(createButton(Scibtns[i][j], "equalbtn"));
                else if (Scibtns[i][j] in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] == false)
                    divs[i].appendChild(createButton(Scibtns[i][j], "operatorbtn"));
                else
                    divs[i].appendChild(createButton(Scibtns[i][j]));
            }
        }
        modifyCSS();
        execute();
    } else {
        document.querySelectorAll('button').forEach(button => {
            button.remove();
        });
        const divs = document.querySelectorAll('divs');
        setBasicButtons();
        document.getElementById('input').style.width = '305px';
        execute();
    }
});
execute();