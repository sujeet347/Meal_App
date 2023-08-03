const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => displaySearchResults(data.meals))
            .catch(error => console.error(error));
    } else {
        searchResults.innerHTML = '';
    }
});

function displaySearchResults(meals) {
    if (!meals) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
    }

    searchResults.innerHTML = meals.map(meal => `
        <div class="col-6 col-md-3 mb-3">
            <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <button class="btn btn-primary btn-sm" onclick="addToFavorites('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">Add to Favorites</button>
                    <a href="meal.html?id=${meal.idMeal}" class="btn btn-secondary btn-sm">Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

function addToFavorites(id, name, image) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(meal => meal.id === id)) {
        favorites.push({ id, name, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

// New function to handle navigation to the favorites page
function navigateToFavorites() {
    window.location.href = "favorites.html";
}
