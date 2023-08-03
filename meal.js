const mealDetails = document.getElementById('mealDetails');
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

if (mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]))
        .catch(error => console.error(error));
}

function displayMealDetails(meal) {
    mealDetails.innerHTML = `
        <div class="row">
            <div class="col-12 col-md-6">
                <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}">
            </div>
            <div class="col-12 col-md-6">
                <h2>${meal.strMeal}</h2>
                <h5>Category: ${meal.strCategory}</h5>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;
}
