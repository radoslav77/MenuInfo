const  API_DATA = ('/drinks')
getDrinks(API_DATA)

async function getDrinks(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    var EntryDrinks = data[0]
    var drinks = []
  
    EntryDrinks.forEach(drink => {
        //console.log(drink.dish)
        
        const StarterNameElement = document.getElementById('salad').innerText
        const MainNameEl = document.getElementById('mainmain').innerText
        const DessertNameEl = document.getElementById('des').innerText

        //console.log(StarterNameEl)
       // console.log(MainNameEl)
       // console.log(DessertNameEl)
             
        

            if(drink.dish === DessertNameEl){
                
                if (!drinks.includes(drink.drink) ){
                    drinks.push(drink.drink)
                }    

                const DessertDrinkContainer = document.getElementById('dessert')
                DessertDrinkContainer.innerText = drinks

                //console.log(drinks)
                
            } 
            if (drink.dish === MainNameEl){

                if (!drinks.includes(drink.drink) ){
                    drinks.push(drink.drink)
                }    
                const MainDrinkContainer = document.getElementById('main')
                MainDrinkContainer.innerText = drinks

            } 
            if (drink.dish === StarterNameElement){
                if (!drinks.includes(drink.drink) ){
                    drinks.push(drink.drink)
                }
                    
                const StarterDrinkContainer = document.getElementById('starter')
                StarterDrinkContainer.innerText = drinks
            }
       
        
    });
   
}