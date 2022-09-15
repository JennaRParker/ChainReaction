
let restaurants = document.getElementsByClassName(allofthechains);

const searchInput = document.querySelector("[data-search]");

searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    restaurants.forEach(restaurant => {
        const isVisible = restaurant.name.includes(value)
        restaurant.element.classList.toggle("hide", !isVisible)
    })
    })

