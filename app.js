function getId(id) {
    return document.getElementById(id);
}

function queryS(id) {
    return document.querySelector(id);
}

function querySA(id) {
    return document.querySelectorAll(id);
}

function transactions(num1, num2, operator) {
    let result;

    switch (operator) {
        case "+":
            return result = +num1 + +num2  // virgülden sonrası yoksa .00 koyma 
            break;
        case "-":
            return result = num1 - num2
            break;
        case "x":
            return result = num1 * num2
            break;
        case "÷":
            return result = num1 / num2
            break;

    }
}

function lengthControl(num) {
    if (num.length > 14) {
        queryS(".calc-screen1").style.fontSize = "30px";
        console.log(queryS(".calc-screen1").style.fontSize);
    } else {
        queryS(".calc-screen1").style.fontSize = "37px";
    }
}

let screen = getId("calc-screen");
let operatorScreen = getId("operator-screen");
let operator;
let num1 = 0;
let num2 = 0;
let num3 = 0; // num3 sıfırdan büyükse sayı girilmiş demektir ona göre operatöre basılmıuşsa işlemi başlatacak
let opFlag = 0; // operatör seçildikten sonra tekrar sayı girilirse bu 1 olur yoksa sayı girilene kadar 0 kalır böylece operatör işareti değiştirilebilir 
let islem = 0;
let first=0; // işleme sıfırdan başlıyoruz daha hiç işlem yapılmadı ekranda yazılan default olarak gözüken sıfırı işleme alma onu yok kabul et

getId("calc-body")
    .addEventListener("click", (e) => {

        if (e.target.classList.contains("btnNo")) {
           
           if (screen.innerText.length <= 16) {  // nokta var ise numbere çevirmeden aldık nokta tok ise number ile aldık böylece sayının önünde default gelen sıfır işleme alınmamış oldu
             
                first ? screen.innerText =  screen.innerText + e.target.innerText : screen.innerText = e.target.innerText;
                num3 = 1;
                first = 1;
                lengthControl(screen.innerText)
           }
        }
    
    //4 işlem
    if (e.target.classList.contains("btnIslem")) {
    let lastOp = ["+", "-", "x", "÷"];
    let process = e.target.innerText
    if ((lastOp.includes(process)) && opFlag == 0) {//opFlag 0 ise daha ilk defa işlem yapılıyor yani ilk toplama işlemi
        if (num3 == 0) {
            operatorScreen.innerText = num1 + process;
            islem = process,
                screen.innerText = "0";
                first = 0;

        } else {
            num1 = screen.innerText;
            operatorScreen.innerText = num1 + process;
            screen.innerText = "0";
            opFlag = 1;
            num3 = 0;
            islem = process;
            first = 0;

        }



    } else if ((lastOp.includes(process)) && opFlag == 1) {
        if (num3 == 0) {  // *not1
            operatorScreen.innerText = num1 + process;
            islem = process;
            screen.innerText = "0";
            first = 0;
        } else {
            num2 = screen.innerText;
            screen.innerText = "0";
            num1 = transactions(num1, num2, islem); // ayrıntı  not2 de    özetle   islem  =  son basılan operatör işaretinden bir önceki işaret
            operatorScreen.innerText = num1 + process; // psocess son basılan operatörün işareti
            num2 = 0;
            opFlag = 1;
            num3 = 0;
            islem = process;
            first = 0;
        }
    }

}

if (e.target.innerText == "=") {
    if(num1){
        num2 = screen.innerText;
        operatorScreen.innerText = "";
        num1 = transactions(num1, num2, islem);
        screen.innerText = "";
        screen.innerText = num1;
        num2 = 0;
        opFlag = 1;
        num3 = 0;
        first = 0;

    }
  
}
if (e.target.innerText == "AC") {
    operatorScreen.innerText = " ";
    screen.innerText = 0
    num1 = 0;
    num2 = 0;
    num3 = 0;
    opFlag = 0;
    first = 0;
}
if (e.target.innerText == ".") {
    screen.innerText.includes(".") ? null : 
    screen.innerText = screen.innerText + "."
}
if (e.target.innerText == "±") {
    +screen.innerText > 0 ? screen.innerText = "-" + screen.innerText :
        +screen.innerText != 0 ? screen.innerText = (screen.innerText).slice(1, screen.innerText.length) : null;  // iç içe ternary 
        num3 = 1;
        lengthControl(screen.innerText)
}

if (e.target.innerText == "%") {

    num2 = screen.innerText;
    operatorScreen.innerText = "";
    num1 = num1 * num2 / 100;
    screen.innerText = num1;
    num2 = 0;
    opFlag = 0;
    num3 = 0;
}


  })



  // not1 her işlemde ekransıfırlanacak  ve hala sıfırsa sadece operatör değişimi yapacak  ekrana sayı firildiyse bu sefer işlem yapacak , bu adım yapılmasaydı öperatör birkere seçildikten sonra değiştirilemiyordu 2* yazdınız vazgeçtiniz toplama yapacaksınız diyelim bu sefer tekrar + basınca 4 işlm yapmasın  sadece operatör değiştirsin....

  // not2 // buradaki islem bir önceki adımda ekranın üstüne yazdırılan ara işlem , process ise son basılan operatör , bu son basılan operatör değişmezde aynı kalırsa bir sonraki işlemin operattörü olacak yani islem değişkeni yapılması için  karar verdiğimiz işlemin operatörünü tutarken process eşittir yerine bastığımız son operatörü tutar

//   case "+":
//     result =  +num1 + +num2
//  return  ( Math.trunc(result) == result ? result :  result.toFixed(2)); // virgülden sonrası yoksa .00 koyma
//     break;
// case "-":
//     result =  num1 - num2
//     return  ( Math.trunc(result) == result ? result :  result.toFixed(2));
//         break;
// case "x":
//     result =  num1 * num2
//     return  ( Math.trunc(result) == result ? result :  result.toFixed(2));
//         break;
// case "÷":
//     result =  num1 / num2
//     return  ( Math.trunc(result) == result ? result :  result.toFixed(2));
// break; 