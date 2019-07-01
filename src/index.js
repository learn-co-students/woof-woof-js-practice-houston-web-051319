const DOGS_URL = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilters = document.querySelector('#good-dog-filter')
let dogFilter = dogFilters.isGoodDog
document.addEventListener('DOMContentLoaded', function(){
    fetch(DOGS_URL)
    .then(function(response){
        return response.json()
    })
    .then(function(dogs){
        for(let i = 0; i <dogs.length; i++){
            
            let span = createSpan(dogs[i])
            dogBar.appendChild(span)
        }
    })
})
function createSpan(dog){
    let span = document.createElement('span')
    span.innerText = dog.name
    span.addEventListener('click', function(){
        fetch(`${DOGS_URL}/${dog.id}`)
        .then(function(response){
            return response.json()
        })
        .then(function(dog){
            console.log(dog)
            dogInfoSetUp(dog)
        })
    })
    return span
}
function dogInfoSetUp(dog){
    const cardDiv = document.createElement('div')
    if(dogInfo.childElementCount !== 0){
        dogInfo.removeChild(dogInfo.firstChild)
        cardDiv.append(createDogImg(dog), createHeader(dog), createButton(dog))
        dogInfo.appendChild(cardDiv)
    }
    else{
        cardDiv.append(createDogImg(dog), createHeader(dog), createButton(dog))
        dogInfo.appendChild(cardDiv)
    }
    
    // parent.append(child1, child2, etc)
}
function createDogImg(dog){
    let img =  document.createElement('img')
    img.src = dog.image
    return img
}
function createHeader(dog){
    let h2 =  document.createElement('h2')
    h2.innerText = dog.name
    return h2
}
function createButton(dog){
    let button =  document.createElement('button')
    let goodDog = dog.isGoodDog
    if(goodDog === true )
        button.innerHTML = "Good Dog!"
    else
        button.innerHTML = "Bad Dog!"
    button.addEventListener('click', function(){
        fetch(`${DOGS_URL}/${dog.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "isGoodDog": !goodDog
            })
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            goodDog = !goodDog
            if(goodDog === true )
                button.innerHTML = "Good Dog!"
            else
                button.innerHTML = "Bad Dog!"
        })
    })
    return button
}
dogFilters.addEventListener('click', function(){
    fetch(DOGS_URL)
    .then(function(response){
        return response.json()
    })
    .then(function(dogs){
        dogFilter = !dogFilter
        console.log(dogFilter)
        if(dogFilter){
            dogFilters.innerHTML = 'Filter good dogs: ON'
            let goodDogs = []
            for(let i = 0; i<dogs.length; i++){
                
                if(dogs[i].isGoodDog === true){
                   
                    goodDogs.push(dogs[i])
                    
                }
            }
            console.log(goodDogs)
            while (dogBar.hasChildNodes()) {   
                dogBar.removeChild(dogBar.firstChild);
            }
            for(let i = 0; i<goodDogs.length; i++){
                let span = createSpan(goodDogs[i])
                dogBar.appendChild(span)
            } 
        }
        else{
            dogFilters.innerHTML = 'Filter good dogs: OFF'
            while (dogBar.hasChildNodes()) {   
                dogBar.removeChild(dogBar.firstChild);
            }
            for(let i = 0; i<dogs.length; i++){
                let span = createSpan(dogs[i])
                dogBar.appendChild(span)
            } 
        }
            
        
    })
})