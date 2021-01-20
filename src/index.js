let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('form')

  toyForm.addEventListener('submit', handleSubmit)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const fetchToys = () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => renderToy(toy)))
}

const submitToys = (toy) => {
  fetch('http://localhost:3000/toys', {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(toy => renderToy(toy))
}

const patchToy = (toy) => {
  toy.likes++
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    let oldToy = document.getElementById(toy.id)
    let p = oldToy.querySelector('p')
    p.textContent = `${toy.likes} Likes`
  })
}

const renderToy = (toy) => {
  const coll = document.querySelector('#toy-collection')

  const  div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')

  div.className = 'card'
  div.id = toy.id
  h2.innerHTML = toy.name
  img.src = toy.image
  img.className = 'toy-avatar'
  img.style.width = '200px'
  p.innerHTML = `${toy.likes} Likes`
  btn.className = 'like-btn'
  btn.innerHTML = "Like"

  btn.addEventListener('click', () => patchToy(toy))

  div.append(h2, img, p, btn)
  coll.appendChild(div)
}

const handleSubmit = (e) => {

  e.preventDefault()
  let toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  console.log(toy)
  submitToys(toy)
}