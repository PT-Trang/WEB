function addToFavorites(id, name) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.find(item => item.id === id)) {
        favorites.push({ id, name });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${name} đã được thêm vào yêu thích!`);
    } else {
        alert(`${name} đã có trong danh sách yêu thích.`);
    }
  }

function filterRecipes() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.list-item');

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(keyword) ? 'block' : 'none';
    });
  }


const allItems = [
    {
        id: 1,
        name: "Trà đen",
        image: "../assest/tra_Den.jpg",
        desc: "Trà đen hương vị đậm đà, lý tưởng để bắt đầu một buổi sáng đầy năng lượng."
    },
    {
        id: 2,
        name: "Trà xanh (khô)",
        image: "../assest/tra_xanh.jpg",
        desc: "Trà xanh - hương vị tự nhiên, thích hợp cho những lúc cần thư giãn nhẹ nhàng."
    },
    {
        id: 3,
        name: "Trà ô long",
        image: "../assest/tra_Oolong.jpg",
        desc: "Trà ô long có hương thơm tinh tế, thích hợp trong các buổi trà chiều thanh nhã."
    },
    {
        id: 4,
        name: "Trà lài - Trà ướp hoa lài",
        image: "../assest/tra_lai.jpg",
        desc: "Trà lài mang đến cảm giác thư thái rất phù hợp với không gian yên tĩnh, thư giãn."
    },
    {
        id: 5,
        name: "Trà Shan tuyết cổ thụ - Bạch trà",
        image: "../assest/tra_ShanTuyet.jpg",
        desc: "Loại trà quý mang hương thơm nhẹ, là lựa chọn cho người yêu trà truyền thống.."
    },
    {
        id: 6,
        name: "Saint-Honoré lemon yuzu",
        image: "../assest/saint_honore.jpg",
        desc: "Món bánh Pháp cầu kỳ với nhân kem béo nhẹ, tạo cảm giác vừa lạ vừa sang trọng."
    },
    {
        id: 7,
        name: "Croissant",
        image: "../assest/Strawberry_Croissaint.webp",
        desc: "Bánh sừng bò dâu tây, lý tưởng cho bữa sáng cùng một tách trà nóng."
    },
    {
        id: 8,
        name: "Tiramisu Classic",
        image: "../assest/tiraimisu.jpg",
        desc: "Bánh tráng miệng nổi tiếng từ Ý với lớp kem béo nhẹ, xen lẫn vị cà phê đậm đà."
    },
    {
        id: 9,
        name: "Mousse Blueberry",
        image: "../assest/mousse.jpg",
        desc: "Món bánh lạnh nhẹ nhàng, mang lại cảm giác dễ chịu và sảng khoái."
    },
    {
        id: 10,
        name: "Le Paris Breat",
        image: "../assest/le-paris-breat.jpg",
        desc: "Bánh vòng truyền thống, rất hợp với trà ô long hoặc trà lài."
    }
];

function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const grid = document.getElementById('favoritesGrid');
    grid.innerHTML = '';

    favorites.forEach(fav => {
        const item = allItems.find(i => i.id === fav.id);
        if (item) {
            const div = document.createElement('div');
            div.className = 'fav-card';
            div.innerHTML = `
                <a href="../page/bia_croissaint.html">
                <img src="${item.image}" alt="${item.name}" class="fav-card__img">
                </a>
                <h3 class="fav-card__title">${item.name}</h3>
                <p class="fav-card__desc">${item.desc}</p>
                <button class="fav-remove-button" onclick="removeFavorite(${item.id})">Xóa khỏi yêu thích</button>
            `;
            grid.appendChild(div);
        }
    });

    if (favorites.length === 0) {
        grid.innerHTML = '<p> </p><p style="text-align:center; font-style:italic;"> <br> <br>Bạn chưa thêm món nào vào danh sách yêu thích.</p>';
    }
}

function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(item => item.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
}

renderFavorites();


