    const StarterNameEl = document.getElementById('salad').innerText
    const MainNameEl = document.getElementById('mainmain').innerText
    const DessertNameEl = document.getElementById('des').innerText

    const Starter =document.getElementById('starter_alergy').children
    const Main =document.getElementById('main_alergy').children
    const Desserts =document.getElementById('desserts_alergy')
    const slidDiv = document.querySelector('.drink-wrapper')


    const StarterDrinkContainer = document.getElementById('starter')
    const MainDrinkContainer = document.getElementById('main')
    const DessertDrinkContainer = document.getElementById('dessert')

const  API_DATA_DRINKS =('/drinks')
getDrinks(API_DATA_DRINKS)
    var drinks = new Set() 
    var drinks_starter = new Set()
    var drinks_dessert = new Set()
  

    
async function getDrinks(url) {
    const res = await fetch(url)
    const data = await res.json()
    //console.log(data)
    var EntryDrinks = data[0]

    EntryDrinks.forEach(drink => {
       
            if(drink.dish === DessertNameEl){
                drinks_dessert.add(drink.drink)                 
            }
            if (drink.dish === MainNameEl){
                    drinks.add(drink.drink)      
            } 
            if (drink.dish === StarterNameEl){
                    drinks_starter.add(drink.drink)
                    
                        
                        
                 

            }
    })
   
}



console.log(drinks_starter)


//console.log(DessertDrinkContainer)

    drinks_dessert.forEach((b,idx) => {
        console.log(b)
        const NewDrink = document.createElement('input')
        NewDrink.type = 'button'
        NewDrink.value = b
        NewDrink.id = b



        DessertDrinkContainer.appendChild(NewDrink)
    })
DessertDrinkContainer.removeChild(DessertDrinkContainer.firstChild)
    

    drinks.forEach(b => {
        const NewDrink = document.createElement('input')
        NewDrink.type = 'button'
        NewDrink.value = b
        NewDrink.id = b

        MainDrinkContainer.appendChild(NewDrink)
    })

MainDrinkContainer.removeChild(MainDrinkContainer.firstChild)


//console.log(drinks_starter)
    drinks_starter.forEach(b => {  
        console.log(b)                     
        const NewDrink = document.createElement('input')
        NewDrink.type = 'button'
        NewDrink.value = b
        NewDrink.id = b

        StarterDrinkContainer.appendChild(NewDrink)
        
    })
StarterDrinkContainer.removeChild(StarterDrinkContainer.firstChild)


    const allergents = {
            dairy : ['Milk','Butter', 'Cream','Yoghurt','Cheese'],
            gluten : ['Flour', 'Oats', 'Barley','Waffle'],
            nuts : ['Almonds','Almond','Walnuts','Walnut', 'Pecans','Pecan','Cashews','Cashew','Pistachios','Pistachio','Hazelnuts','Hazelnut',
                    'Brazil','Brazils','Macadamia','Macadamias','Chestnut','Chestnuts','Filbert','Filberts','Hickory','Hickories','Pinenuts','Pinenut','Pine','Coconut','Coconuts'],
            eggs : ['Egg','Eggs', 'Yolks', 'Yolk', 'Whites', /*'White'*/],
            peanut: ['Peanut', 'Peanuts','Peanutbutter', 'Peanut butter'],
            celery: ['Celery', 'Celery salt'],
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
    //console.log(data)
    data.forEach(arr => {
        var recipeData = arr.recipe 
        const i = recipeData.split(',')
        var DataDessrtRecipr = []
        if(DessertNameEl === arr.title){
            data.forEach(dish => {
                if(DessertNameEl === dish.dish){
                    var infoDessert = dish.recipe
                    DataDessrtRecipr.push(infoDessert)
                }
            })
            let dst = ''
            for(let i = 0; i < DataDessrtRecipr.length; i++){
                dst = dst.concat(DataDessrtRecipr[i])
            }
            var dstRes = dst.split(',')
            Allergents(dstRes, arr.title)
          

        }
        // need to look in to this function
        var DataRecipes = []
        if(StarterNameEl === arr.title){
            data.forEach(dish => {
                if(StarterNameEl === dish.dish){
                       var info = dish.recipe               
                    DataRecipes.push(info)
                }
             })
             let str = ''
             for(let i  = 0; i < DataRecipes.length; i++){
                    str = str.concat( DataRecipes[i])
                 
             }
             var res = str.split(',')
             //console.log(res)
             Allergents(res, arr.title)
            

            
        }
        var DataMainRecipe = []
        if(MainNameEl === arr.title){
            data.forEach(dish => {
                if(MainNameEl === dish.dish){
                    var infoMain = dish.recipe
                    DataMainRecipe.push(infoMain)
                }
            })
            let main = ''
            for(let i  = 0; i < DataMainRecipe.length; i++){
                main = main.concat( DataMainRecipe[i])
              
         }
         var mianRes = main.split(',')
         //console.log(res)
         Allergents(mianRes, arr.title)
           
        }

    })
     
    
}


    const URL_DRINK_DATA = ('/drink_sammary')
    getDrinksData(URL_DRINK_DATA)



    async function getDrinksData(url){
        const res = await fetch(url)
        const data = await res.json()
        data.forEach(arr => {
           // console.log(arr.description, '->', arr.title)

            let inputEls = []
            let inputEl =document.getElementsByTagName('input')
            //console.log(inputEl.length)
            
            
                        
            for(let i = 0 ; i < inputEl.length ; i++){
                
                //console.log(inputEl[i])
                inputEls.push(inputEl[i])
            }
            inputEls.forEach((element) => {
                var el = element
                //console.log(el)
                el.addEventListener('mousedown', () => {
                   
                        //var containsContainer = document.getElementById('drink-contain')
                       // console.log(containsContainer)
                        slidDiv.scrollIntoView()
                        slidDiv.style.transform = 'translateX(30vw)' 
                        
                        // beverage allergants
                        const URL_DRINK_ING = ('/beverage_ing')
                        getDrinkIng(URL_DRINK_ING)
                    
                        async function getDrinkIng(url) {
                            const res = await fetch(url)
                            const data = await res.json()
                            
                            data.forEach(arr => {
                                if (el.value == arr.title) {
                                                                 
                                    var dataBeverage = arr.ingredients.split(/[ , .]+/)
                                    const bevAllergy = {
                                                    sulphites : ['sulphites', 'Sulphites', 'sulfitos', 'Sulfitos', 'sulfites', 'Sulfites'],
                                                    gluten : ['gluten', 'Gluten']
                                                }
                            
                                    var Sulphites = bevAllergy.sulphites
                                    var Gluten = bevAllergy.gluten
                            
                                                

                                    Sulphites.forEach(elemnet => {
                                                    
                                        dataBeverage.forEach(word => {
                                            const found = dataBeverage.find(elemnet => elemnet.toLowerCase() == word.toLowerCase()) 
                                                        
                                            const SulphiteContainer = document.getElementById('sulph')
                                            if ( word == elemnet  || word == elemnet.toLowerCase()){
                                                           
                                                SulphiteContainer.hidden = false
                                                SulphiteContainer.innerText = 'Sulphites,'
                                                } 
                                        })
                            
                                    })
                                    Gluten.forEach(elemnet => {
                                                    
                                        dataBeverage.forEach(word => {
                                            const found = dataBeverage.find(elemnet => elemnet.toLowerCase() == word.toLowerCase()) 
                                                        
                                            const GlutenContainer = document.getElementById('glut')
                                            if ( word == elemnet  || word == elemnet.toLowerCase()){
                                                           
                                                GlutenContainer.hidden = false
                                                GlutenContainer.innerText = 'Gluten,'
                                            } 
                                        })
                            
                                    })
                            
                                }
                             
                            })

                          
                        }
                   
                 
                    var Info = document.getElementById('info')
                 
                    for( let i = 0; i < arr.title.length; i++){
                       
                        if(arr.title.includes(el.id)){
                                Info.innerHTML = arr.description
                               
                            }
                    }       
                        
                    //console.log(arr.description, '->', arr.title)
                   
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


    })
}


   
    const closeDiv = document.getElementById('close')
    const GlutenContainer = document.getElementById('glut')
    const SulphiteContainer = document.getElementById('sulph')
    closeDiv.addEventListener('click', () => {
        
        slidDiv.style.transform = `translateX(-150%)`
        GlutenContainer.hidden = true
        SulphiteContainer.hidden = true
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



    
function Allergents(input, title) {

    input.forEach(e => {
        var num = e.split(/\s+/)
        //console.log(num)
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
                if(DessertNameEl === title){            
                    des[1].hidden = false
                    des[1].innerText = 'Peanuts,'
                }
                if(StarterNameEl === title){            
                    Starter[1].hidden = false
                    Starter[1].innerText = 'Peanuts,'
                }
                if(MainNameEl === title){            
                    Main[1].hidden = false
                    Main[1].innerText = 'Peanuts,'
                } 
              
            }
        })

        eggs.forEach((all, idx) => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){                
                if(DessertNameEl === title){
                    des[2].hidden = false
                    des[2].innerHTML = 'Eggs,'
                }
                if(StarterNameEl === title){
                        Starter[2].hidden = false
                        Starter[2].innerHTML = 'Eggs,'
                }
                if(MainNameEl === title){
                        Main[2].hidden = false
                        Main[2].innerHTML = 'Eggs,'
                }
            }  

            
        })

        glutens.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[3].hidden = false
                    des[3].innerText = 'Gluten,'
                }
                if(StarterNameEl === title){
                    Starter[3].hidden = false
                    Starter[3].innerText = 'Gluten,'
                }
                if(MainNameEl === title){
                    Main[3].hidden = false
                    Main[3].innerText = 'Gluten,'
                }
                
            }
        })

        dairies.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[5].hidden = false
                    des[5].innerText = 'Dairy,'
                }
                if(MainNameEl === title){
                    Main[5].hidden = false
                    Main[5].innerText = 'Dairy,'
                }
                if(StarterNameEl === title){
                    Starter[5].hidden = false
                    Starter[5].innerText = 'Diary,'
                }
                
            }
        })

        nuts.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[4].hidden = false
                    des[4].innerText = 'Nuts,'
                    }
                    if(StarterNameEl === title){
                    Starter[4].hidden = false
                    Starter[4].innerText = 'Nuts,'
                    }
                    if(MainNameEl === title){
                    Main[4].hidden = false
                    Main[4].innerText = 'Nuts,'
                    }
                
            }
        })

        celery.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[6].hidden = false
                    des[6].innerText = 'Celery,'
                    }
                    if(StarterNameEl === title){
                    Starter[6].hidden = false
                    Starter[6].innerText = 'Celery,'
                    }
                    if(MainNameEl === title){
                    Main[6].hidden = false
                    Main[6].innerText = 'Celery,'
                    }
                
            }
        })

        crustaceans.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[7].hidden = false
                    des[7].innerText = 'Crustaceans,'
                }
                if(StarterNameEl === title){
                    Starter[7].hidden = false
                    Starter[7].innerText = 'Crustaceans,'
                }
                if(MainNameEl === title){
                    Main[7].hidden = false
                    Main[7].innerText = 'Crustaceans,'
                }
                
            }
        })

        fish.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[8].hidden = false
                    des[8].innerText = 'Fish,'
                    }
                    if(StarterNameEl === title){
                    Starter[8].hidden = false
                    Starter[8].innerText = 'Fish,'
                    }
                    if(MainNameEl === title){
                    Main[8].hidden = false
                    Main[8].innerText = 'Fish,'
                    }
                
            }
        })

        lupin.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[9].hidden = false
                    des[9].innerText = 'Lupin,'
                    }
                    if(StarterNameEl === title){
                    Starter[9].hidden = false
                    Starter[9].innerText = 'Lupin,'
                    }
                    if(MainNameEl === title){
                    Main[9].hidden = false
                    Main[9].innerText = 'Lupin,'
                    }
                
            }
        })

        molluscs.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[10].hidden = false
                    des[10].innerText = 'Molluscs,'
                }
                if(StarterNameEl === title){
                    Starter[10].hidden = false
                    Starter[10].innerText = 'Molluscs,'
                }
                if(MainNameEl === title){
                    Mian[10].hidden = false
                    Main[10].innerText = 'Molluscs,'
                }
                
            }
        })

        mustard.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[11].hidden = false
                    des[11].innerText = 'Mustard,'
                    }
                    if(StarterNameEl === title){
                    Starter[11].hidden = false
                    Starter[11].innerText = 'Mustard,'
                    }
                    if(MainNameEl === title){
                    Main[11].hidden = false
                    Main[11].innerText = 'Mustard,'
                    }
                
            }
        })

        sesame.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[12].hidden = false
                    des[12].innerText = 'Sesame,'
                    }
                    if(StarterNameEl === title){
                    Starter[12].hidden = false
                    Starter[12].innerText = 'Sesame,'
                    }
                    if(MainNameEl === title){
                    Main[12].hidden = false
                    Main[12].innerText = 'Sesame,'
                    }
                
            }
        })

        soya.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())               
            if ( found == all || found == all.toLowerCase()){        
                if (DessertNameEl === title){
                    des[13].hidden = false
                    des[13].innerHTML = 'Soya,'
                }
                if (StarterNameEl === title){
                    Starter[13].hidden = false
                    Starter[13].innerHTML = 'Soya,'
                }
                if (MainNameEl === title){
                    Mian[13].hidden = false
                    Main[13].innerHTML = 'Soya,'
                }
                
            }
        })

        sulphites.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                if(DessertNameEl === title){
                    des[14].hidden = false
                    des[14].innerText = 'Sulphites,'
                }
                if(StarterNameEl === title){
                    Starter[14].hidden = false
                    Starter[14].innerText = 'Sulphites,'
                }
                if(MainNameEl === title){
                    Main[14].hidden = false
                    Main[14].innerText = 'Sulphites,'
                }
                
            }
        })

    })
}