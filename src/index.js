const DogURL = "http://localhost:3000/pups"
function c(element){
    return document.createElement(element)
}

function initialfetch(dogFilter,dogBar,dogInfo){
    fetch(DogURL).then( (response) => {return response} )
    .then( (result) => {return result.json()} )
    .then( (dogs) => {
        dogs.forEach( (dog) => {
            if(dog.isGoodDog || dogFilter.value == "off"){
                dogSpan(dog,dogBar,dogInfo)
            }
        })
    })
}

//things that will need to load after html is loaded
document.addEventListener("DOMContentLoaded",function(){
    function s(element){
        return document.querySelector(element)
    }

    let dogBar = s('#dog-bar')
    let dogInfo = s('#dog-info')
    let dogFilter = s('#good-dog-filter')
    dogFilter.value = "off"
    dogFilter.addEventListener('click',() => filterDogs(dogFilter,dogBar,dogInfo) )

    initialfetch(dogFilter,dogBar,dogInfo)

})

//function for dog filter
function filterDogs(dogFilter,dogBar,dogInfo){
    if(dogFilter.value == "on"){
        dogFilter.value = "off"
        dogFilter.innerText = "Filter good dogs: OFF"
    }else{
        dogFilter.value = "on"
        dogFilter.innerText = "Filter good dogs: ON"
    }

    dogBar.innerText = ""

    initialfetch(dogFilter,dogBar,dogInfo)
}

//function to add dog buttons
function dogSpan(dog,dogBar,dogInfo){
    let span = c('span')
    span.innerText = dog.name
    span.addEventListener('click', ()=>dogDetails(dog,dogInfo) )

    dogBar.append(span)
}

//function to pull up dog details
function dogDetails(dog,dogInfo){
    dogInfo.innerText = ""
    let img = c('img')
    img.src = dog.image
    let h2 = c('h2')
    h2.innerText = dog.name
    let button = c('button')
    if(dog.isGoodDog == true){
        button.innerText = "Good Dog!"
    }else{
        button.innerText = "Bad Dog!"
    }
    button.addEventListener('click', ()=>goodDog(dog,button))

    dogInfo.append(img, h2, button)
}

//function to change dog quality
function goodDog(dog,button){
    fetch(DogURL + `/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
    }).then((response)=>{return response.json()})
    .then( (newDog) => {
        dog.isGoodDog = newDog.isGoodDog
        if(newDog.isGoodDog == true){
            button.innerText = "Good Dog!"
        }else{
            button.innerText = "Bad Dog!"
        }
    } )
}