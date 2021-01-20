document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

const patchTable = (e, dog) => {
    e.preventDefault()
    const updatedName = e.target.elements[0].value 
    const updatedBreed = e.target.elements[1].value 
    const updatedSex = e.target.elements[2].value

    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
           'Content-Type':'application/json',
       },
       body: JSON.stringify({
           "name": updatedName,
           "breed": updatedBreed, 
           "sex": updatedSex
       })
     })
     .then(resp => resp.json())
     .then(dog => renderTable(dog))
     .catch(error => console.log(error))
}

const fetchDogs = () => {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog => renderTable(dog))
    })
}

const renderTable = (dog) => {
    const tbody = document.getElementById('table-body')
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    const td4 = document.createElement('td')
    const btn = document.createElement('button')

    td1.innerHTML = dog.name
    td2.innerHTML = dog.breed
    td3.innerHTML = dog.sex
    btn.textContent = 'Edit Dog'

    td4.appendChild(btn)
    tr.append(td1, td2, td3, td4)
    tbody.appendChild(tr)

    btn.addEventListener("click", () => handleClick(dog))
}

const handleClick = (dog) => {
    let form = document.getElementById('dog-form')

    form.elements[0].value = dog.name
    form.elements[1].value = dog.breed
    form.elements[2].value = dog.sex

    form.addEventListener("submit", (e) => patchTable(e, dog))
}