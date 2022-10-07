function getId(id) {
    return document.getElementById(id);
  }
  
  function queryS(id) {
    return document.querySelector(id);
  }
  
  function querySA(id) {
    return document.querySelectorAll(id);
  }

  function transactions(num1,num2,operator){
    let result;

    switch (operator) {
        case "+":
         return  result =  +num1 + +num2;
            break;
        case "-":
            return   result =  num1 - num2;
                break; 
        case "x":
            return   result =  num1 * num2;
                break;
        case "÷":
            return  result =  num1 / num2;
        break;  

   }
  }


  let screen = getId("calc-screen");
  let operatorScreen = getId("operator-screen");
  let operator;
  let num1=0;
  let num2=0;
  let num3=0;
  let opFlag = 0;
  let islem;
 
  getId("calc-body")
  .addEventListener("click" ,(e) => {

    if(e.target.classList.contains("btnNo")){
        screen.innerText  =  +screen.innerText ? screen.innerText + e.target.innerText : e.target.innerText ;
        num3=1;   
    }
    //4 işlem
    if(e.target.classList.contains("btnIslem")){
        let lastOp = ["+","-","x","÷"];
        let process = e.target.innerText
        if((lastOp.includes(process))  && opFlag == 0){//opFlag 0 ise daha ilk defa işlem yapılıyor yani ilk toplama işlemi
                if( num3 == 0){
                    operatorScreen.innerText = num1 + process;
                        islem = process
                    
                }else {
                    num1 =  screen.innerText ;
                    operatorScreen.innerText = num1 + process ;
                    screen.innerText ="";
                    opFlag = 1;
                    num3=0;
                    islem = process

                }
            
       
            
        } else if((lastOp.includes(process))  && opFlag == 1) {
            if( num3 == 0){  // *not1
                operatorScreen.innerText = num1 + process;
                islem = process
            }else {
                num2 =  screen.innerText;
                screen.innerText = "" ;
                num1 = transactions(num1,num2,islem); // not2
                operatorScreen.innerText = num1 + process  ;
                num2 = 0;
                opFlag = 1;
                num3=0;
                islem = process
        }  
    }
      
} 

    if(e.target.innerText =="AC"){
        operatorScreen.innerText = " ";
            screen.innerText =0
            num1 = 0;
            num2 = 0;
            opFlag = 0;

    }


  })



  // not1 her işlemde ekransıfırlanacak  ve hala sıfırsa sadece operatör değişimi yapacak  ekrana sayı firildiyse bu sefer işlem yapacak , bu adım yapılmasaydı öperatör birkere seçildikten sonra değiştirilemiyordu 2* yazdınız vazgeçtiniz toplama yapacaksınız diyelim bu sefer tekrar + basınca 4 işlm yapmasın  sadece operatör değiştirsin....

  // not2 // buradaki islem bir önceki adımda ekranın üstüne yazdırılan ara işlem , process ise son basılan operatör , bu son basılan operatör değişmezde aynı kalırsa bir sonraki işlemin operattörü olacak yani islem değişkeni yapılması için  karar verdiğimiz işlemin operatörünü tutarken process eşittir yerine bastığımız son operatörü tutar