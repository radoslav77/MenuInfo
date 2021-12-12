    const PicContainer = document.querySelectorAll('.img')
    const DessertContainer = document.querySelector('.recipe-dessert')
    const MainContainer = document.querySelector('.recipe-main')
    const StarterContainer = document.querySelector('.recipe-starter')

    PicContainer.forEach((container, idx) => {
       
       container.addEventListener('click', () => {
           if(idx == 0){
               StarterContainer.hidden = false
               StarterContainer.scrollIntoView()
               DessertContainer.hidden = true
               MainContainer.hidden = true
               
           }
           if(idx == 1){
               MainContainer.hidden = false
               MainContainer.scrollIntoView()
               DessertContainer.hidden = true
               StarterContainer.hidden = true
           }
           if(idx == 2){
               DessertContainer.hidden = false
               DessertContainer.scrollIntoView()
               StarterContainer.hidden = true
               MainContainer.hidden = true
           }
       })
       container.addEventListener('dblclick', () => {
                StarterContainer.hidden = true
                DessertContainer.hidden = true
                MainContainer.hidden = true
       })
    })
