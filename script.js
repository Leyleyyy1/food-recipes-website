document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("resultsContainer");

    let recipes = [];
    fetch("dataresep.json")
        .then(response => response.json())
        .then(data => {
            recipes = data;
            showRecipes(recipes);
        });

    function showRecipes(recipeList) {
        resultsContainer.innerHTML = ""; 

        const gridContainer = document.createElement("div");
        gridContainer.classList.add("grid-container");

        recipeList.forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            card.innerHTML = `
                <h3 class="recipe-title">${recipe.Title}</h3>
                <img src="${recipe.URL}" alt="${recipe.Title}" class="recipe-image">
                <button onclick="window.location.href='resep.html?title=${encodeURIComponent(recipe.Title)}'">Lihat Resep</button>
            `;

            gridContainer.appendChild(card);
        });

        resultsContainer.appendChild(gridContainer);
    }

    searchInput.addEventListener("input", function () {
        const keyword = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.Title.toLowerCase().includes(keyword)
        );
        showRecipes(filteredRecipes);
    });
});
