
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

    console.log(ConPeanut)
    console.log(PeaNutFree)
    var meatDishes = new Set()



    async function getDataDish(url) {
        const res = await fetch(url)
        const data = await res.json()

        data.forEach(element => {
            DataDish.push(element)
            CreateEl(element)
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
                MeatOption(ConDairy)
                VeganOption(tempVegan)
                //Gluten Free option 
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
                    
                    ConNut.forEach(title => {
                      
                        if(!title.includes(e)){
                           NutFree.add(e)
                            const nuts = ['Almonds', 'Almond', 'Walnuts', 'Walnut', 'Pecans', 'Pecan', 'Cashews', 'Cashew', 'Pistachios', 'Pistachio', 'Hazelnuts', 'Hazelnut',
                                            'Brazil', 'Brazils', 'Macadamia', 'Macadamias', 'Chestnut', 'Chestnuts', 'Filbert', 'Filberts', 'Hickory', 'Hickories', 'Pinenuts', 'Pinenut', 'Pine', 'Coconut',
                                            'Coconuts', 'Peanut', 'Peanuts', 'Peanutbutter', 'Peanut butter']
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
                    Vegeterian.delete(item)
                }
            })

        })
        //saving vegan options 
        Vegan.forEach(item => {
            NewVegan.forEach(e => {
                if (item.title === e) {
                    Vegan.delete(item)
                }
            })

            var noVegan = ['Pork', 'pork', 'Lamb', 'lamb', 'Chicken', 'chicken', 'beef', 'Beef', 'Eggs', 'Egg', 'Yolks',
                'Yolk', 'Butter', 'Fish', 'Mussels', 'Mussel', 'Oysters', 'Oyster', 'Prawns', 'Prawn', 'Crabs', 'Crab', 'Lobster',
                'Lobsters', 'Milk', 'Butter', 'Cream', 'Yoghurt', 'Cheese', 'salmon', 'bass', 'bass']
            var recArr = item.recipe.split(/\s+/)
            recArr.forEach(e => {
                noVegan.forEach(type => {
                    if (e.toLowerCase() === type.toLowerCase() + ',') {
                        Vegan.delete(item)

                    }
                })


            })

        })
        //Glutefree option

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


    function CreateEl(arr) {
        var createUl = document.createElement('a')
        createUl.innerHTML = arr.title
        let Nametitle = arr.title
        createUl.href = `/detail/${Nametitle}`
        document.getElementById('js_input').appendChild(createUl)
    }

    const allergen = {
        dairy: ['Milk', 'Butter', 'Cream', 'Yoghurt', 'Cheese'],
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
    function MeatOption(input) {
        var meat = ['Pork', 'pork', 'Lamb', 'lamb', 'Chicken', 'chicken', 'beef', 'Beef',]
        input.forEach(title => {
            var titleArr = title.split(/\s+/)
            meat.forEach(m => {
                if (title.toLowerCase().includes(m.toLowerCase())) {
                    meatDishes.add(title)

                }
            })
        })
    }

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

    function GlutenFree(input) {

    }

