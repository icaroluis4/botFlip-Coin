const puppeteer = require('puppeteer');

console.log("Bem vindo ao bot flipCoin ");


var valor = '0.1'; //Valor repesentativo da aposta no caso 10 centavaos
var valor2 = 0.1; //Valor repesentativo da aposta no caso 10 centavos





(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  
  //acessa o site
  await page.goto('https:forex-social.com/jogos/desafio-moeda/');

  //OBTENDO DADOS
  let data = await page.evaluate(()=> {
    let money = document.querySelector('strong [class = "balance"]').innerText;

    money = Number(money);

    return{
      money
    }

  })

  
  let cash = Object.values(data);
  
  console.log(data);
  console.log(cash);

  cash2 = 0;
  

  
  

  while( 1){
    
    console.log("Começou ");
    
    //clicka na "cara" da moeda
    await page.click('[id="head"]');
    

    //Preenche o número a ser apostado
    await page.type('[type="number"]' , valor);
   


    await page.click('[class="btn btn-lg btn-success"]');

    await page.waitForTimeout(1000).then(() => console.log('Waited a second!'));

    data = await page.evaluate(()=> {
      let money = document.querySelector('strong [class = "balance"]').innerText;
      
      money = Number(money);

      return{
        money
      }
  
    })
    
    
    console.log(data);
    cash2 = Object.values(data);
   
    console.log("Cash2: ",cash2);
   
    console.log("Cash: ",cash);

    
    
    
    if ( cash < cash2){
        
        console.log("**Sucesso** ");
        valor = '0.1';
        valor2 = 0.1;
        

    } else if (cash > cash2){
       
        console.log("**Fail** ");
        valor2 = valor2 * 2; //Multiplicador da aposta em caso de perda
        valor = String(valor2); 

    }

    console.log("Valor: ", valor);
    console.log("Cabou ");
    cash = cash2;

    if(cash >= 250.5){ //Valor que ser quer atingir com o bot
      break;
    }
   
  }

  //await browser.close();

})();
