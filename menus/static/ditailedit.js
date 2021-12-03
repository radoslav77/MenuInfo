const USER_LOGGED_IN = ('/logged_user')
getLoggedInUser(USER_LOGGED_IN)
const User_URL_info = ('/user_info')
getUserData(User_URL_info)


const URL_EDIT_FORM = ('/edit-recipe')
getDataForm(URL_EDIT_FORM)
const title = document.getElementById('title').innerText
const EditRecipe = document.getElementById('edit')
const inputTitle = document.getElementById('form_title')
const inputSelector = document.getElementById('selector')
const input_For_Dish = document.getElementById('form_for_dish')
const inputRecipe = document.getElementById('recipe')
const inputMethod = document.getElementById('method')
const EditBtn = document.getElementById('edit')
const DivForm = document.querySelector('.editform')
const DivDetails = document.querySelector('.container-details')
const ReturnEl = document.getElementById('return')
const WorningDiv = document.getElementById('worning')


var UserCurrent = []
var UserData = new Array([])
async function getLoggedInUser(url) {
    const res = await fetch(url)
    const data = await res.json()
    UserCurrent.push(data)
    //console.log(data)


}

async function getUserData(url) {
    const res = await fetch(url)
    const user = await res.json()
    user.forEach(u => {
        //console.log(UserCurrent)
        //console.log(u.groups)
        UserData.push(u)
        EditBtn.addEventListener('click', () => {
            if (UserCurrent[0] === u.user && u.groups === 'chef') {
                WorningDiv.style.display = 'none'
                DivDetails.style.display = 'none'
                DivForm.hidden = false


            } else {



                DivDetails.style.opacity = 0.5
                DivDetails.style.zIndex = -1
                WorningDiv.style.opacity = 1
                WorningDiv.hidden = false
                WorningDiv.classList.add('contain')
                WorningDiv.innerHTML = 'You DO NOT have permition for this action! Contact your administarator!'

            }
        })
    })

    //console.log(user)
}
//console.log(UserData.length)
//


//const User = {{ user }}
//console.log(User)


async function getDataForm(url) {
    const res = await fetch(url)
    const data = await res.json()
    data.forEach(recipe => {
        if (recipe.title == title) {
            inputTitle.value = recipe.title
            inputSelector.value = recipe.type
            input_For_Dish.value = recipe.dish
            inputRecipe.value = recipe.recipe
            inputMethod.value = recipe.method



            //console.log(recipe)
        }
    });

}

WorningDiv.addEventListener('click', () => {
    location.reload()
})

ReturnEl.addEventListener('click', () => {
    location.reload()
})