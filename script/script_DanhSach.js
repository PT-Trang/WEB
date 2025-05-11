document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử
    const categoryOptions = document.querySelectorAll('.category-option');
    const productCards = document.querySelectorAll('.product-card');
  
    // Xử lý chọn danh mục
    categoryOptions.forEach(button => {
      button.addEventListener('click', () => {
        // Xóa class 'active' khỏi tất cả các nút
        categoryOptions.forEach(btn => btn.classList.remove('active'));
        // Thêm class 'active' cho nút được nhấn
        button.classList.add('active');
  
        // Lấy giá trị danh mục
        const filter = button.getAttribute('data-filter');
  
        // Lọc sản phẩm
        productCards.forEach(card => {
          const category = card.querySelector('.product-category').textContent.trim();
          const isFeatured = card.getAttribute('data-featured') === 'true';
  
          if (filter === 'all') {
            card.style.display = 'flex';
          } else if (filter === 'featured' && isFeatured) {
            card.style.display = 'flex';
          } else if (
            (filter === 'tea' && category === 'TRÀ') ||
            (filter === 'cake' && category === 'BÁNH NGỌT')
          ) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  
    // Mặc định kích hoạt "Tất cả"
    document.querySelector('.category-option[data-filter="all"]').classList.add('active');
    productCards.forEach(card => {
      card.style.display = 'flex';
    });
  });