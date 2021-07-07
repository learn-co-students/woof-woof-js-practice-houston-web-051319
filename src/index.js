document.addEventListener('DOMContentLoaded',()=>{
  console.log('Plus Ultra!!');
let dogsURL = 'http://localhost:3000/pups'
let dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')


fetch(dogsURL)
.then((res)=>{return res.json()})
.then((data)=>{
  console.log(data);
  //some function to add dogs to bar
  data.forEach((dog)=>{showDogs(dog)})
})

function showDogs(dog){
  // dogBar.innerHTML = ""
  let span = document.createElement('span')
  span.innerText = dog.name
  dogBar.append(span)

  //add even listener to span later
  span.addEventListener('click',()=>{
    dogInfo.innerHTML =""
    console.log(dog);
    let img  = document.createElement('img')
    img.src = dog.image

    let h2 = document.createElement('h2')
    h2.innerText = dog.name

    let button = document.createElement('button')
    if (dog.isGoodDog==true){
      button.innerText ='Good Dog'
    }
    else{
      button.innerText = 'Bad Dog'
    }

    dogInfo.append(img,h2,button)

    button.addEventListener('click',(e)=>{
      e.preventDefault()
      // console.log(dog.isGoodDog);
      let new_status = !dog.isGoodDog
      // console.log(new_status);
      console.log(`${dogsURL}/${dog.id}`);
      console.log(dog.isGoodDog);
      fetch(`${dogsURL}/${dog.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
          // "Accept": "application/json"
        },
        body: JSON.stringify({
          'isGoodDog': new_status
        })
      })//fetch
      .then((res)=>{ return res.json()})
      .then((data)=>{
        console.log(data);
         dog.isGoodDog = data.isGoodDog
         if (dog.isGoodDog==true){
           button.innerText ='Good Dog'
         }
         else{
           button.innerText = 'Bad Dog'
         }

        ;})


    })//listener




  })


}//showDogs ends











})
