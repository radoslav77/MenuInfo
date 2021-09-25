    const StarterNameEl = document.getElementById('salad').innerText
    const MainNameEl = document.getElementById('mainmain').innerText
    const DessertNameEl = document.getElementById('des').innerText

    const Starter =document.getElementById('starter_alergy').children
    const Main =document.getElementById('main_alergy').children
    const Desserts =document.getElementById('desserts_alergy')
    const slidDiv = document.querySelector('.drink-wrapper')
   // console.log(Starter)
   // console.log(Main)
   // console.log(StarterNameEl)

const  API_DATA_DRINKS =('/drinks')
getDrinks(API_DATA_DRINKS)
    var drinks = [] 
    var drinks_starter = []
    var drinks_dessert = []
  

    
async function getDrinks(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    var EntryDrinks = data[0]

    EntryDrinks.forEach(drink => {
        //console.log(drink.dish)
        


        //console.log(StarterNameEl)
       // console.log(MainNameEl)
       // console.log(DessertNameEl)
             
        

            if(drink.dish === DessertNameEl){
                
                if (!drinks_dessert.includes(drink.drink) ){
                    drinks_dessert.push(drink.drink)
                    
                }    



                //console.log(drinks)
                
            }


            if (drink.dish === MainNameEl){
                if(!drinks.includes(drink.drink)){
                    drinks.push(drink.drink)
                   
                  
                    
                   // console.log(main_drinks)
                }

            } 
            if (drink.dish === StarterNameEl){
                    
                    if(!drinks_starter.includes(drink.drink)){
                        drinks_starter.push(drink.drink)
                   
                        
                        
                    }

                
                    

            }
       
        
    });

                    const DessertDrinkContainer = document.getElementById('dessert')
                    //console.log(DessertDrinkContainer)
                    drinks_dessert.forEach((b,idx) => {

                        const NewDrink = document.createElement('input')
                        NewDrink.type = 'button'
                        NewDrink.value = b
                        NewDrink.id = b



                        DessertDrinkContainer.appendChild(NewDrink)
                    })
                    DessertDrinkContainer.removeChild(DessertDrinkContainer.firstChild)
                        
                    const MainDrinkContainer = document.getElementById('main')
                    drinks.forEach(b => {
                        const NewDrink = document.createElement('input')
                        NewDrink.type = 'button'
                        NewDrink.value = b
                        NewDrink.id = b

                        MainDrinkContainer.appendChild(NewDrink)
                    })

                    MainDrinkContainer.removeChild(MainDrinkContainer.firstChild)

                    const StarterDrinkContainer = document.getElementById('starter')
                    //console.log(drinks_starter)
                    drinks_starter.forEach(b => {                       
                        const NewDrink = document.createElement('input')
                        NewDrink.type = 'button'
                        NewDrink.value = b
                        NewDrink.id = b

                        StarterDrinkContainer.appendChild(NewDrink)
                    })
                    StarterDrinkContainer.removeChild(StarterDrinkContainer.firstChild)

   
}


    const allergents = {
            dairy : ['Milk','Butter', 'Cream','Yogurt','Cheese'],
            gluten : ['Flour', 'Oats', 'Barley','Waffle'],
            nuts : ['Almonds','Almond','Walnuts','Walnut', 'Pecans','Pecan','Cashews','Cashew','Pistachios','Pistachio','Hazelnuts','Hazelnut',
                    'Brazil','Brazils','Macadamia','Macadamias','Chestnut','Chestnuts','Filbert','Filberts','Hickory','Hickories','Pinenuts','Pinenut','Pine','Coconut','Coconuts'],
            eggs : ['Egg','Eggs', 'Yolks', 'Yolk', 'Whites', /*'White'*/],
            peanut: ['Peanut', 'Peanuts','Peanutbutter'],
            celery: ['Celery'],
            crustaceans : ['Prawns','Prawn','Crabs','Crab', 'Lobster','Lobsters'],
            fish : ['Fish'],
            lupin : ['Lupin'],
            molluscs : ['Mussels','Mussel','Oysters','Oyster'],
            mustard : ['Mustard', 'Mustards'],
            sesame : ['Sesame', 'Sesames'],
            soy : ['Soybean','Soybeans','Soyabean','Soyabeans','Soy','Soya','Chocolate','Chocolates','White chocolate', 'Cocoa butter'],
            sulphites : ['Cheese','Glucose','Glaze','Gel','Wine','Rum','Vodka','Gin']
        }

 const des = Desserts.children
        ///console.log(des)

const URL_DATA =('/alergy')
    getAlergy(URL_DATA) 
    
    async function getAlergy(url) {
    const res = await fetch(url)
    const data = await res.json()

    data.forEach(arr => {
        var recipeData = arr.recipe 
        const i = recipeData.split(',')
        if(DessertNameEl === arr.title){
            ContainAllergents()
        }

    })
     
     


function ContainAllergents() {
    data.forEach(arr => {
        var recipeData = arr.recipe 
        const i = recipeData.split(',')
    
        i.forEach(e => {
            var num = e.split(/\s+/)
            var dairies = allergents.dairy
            var glutens = allergents.gluten
            var nuts = allergents.nuts
            var eggs = allergents.eggs
            var peanuts = allergents.peanut
            var celery = allergents.celery
            var crustaceans = allergents.crustaceans
            var fish =  allergents.fish
            var lupin = allergents.lupin
            var molluscs = allergents.molluscs
            var mustard = allergents.mustard
            var sesame = allergents.sesame
            var soya = allergents.soy
            var sulphites = allergents.sulphites

            peanuts.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if (found == all || found == all.toLowerCase()){ 
                    if(DessertNameEl === arr.title){            
                        des[1].hidden = false
                        des[1].innerText = 'Peanuts,'
                    }
                    if(StarterNameEl === arr.title){            
                        Starter[1].hidden = false
                        Starter[1].innerText = 'Peanuts,'
                    }
                    if(MainNameEl === arr.title){            
                        Main[1].hidden = false
                        Main[1].innerText = 'Peanuts,'
                    }  
                }
            })

            eggs.forEach((all, idx) => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){                
                   if(DessertNameEl === arr.title){
                        des[2].hidden = false
                        des[2].innerHTML = 'Eggs,'
                   }
                   if(StarterNameEl === arr.title){
                        Starter[2].hidden = false
                        Starter[2].innerHTML = 'Eggs,'
                   }
                   if(MainNameEl === arr.title){
                        Main[2].hidden = false
                        Main[2].innerHTML = 'Eggs,'
                   }

                }  

                
            })

            glutens.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                   if(DessertNameEl === arr.title){
                    des[3].hidden = false
                    des[3].innerText = 'Gluten,'
                   }
                   if(StarterNameEl === arr.title){
                    Starter[3].hidden = false
                    Starter[3].innerText = 'Gluten,'
                   }
                   if(MainNameEl === arr.title){
                    Main[3].hidden = false
                    Main[3].innerText = 'Gluten,'
                   }
                }
            })

            dairies.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                        des[5].hidden = false
                        des[5].innerText = 'Dairy,'
                    }
                    if(MainNameEl === arr.title){
                        Main[5].hidden = false
                        Main[5].innerText = 'Dairy,'
                    }
                    if(StarterNameEl === arr.title){
                        Starter[5].hidden = false
                        Starter[5].innerText = 'Diary,'
                    }
                }
            })

            nuts.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                    des[4].hidden = false
                    des[4].innerText = 'Nuts,'
                    }
                    if(StarterNameEl === arr.title){
                    Starter[4].hidden = false
                    Starter[4].innerText = 'Nuts,'
                    }
                    if(MainNameEl === arr.title){
                    Main[4].hidden = false
                    Main[4].innerText = 'Nuts,'
                    }
                }
            })

            celery.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                    des[6].hidden = false
                    des[6].innerText = 'Celery,'
                    }
                    if(StarterNameEl === arr.title){
                    Starter[6].hidden = false
                    Starter[6].innerText = 'Celery,'
                    }
                    if(MainNameEl === arr.title){
                    Main[6].hidden = false
                    Main[6].innerText = 'Celery,'
                    }
                }
            })

            crustaceans.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                   if(DessertNameEl === arr.title){
                    des[7].hidden = false
                    des[7].innerText = 'Crustaceans,'
                   }
                   if(StarterNameEl === arr.title){
                    Starter[7].hidden = false
                    Starter[7].innerText = 'Crustaceans,'
                   }
                   if(MainNameEl === arr.title){
                    Main[7].hidden = false
                    Main[7].innerText = 'Crustaceans,'
                   }
                }
            })

            fish.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                    des[8].hidden = false
                    des[8].innerText = 'Fish,'
                    }
                    if(StarterNameEl === arr.title){
                    Starter[8].hidden = false
                    Starter[8].innerText = 'Fish,'
                    }
                    if(MainNameEl === arr.title){
                    Main[8].hidden = false
                    Main[8].innerText = 'Fish,'
                    }
                }
            })

            lupin.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                    des[9].hidden = false
                    des[9].innerText = 'Lupin,'
                    }
                    if(StarterNameEl === arr.title){
                    Starter[9].hidden = false
                    Starter[9].innerText = 'Lupin,'
                    }
                    if(MainNameEl === arr.title){
                    Main[9].hidden = false
                    Main[9].innerText = 'Lupin,'
                    }
                }
            })

            molluscs.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                   if(DessertNameEl === arr.title){
                    des[10].hidden = false
                    des[10].innerText = 'Molluscs,'
                   }
                   if(StarterNameEl === arr.title){
                    Starter[10].hidden = false
                    Starter[10].innerText = 'Molluscs,'
                   }
                   if(MainNameEl === arr.title){
                    Mian[10].hidden = false
                    Main[10].innerText = 'Molluscs,'
                   }
                }
            })

            mustard.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                    des[11].hidden = false
                    des[11].innerText = 'Mustard,'
                    }
                    if(StarterNameEl === arr.title){
                    Starter[11].hidden = false
                    Starter[11].innerText = 'Mustard,'
                    }
                    if(MainNameEl === arr.title){
                    Main[11].hidden = false
                    Main[11].innerText = 'Mustard,'
                    }
                }
            })

            sesame.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                    if(DessertNameEl === arr.title){
                    des[12].hidden = false
                    des[12].innerText = 'Sesame,'
                    }
                    if(StarterNameEl === arr.title){
                    Starter[12].hidden = false
                    Starter[12].innerText = 'Sesame,'
                    }
                    if(MainNameEl === arr.title){
                    Main[12].hidden = false
                    Main[12].innerText = 'Sesame,'
                    }
                }
            })

            soya.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())               
                if ( found == all || found == all.toLowerCase()){        
                   if (DessertNameEl === arr.title){
                    des[13].hidden = false
                    des[13].innerHTML = 'Soya,'
                   }
                   if (StarterNameEl === arr.title){
                    Starter[13].hidden = false
                    Starter[13].innerHTML = 'Soya,'
                   }
                   if (MainNameEl === arr.title){
                    Mian[13].hidden = false
                    Main[13].innerHTML = 'Soya,'
                   }

                }
            })

            sulphites.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
                if ( found == all || found == all.toLowerCase()){
                   if(DessertNameEl === arr.title){
                    des[14].hidden = false
                    des[14].innerText = 'Sulphites,'
                   }
                   if(StarterNameEl === arr.title){
                    Starter[14].hidden = false
                    Starter[14].innerText = 'Sulphites,'
                   }
                   if(MainNameEl === arr.title){
                    Main[14].hidden = false
                    Main[14].innerText = 'Sulphites,'
                   }

                }
            })

        })
    })
}



    }


    const URL_DRINK_DATA = ('/drink_sammary')
    getDrinksData(URL_DRINK_DATA)



    async function getDrinksData(url){
        const res = await fetch(url)
        const data = await res.json()
        data.forEach(arr => {
           // console.log(arr.description, '->', arr.title)
        
       // console.log(data)
        
            
        

        
        Array.from(document.getElementsByClassName("drink")).forEach(function(item) {
        
            //console.log(item.id);
            let inputEls = []
            let inputEl =document.getElementsByTagName('input')
            //console.log(inputEl.length)
            
            
                        
            for(let i = 0 ; i < inputEl.length ; i++){
                
                //console.log(inputEl[i])
                inputEls.push(inputEl[i])
            }
            inputEls.forEach((element) => {
                var el = element
                el.addEventListener('click', () => {
                   // console.log(el)
                        slidDiv.scrollIntoView()
                        slidDiv.style.transform = 'translateX(30vw)' 
                        
                        // beverage allergants
                        const URL_DRINK_ING = ('/beverage_ing')
                        getDrinkIng(URL_DRINK_ING)
                    
                        async function getDrinkIng(url) {
                            const res = await fetch(url)
                            const data = await res.json()
                            var containsContainer = document.getElementById('drink-contain')
                            data.forEach(arr => {
                                if (el.value == arr.title) {
                                    
                                    var newEntry = document.createElement('p')
                                    newEntry.innerText = arr.ingredients
                                    containsContainer.appendChild(newEntry)
                                    console.log(el.value) 
                                    containsContainer.removeChild(newEntry.firstChild)
                                }
                               
                            })

                            //console.log(el.value)
                        }
                   
                   //console.log(el.id)
                    var Info = document.getElementById('info')
                   // Info.innerHTML = el.id
                    for( let i = 0; i < arr.title.length; i++){
                       
                        if(arr.title.includes(el.id)){
                                Info.innerHTML = arr.description
                                //console.log(item.id)
                            }
                    }       
                        
                    //console.log(arr.description, '->', arr.title)
                   
                })
                 
            })

           
    })

/*
            getXYPosition()
           var myX, myY, xyOn, myMouseX, myMouseY
           xyOn = true

           function getXYPosition(e) {
               myMouseX = (e || event).clientX
               myMouseY = (e || event).clientY
               if(document.documentElement.scrollTop > 0) {
                   myMouseY = myMouseX + document.documentElement.scrollTop
               }
               if(xyOn) {
                   alert('X is' + myMouseX + '\nY is' + myMouseY)
               }

               function toggleXY() {
                   xyOn = !xyOn
                   document,getElementById('xyLink').blur()
                   return false
               }
               document.onmouseup = getXYPosition
           } */


});
    }


   
    const closeDiv = document.getElementById('close')
  
    closeDiv.addEventListener('click', () => {
        
        slidDiv.style.transform= `translateX(-150%)`
    })

    const URL_DESCRIPTION_DATA = ('/description_api')
    getDescriptionData(URL_DESCRIPTION_DATA)



    async function getDescriptionData(url){
        const res = await fetch(url)
        const data = await res.json()
        
        data.forEach(arr => {
           // console.log(arr.title)
            var starter = document.getElementById('salad')
            if(arr.title === starter.innerText){
                var starterDescription = document.getElementById('starter-description')
                starterDescription.innerText = arr.description
                //console.log(starterDescription)
            }
            var starter = document.getElementById('mainmain')
            if(arr.title === starter.innerText){
                var starterDescription = document.getElementById('main-description')
                starterDescription.innerText = arr.description
                //console.log(starterDescription)
            }
            var starter = document.getElementById('des')
            if(arr.title === starter.innerText){
                var starterDescription = document.getElementById('dessert-description')
                starterDescription.innerText = arr.description
                //console.log(starterDescription)
            }
        })

    }

