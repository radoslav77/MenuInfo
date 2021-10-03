    const ingredient = {
            dairy : ['Milk','Butter', 'Cream','Yoghurt','Cheese'],
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
        
        const recipeData = document.getElementById('recipes')
        let dataText = []
        const i = recipeData.innerText.split('\n')
       // console.log(i)

        ContainAllergents()


function ContainAllergents() {
    i.forEach(e => {
        var num = e.split(/\s+/)
        var dairies = ingredient.dairy
        var glutens = ingredient.gluten
        var nuts = ingredient.nuts
        var eggs = ingredient.eggs
        var peanuts = ingredient.peanut
        var celery = ingredient.celery
        var crustaceans = ingredient.crustaceans
        var fish =  ingredient.fish
        var lupin = ingredient.lupin
        var molluscs = ingredient.molluscs
        var mustard = ingredient.mustard
        var sesame = ingredient.sesame
        var soya = ingredient.soy
        var sulphites = ingredient.sulphites

        peanuts.forEach(all => {
            const found = num.find(element => element.toLowerCase() === all.toLowerCase())   
            if (found == all || found == all.toLowerCase()){                  
                const PeanutData = document.querySelector('.peanuts')             
                PeanutData.hidden = false
                PeanutData.innerText = 'Peanuts,'
              
            }
        })

        eggs.forEach((all, idx) => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){                
                const viewData = document.querySelector('.allergy')
                viewData.hidden = false
                viewData.innerHTML = 'Eggs,'
                //console.log(found)
            }  

            
        })

        glutens.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const GlutenData = document.querySelector('.glutens')
                GlutenData.hidden = false
                GlutenData.innerText = 'Gluten,'
                
            }
        })

        dairies.forEach(all => {
            console.log(all)
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if (  found == all.toLowerCase()||found == all){
                const DairyData = document.querySelector('.dairies')
                DairyData.hidden = false
                DairyData.innerText = 'Dairy,'
                
            }
        })

        nuts.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const NutsData = document.querySelector('.nuts')
                NutsData.hidden = false
                NutsData.innerText = 'Nuts,'
                
            }
        })

        celery.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const CeleryData = document.querySelector('.celery')
                CeleryData.hidden = false
                CeleryData.innerText = 'Celery,'
                
            }
        })

        crustaceans.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const CrustaceansData = document.querySelector('.crustaceans')
                CrustaceansData.hidden = false
                CrustaceansData.innerText = 'Crustaceans,'
                
            }
        })

        fish.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const FishData = document.querySelector('.fish')
                FishData.hidden = false
                FishData.innerText = 'Fish,'
                
            }
        })

        lupin.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const LupinData = document.querySelector('.lupin')
                LupinData.hidden = false
                LupinData.innerText = 'Lupin,'
                
            }
        })

        molluscs.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const MolluscsData = document.querySelector('.molluscs')
                MolluscsData.hidden = false
                MolluscsData.innerText = 'Molluscs,'
                
            }
        })

        mustard.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const MustardData = document.querySelector('.mustard')
                MustardData.hidden = false
                MustardData.innerText = 'Mustard,'
                
            }
        })

        sesame.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const SesameData = document.querySelector('.sesame')
                SesameData.hidden = false
                SesameData.innerText = 'Sesame,'
                
            }
        })

        soya.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())               
            if ( found == all || found == all.toLowerCase()){        
                const soyaData = document.querySelector('.soya')
                soyaData.hidden = false
                soyaData.innerHTML = 'Soya,'
                
            }
        })

        sulphites.forEach(all => {
            const found = num.find(element => element.toLowerCase() == all.toLowerCase())   
            if ( found == all || found == all.toLowerCase()){
                const SulphitesData = document.querySelector('.sulphites')
                SulphitesData.hidden = false
                SulphitesData.innerText = 'Sulphites,'
                
            }
        })

    })
}

    
