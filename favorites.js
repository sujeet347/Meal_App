const favoriteMeals = document.getElementById('favoriteMeals');

function loadFavoriteMeals() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteMeals.innerHTML = favorites.map(meal => `
        <div class="row mb-3">
            <div class="col-4 col-md-2">
                <img src="${meal.image}" class="img-fluid" alt="${meal.name}">
            </div>
            <div class="col-8 col-md-10">
                <h4>${meal.name}</h4>
                <button class="btn btn-danger btn-sm" onclick="removeFromFavorites('${meal.id}')">Remove from Favorites</button>
            </div>
        </div>
    `).join('');
}

function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(meal => meal.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavoriteMeals();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFavoriteMeals();
});

