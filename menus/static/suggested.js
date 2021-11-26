
    const JS_DISH_DATA = ('/js-dish')
    getDataDish(JS_DISH_DATA)
    const URL_DATA_ALERGY = ('/alergy')
    getAlergyOption(URL_DATA_ALERGY)


    var DataDish = []
    var DataRecipe = []
    var Dish = []

    var ConDairy = []
    var ConGluten = []
    var ConNut = []
    var ConEgg = []
    var ConPeanut = []
    var ConCelery = []
    var ConCrustacean = []
    var ConFish = []
    var ConLupin = []
    var ConMolluscs = []
    var ConMustard = []
    var ConSesame = []
    var ConSoya = []
    var ConSulphites = []
    // for vegan and vegeterian a need another function
    var tempVegan = new Set()
    //console.log(tempVegan)
    
    var NewVegan = new Set()
    var Vegan = new Set()
    var Vegeterian = new Set()
    var Glutefree = new Set()
    var PeaNutFree = new Set()
    var NutFree = new Set()

    //console.log(ConPeanut)
    //console.log(PeaNutFree)
    var meatDishes = new Set()



    async function getDataDish(url) {
        const res = await fetch(url)
        const data = await res.json()

        data.forEach(element => {
            DataDish.push(element)
            //CreateEl(element)
        });

    }

    async function getAlergyOption(url) {
        const res = await fetch(url)
        const data = await res.json()

        data.forEach(element => {
            DataRecipe.push(element)
            //console.log(element.dish)
            DataRecipe.forEach(rec => {
                if (element.dish === rec.dish) {
                    Dish.push(element)
                }
            })

        })
        Dish.forEach(e => {
            Vegeterian.add(e)
            Vegan.add(e)
            DataRecipe.forEach(recipe => {
                if (e.dish === recipe.dish)
                    //console.log(recipe.recipe, '->', e.title)

                    Contain(recipe.recipe, e.title)
                if(e.dish) {
                    ConGluten.forEach(title => {
                       
                        if(!title.includes(e.dish)){
                            Glutefree.add(e)
                        }
                    })
                    
                }
                // Peanutfree option
                if(e.dish){
                    
                    ConPeanut.forEach(title => {
                      
                        if(!title.includes(e)){
                           PeaNutFree.add(e)
                            const nuts = ['Almonds', 'Almond', 'Walnuts', 'Walnut', 'Pecans', 'Pecan', 'Cashews', 'Cashew', 'Pistachios', 'Pistachio', 'Hazelnuts', 'Hazelnut',
                                            'Brazil', 'Brazils', 'Macadamia', 'Macadamias', 'Chestnut', 'Chestnuts', 'Filbert', 'Filberts', 'Hickory', 'Hickories', 'Pinenuts', 'Pinenut', 'Pine', 'Coconut',
                                            'Coconuts', 'Peanut', 'Peanuts', 'Peanutbutter', 'Peanut butter']
                            // removing all peanut products
                            var recipeVlaue = e.recipe.split(/\s+/)
                            recipeVlaue.forEach(r => {
                               
                                nuts.forEach(nut => {
                                    if(r.toLowerCase() === nut.toLowerCase() || r.toLowerCase() === nut.toLowerCase() + ','){
                                       PeaNutFree.delete(e)
                                    }
                                })
                                
                            })
                            
                            
                           
                        }
                    })
                }
                if(e.dish){
                    // function for all nut products
                    ConNut.forEach(title => {
                      
                        if(!title.includes(e)){
                           NutFree.add(e)
                            const nuts = ['Almonds', 'Almond', 'Walnuts', 'Walnut', 'Pecans', 'Pecan', 'Cashews', 'Cashew', 'Pistachios', 'Pistachio', 'Hazelnuts', 'Hazelnut',
                                            'Brazil', 'Brazils', 'Macadamia', 'Macadamias', 'Chestnut', 'Chestnuts', 'Filbert', 'Filberts', 'Hickory', 'Hickories', 'Pinenuts', 'Pinenut', 'Pine', 'Coconut',
                                            'Coconuts', 'Peanut', 'Peanuts', 'Peanutbutter', 'Peanut butter']
                            // removing of all nut products
                            var recipeVlaue = e.recipe.split(/\s+/)
                            recipeVlaue.forEach(r => {
                               
                                nuts.forEach(nut => {
                                    if(r.toLowerCase() === nut.toLowerCase() || r.toLowerCase() === nut.toLowerCase() + ','){
                                       NutFree.delete(e)
                                    }
                                })
                                
                            })
                            
                            
                           
                        }
                    })
                }
            })
           
        })

        // saving vegetarian options
        Vegeterian.forEach(item => {
            meatDishes.forEach(e => {
                
                if (item.title === e) {
                    //console.log(item.title, '-', e)
                    Vegeterian.delete(item)
                }
            })
            // list of all meat products
            var meat = ['Pork', 'pork', 'Lamb', 'lamb', 'Chicken', 'chicken', 'beef', 'Beef', 'Fish', 'salmon', 'bass']
            // removing all meat products 
            var VeggRecArr = item.recipe.split(/\s+/)
            VeggRecArr.forEach( e => {
                meat.forEach(m => {
                    if (e.toLowerCase() === m.toLowerCase() || e.toLowerCase() === m.toLowerCase() + ',') {
                        Vegeterian.delete(item)
                    }
                })
            })
        })
        //saving vegan options 
        Vegan.forEach(item => {
            NewVegan.forEach(e => {
               
                if (item.title === e) {
                    //console.log(item.title,'-',e)
                    Vegan.delete(item)
                }
            })
            // list of non vegan products
            var noVegan = ['Pork', 'pork', 'Lamb', 'lamb', 'Chicken', 'chicken', 'beef', 'Beef', 'Eggs', 'Egg', 'Yolks',
                'Yolk', 'Butter', 'Fish', 'Mussels', 'Mussel', 'Oysters', 'Oyster', 'Prawns', 'Prawn', 'Crabs', 'Crab', 'Lobster',
                'Lobsters', 'Milk', 'Butter', 'Cream', 'Yoghurt', 'Cheese', 'fraiche', 'salmon', 'bass', 'bass']
            // removing all non vegan titles from the set
            var recArr = item.recipe.split(/\s+/)
            recArr.forEach(e => {
                noVegan.forEach(type => {
                    if (e.toLowerCase() === type.toLowerCase() + ',') {
                        Vegan.delete(item)

                    }
                })


            })

        })
        

    }
    /*
    var v = []
    Dish.forEach(i => {
        if (Dish.includes(i.dish)) {
            v.push(i)
            let j = marge(i, v)

        }
        console.log(i)
    })*/

    // console.log(DataRecipe, '->', DataDish, '->', Dish)

    // Function to create a elements with links
    function CreateEl(arr) {
        var createUl = document.createElement('a')
        createUl.innerHTML = arr.title
        let Nametitle = arr.title
        createUl.href = `/detail/${Nametitle}`
        document.getElementById('js_input').appendChild(createUl)
    }
// dictionary of all allergens 
    const allergen = {
        dairy: ['Milk', 'Butter', 'Cream', 'Yoghurt', 'Cheese', 'fraiche'],
        gluten: ['Flour', 'Oats', 'Barley', 'Waffle'],
        nuts: ['Almonds', 'Almond', 'Walnuts', 'Walnut', 'Pecans', 'Pecan', 'Cashews', 'Cashew', 'Pistachios', 'Pistachio', 'Hazelnuts', 'Hazelnut',
            'Brazil', 'Brazils', 'Macadamia', 'Macadamias', 'Chestnut', 'Chestnuts', 'Filbert', 'Filberts', 'Hickory', 'Hickories', 'Pinenuts', 'Pinenut', 'Pine', 'Coconut', 'Coconuts'],
        eggs: ['Egg', 'Eggs', 'Yolks', 'Yolk', 'Whites',],
        peanut: ['Peanut', 'Peanuts', 'Peanutbutter', 'Peanut butter'],
        celery: ['Celery', 'Celery salt'],
        crustaceans: ['Prawns', 'Prawn', 'Crabs', 'Crab', 'Lobster', 'Lobsters'],
        fish: ['Fish'],
        lupin: ['Lupin'],
        molluscs: ['Mussels', 'Mussel', 'Oysters', 'Oyster'],
        mustard: ['Mustard', 'Mustards'],
        sesame: ['Sesame', 'Sesames'],
        soy: ['Soybean', 'Soybeans', 'Soyabean', 'Soyabeans', 'Soy', 'Soya', 'Chocolate', 'Chocolates', 'White chocolate', 'Cocoa butter'],
        sulphites: ['Cheese', 'Glucose', 'Glaze', 'Gel', 'Wine', 'Rum', 'Vodka', 'Gin']

    }


// function to determain all types of allergans 
    function Contain(input, title) {
        var containText = input.split(',')
        //console.log(containText, title)
        containText.forEach(e => {
            //console.log(e)
            var num = e.split(/\s+/)
            //console.log(num)
            var dairies = ingredient.dairy
            var glutens = ingredient.gluten
            var nuts = ingredient.nuts
            var eggs = ingredient.eggs
            var peanuts = ingredient.peanut
            var celery = ingredient.celery
            var crustaceans = ingredient.crustaceans
            var fish = ingredient.fish
            var lupin = ingredient.lupin
            var molluscs = ingredient.molluscs
            var mustard = ingredient.mustard
            var sesame = ingredient.sesame
            var soya = ingredient.soy
            var sulphites = ingredient.sulphites



            dairies.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())

                if (found != undefined) {
                    if (found === all || found === all.toLowerCase()) {
                        ConDairy.push(title)
                    }
                }



            })
            glutens.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConGluten.push(title)
                    tempVegan.add(title)

                }
            })
            nuts.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConNut.push(title)
                    tempVegan.add(title)
                }
            })
            eggs.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConEgg.push(title)
                }
            })
            peanuts.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConPeanut.push(title)
                    tempVegan.add(title)
                }
            })
            celery.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConCelery.push(title)
                    tempVegan.add(title)
                }
            })

            crustaceans.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConCrustacean.push(title)

                }
            })
            fish.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConFish.push(title)

                }
            })
            lupin.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConLupin.push(title)
                    tempVegan.add(title)
                }
            })
            molluscs.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConMolluscs.push(title)

                }
            })
            mustard.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConMustard.push(title)
                    tempVegan.add(title)

                }
            })
            sesame.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConSesame.push(title)
                    tempVegan.add(title)

                }
            })
            soya.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConSoya.push(title)
                    tempVegan.add(title)

                }
            })
            sulphites.forEach(all => {
                const found = num.find(element => element.toLowerCase() == all.toLowerCase())
                if (found === all || found === all.toLowerCase()) {
                    //console.log(title)
                    ConSulphites.push(title)
                    tempVegan.add(title)

                }
            })


        })
    }


    /**
    for (const item of VegeterianVQ) {
        console.log(item)
    }*/

    // function to determain which dish is with meat
    function MeatOption(input) {
        var meat = ['Pork', 'pork', 'Lamb', 'lamb', 'Chicken', 'chicken', 'beef', 'Beef', 'Fish', 'salmon', 'bass']
        input.forEach(title => {
            
            var titleArr = title.split(/\s+/)
            meat.forEach(m => {
               titleArr.forEach(t => {                   
                    if (t.toLowerCase().includes(m.toLowerCase())) {
                    meatDishes.add(title)
                   
                }
               }) 


            })
        })
    }

// function for vegan input
    function VeganOption(input) {
        var noVegan = ['Pork', 'pork', 'Lamb', 'lamb', 'Chicken', 'chicken', 'beef', 'Beef', 'Eggs', 'Egg', 'Yolks',
            'Yolk', 'Butter', 'Fish', 'Mussels', 'Mussel', 'Oysters', 'Oyster', 'Prawns', 'Prawn', 'Crabs', 'Crab', 'Lobster',
            'Lobsters', 'Milk', 'Butter', 'Cream', 'Yoghurt', 'Cheese']

        input.forEach(title => {
            //console.log(title)
            var titleArrey = title.split(/\s+/)
            noVegan.forEach(item => {
                //console.log(titleArrey)
                titleArrey.forEach(t => {
                    if (t.toLowerCase().includes(item.toLowerCase())) {
                        NewVegan.add(title)
                    }
                })

            })
        })
    }


//Buttons to deffrent type of allergy free dishes
    const ButtonsEl = document.querySelector('.buttons').children
    //console.log(ButtonEl)
    for (let i = 0; i < ButtonsEl.length; i++) {
        //console.log(ButtonsEl[i])
        ButtonsEl[i].addEventListener('click', () => {
            const value = ButtonsEl[i].innerHTML
            const input = document.getElementById('js_input').children
            //console.log(input.length)
            document.getElementById('js_input').innerHTML = ''
            // determains if only one button is clicked
            if (input.length < 1 ) {
                // determains which button is clicked
                if (value === 'Gluten Free') {
                   // if gluten free option
                   // Create tags for the types of dish
                   // inputs dish names 
                    const CreateHTagStarters = document.createElement('h4')
                    const CreateHTagMains = document.createElement('h4')
                    const CreateHTagDesserts = document.createElement('h4')
                    //saves dishs into groups
                    let starterGroup = new Set()
                    let mainGroup = new Set()
                    let dessertGroup = new Set()
                    Glutefree.forEach(element => {
                        if(element.dish === element.title){                           
                            if (element.type === 'starter'){                               
                                starterGroup.add(element)                                                              
                            }
                            else if (element.type === 'main'){
                                mainGroup.add(element)
                            }
                            else if (element.type === 'dessert'){
                                dessertGroup.add(element)
                            }                            
                        }

                    })
                    // Creats starter group and tag
                    CreateHTagStarters.innerHTML = 'Starters'
                    document.getElementById('js_input').appendChild(CreateHTagStarters)
                    starterGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                    // Creats main group and tag
                    CreateHTagMains.innerHTML = 'Mains'
                    document.getElementById('js_input').appendChild(CreateHTagMains)
                    mainGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                    // Create dessert group and tag 
                    CreateHTagDesserts.innerHTML = 'Desserts'
                    document.getElementById('js_input').appendChild(CreateHTagDesserts)
                    dessertGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                }
                if (value === 'Nut Free') {
                    // if nut free option
                    // Create tags for the types of dish
                    // inputs dish names
                    const CreateHTagStarters = document.createElement('h4')
                    const CreateHTagMains = document.createElement('h4')
                    const CreateHTagDesserts = document.createElement('h4')
                    //saves dishs into groups
                    let starterGroup = new Set()
                    let mainGroup = new Set()
                    let dessertGroup = new Set()
                    NutFree.forEach(element => {
                        if(element.dish === element.title){                           
                            if (element.type === 'starter'){                                
                                starterGroup.add(element)                                                              
                            }
                            else if (element.type === 'main'){                                
                                mainGroup.add(element)
                            }
                            else if (element.type === 'dessert'){                                
                                dessertGroup.add(element)
                            }                            
                        }
                    })
                    // Creats starter group and tag
                    CreateHTagStarters.innerHTML = 'Starters'
                    document.getElementById('js_input').appendChild(CreateHTagStarters)
                    starterGroup.forEach(item => {
                        
                        CreateEl(item)

                    })
                    // Creats main group and tag
                    CreateHTagMains.innerHTML = 'Mains'
                    document.getElementById('js_input').appendChild(CreateHTagMains)
                    mainGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                    // Create dessert group and tag 
                    CreateHTagDesserts.innerHTML = 'Desserts'
                    document.getElementById('js_input').appendChild(CreateHTagDesserts)
                    dessertGroup.forEach(item => {
                       
                        CreateEl(item)

                    })

                }
                // determains which button is clicked
                if (value === 'Peanut Free') {
                    // if peanut free option
                    // Create tags for the types of dish
                    // inputs dish names
                    const CreateHTagStarters = document.createElement('h4')
                    const CreateHTagMains = document.createElement('h4')
                    const CreateHTagDesserts = document.createElement('h4')
                    //saves dishs into groups
                    let starterGroup = new Set()
                    let mainGroup = new Set()
                    let dessertGroup = new Set()
                    PeaNutFree.forEach(element => {
                        if(element.dish === element.title){                           
                            if (element.type === 'starter'){                                
                                starterGroup.add(element)                                                              
                            }
                            else if (element.type === 'main'){                                
                                mainGroup.add(element)
                            }
                            else if (element.type === 'dessert'){                                
                                dessertGroup.add(element)
                            }                            
                        }
                    })
                    // Creats starter group and tag
                    CreateHTagStarters.innerHTML = 'Starters'
                    document.getElementById('js_input').appendChild(CreateHTagStarters)
                    starterGroup.forEach(item => {
                        
                        CreateEl(item)

                    })
                    // Creats main group and tag
                    CreateHTagMains.innerHTML = 'Mains'
                    document.getElementById('js_input').appendChild(CreateHTagMains)
                    mainGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                    // Create dessert group and tag 
                    CreateHTagDesserts.innerHTML = 'Desserts'
                    document.getElementById('js_input').appendChild(CreateHTagDesserts)
                    dessertGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                }
                // determains which button is clicked
                if (value === 'Vegan') {
                    // if vegan option
                    // Create tags for the types of dish
                    // inputs dish names
                    const CreateHTagStarters = document.createElement('h4')
                    const CreateHTagMains = document.createElement('h4')
                    const CreateHTagDesserts = document.createElement('h4')
                    //saves dishs into groups
                    let starterGroup = new Set()
                    let mainGroup = new Set()
                    let dessertGroup = new Set()
                    Vegan.forEach(element => {
                        if(element.dish === element.title){                           
                            if (element.type === 'starter'){                                
                                starterGroup.add(element)                                                              
                            }
                            else if (element.type === 'main'){
                                mainGroup.add(element)
                            }
                            else if (element.type === 'dessert'){   
                                dessertGroup.add(element)
                            }
                        }

                    })
                    // Creats starter group and tag
                    CreateHTagStarters.innerHTML = 'Starters'
                    document.getElementById('js_input').appendChild(CreateHTagStarters)
                    starterGroup.forEach(item => {
                        
                        CreateEl(item)

                    })
                    // Creats main group and tag
                    CreateHTagMains.innerHTML = 'Mains'
                    document.getElementById('js_input').appendChild(CreateHTagMains)
                    mainGroup.forEach(item => {
                        
                        CreateEl(item)

                    })
                    // Create dessert group and tag 
                    CreateHTagDesserts.innerHTML = 'Desserts'
                    document.getElementById('js_input').appendChild(CreateHTagDesserts)
                    dessertGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                }
                // determains which button is clicked
                if (value === 'Vegeterian') {
                    // if vegeterian option
                    // Create tags for the types of dish
                    // inputs dish names
                    const CreateHTagStarters = document.createElement('h4')
                    const CreateHTagMains = document.createElement('h4')
                    const CreateHTagDesserts = document.createElement('h4')
                    //saves dishs into groups
                    let starterGroup = new Set()
                    let mainGroup = new Set()
                    let dessertGroup = new Set()
                    Vegeterian.forEach(element => {
                        if(element.dish === element.title){                           
                            if (element.type === 'starter'){                               
                                starterGroup.add(element)                                                             
                            }
                            else if (element.type === 'main'){                              
                                mainGroup.add(element)
                            }
                            else if (element.type === 'dessert'){                               
                                dessertGroup.add(element)
                            }             
                        }
                    })
                    // Creats starter group and tag
                    CreateHTagStarters.innerHTML = 'Starters'
                    document.getElementById('js_input').appendChild(CreateHTagStarters)
                    starterGroup.forEach(item => {
                        
                        CreateEl(item)

                    })
                    // Creats main group and tag
                    CreateHTagMains.innerHTML = 'Mains'
                    document.getElementById('js_input').appendChild(CreateHTagMains)
                    mainGroup.forEach(item => {
                       
                        CreateEl(item)

                    })
                    // Create dessert group and tag 
                    CreateHTagDesserts.innerHTML = 'Desserts'
                    document.getElementById('js_input').appendChild(CreateHTagDesserts)
                    dessertGroup.forEach(item => {
                        
                        CreateEl(item)

                    })
                }
            } 



        })
    }

    const ButtonMainChoice = document.getElementById('mainChoice').children
    
    for (let i = 0; i < ButtonMainChoice.length; i++) {
        //console.log(ButtonMainChoice[i])
        ButtonMainChoice[i].addEventListener('click', ()=>{
            if(ButtonMainChoice[i].innerHTML === 'Starters'){
                console.log(123)
            }
            else if(ButtonMainChoice[i].innerHTML === 'Mains'){
                console.log(456)
            }
            else if(ButtonMainChoice[i].innerHTML === 'Desserts'){
                console.log(789)
            }
        })
    }

 
