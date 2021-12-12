    const StarterInputElement = document.getElementById('id_starter')
    const MainInputElement = document.getElementById('id_main')
    const DessertInputElement = document.getElementById('id_dessert')
    const FORM_DATA_URL = ('/menu_input')

    getDataForm(FORM_DATA_URL)

    // console.log(StarterInputElement, '->', MainInputElement, '->', DessertInputElement)
    SelectValueToNone(StarterInputElement)
    SelectValueToNone(MainInputElement)
    SelectValueToNone(DessertInputElement)
    var Starter_dish = []
    var Main_dish = []
    var Dessrt_dish = []

    async function getDataForm(url) {
        const res = await fetch(url)
        const data = await res.json()
        data.forEach(dish => {
            if (dish.type === 'Starters') {
                Starter_dish.push(dish)
                var SelectOption = document.createElement('option')
                var x = document.createElement("OPTION");
                x.setAttribute("value", dish.id);
                var t = document.createTextNode(dish.title);
                x.appendChild(t);
                document.getElementById("id_starter").appendChild(x);
            }
            if (dish.type === 'Mains') {
                Main_dish.push(dish)
                var SelectOption = document.createElement('option')
                var x = document.createElement("OPTION");
                x.setAttribute("value", dish.id);
                var t = document.createTextNode(dish.title);
                x.appendChild(t);
                document.getElementById("id_main").appendChild(x);
            }
            if (dish.type === 'Desserts') {
                Dessrt_dish.push(dish)
                var SelectOption = document.createElement('option')
                var x = document.createElement("OPTION");
                x.setAttribute("value", dish.id);
                var t = document.createTextNode(dish.title);
                x.appendChild(t);
                document.getElementById("id_dessert").appendChild(x);
            }
            // console.log(dish.type)
        })

    }
    //console.log(Dessrt_dish)
    //console.log(StarterInputElement.children)

    function SelectValueToNone(elements) {
        let arreyElements = Array.from(elements.options)
        arreyElements.forEach(e => {
            e.value = ''
            e.innerText = ''
            elements.removeChild(e)
        })
    }

    function SelectValuePush(elements, arr) {
        var SelectOption = document.createElement('option')

        arreyElements.forEach(e => {
            console.log(e.value, e.innerText)
        })

    }

