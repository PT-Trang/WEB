document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.slider');
    let currentIndex = 0;
    let autoSlide;
    let touchStartX = 0;
    let touchEndX = 0;

    // Kiểm tra lỗi slider
    if (!slides.length || !prev || !next || !dots.length || !slider) {
        console.error('Slider elements not found');
    } else {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function startAutoSlide() {
            autoSlide = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        // Sự kiện cho nút prev/next
        next.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        prev.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        // Sự kiện cho dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentIndex = parseInt(dot.getAttribute('data-slide'));
                showSlide(currentIndex);
                startAutoSlide();
            });
        });

        // Hiệu ứng vuốt cho slider
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 50) {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            } else if (swipeDistance < -50) {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        });

        // Khởi động slider
        showSlide(currentIndex);
        startAutoSlide();
    }

    // Recommended section scroll functionality
    const recommendedGrid = document.querySelector('.recommended-grid');
    const recommendedScrollPrev = document.querySelector('.recommended-scroll-prev');
    const recommendedScrollNext = document.querySelector('.recommended-scroll-next');

    if (!recommendedGrid || !recommendedScrollPrev || !recommendedScrollNext) {
        console.error('Recommended grid or controls not found');
    } else {
        function updateRecommendedScrollButtons() {
            const maxScroll = recommendedGrid.scrollWidth - recommendedGrid.clientWidth;
            recommendedScrollPrev.disabled = recommendedGrid.scrollLeft <= 0;
            recommendedScrollNext.disabled = recommendedGrid.scrollLeft >= maxScroll - 1;
        }

        recommendedScrollPrev.addEventListener('click', () => {
            recommendedGrid.scrollBy({ left: -220, behavior: 'smooth' });
        });

        recommendedScrollNext.addEventListener('click', () => {
            recommendedGrid.scrollBy({ left: 220, behavior: 'smooth' });
        });

        recommendedGrid.addEventListener('scroll', updateRecommendedScrollButtons);
        setTimeout(updateRecommendedScrollButtons, 0);
    }

    // Latest news section scroll functionality
    const newsGrid = document.querySelector('.news-grid');
    const newsScrollPrev = document.querySelector('.news-scroll-prev');
    const newsScrollNext = document.querySelector('.news-scroll-next');

    if (!newsGrid || !newsScrollPrev || !newsScrollNext) {
        console.error('News grid or controls not found');
    } else {
        function updateNewsScrollButtons() {
            const maxScroll = newsGrid.scrollWidth - newsGrid.clientWidth;
            newsScrollPrev.disabled = newsGrid.scrollLeft <= 0;
            newsScrollNext.disabled = newsGrid.scrollLeft >= maxScroll - 1;
        }

        newsScrollPrev.addEventListener('click', () => {
            newsGrid.scrollBy({ left: -220, behavior: 'smooth' });
        });

        newsScrollNext.addEventListener('click', () => {
            newsGrid.scrollBy({ left: 220, behavior: 'smooth' });
        });

        newsGrid.addEventListener('scroll', updateNewsScrollButtons);
        setTimeout(updateNewsScrollButtons, 0);
    }

    // Cập nhật năm bản quyền
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Chức năng cuộn lên đầu
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    // Hiển thị/ẩn nút dựa trên vị trí cuộn
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Cuộn mượt mà tùy chỉnh lên đầu
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollToTop(2000); // Cuộn trong 2000ms (2 giây)
    });

    // Hàm cuộn mượt mà
    function smoothScrollToTop(duration) {
        const start = window.scrollY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutQuad(progress); // Hàm easing cho hiệu ứng mượt mà hơn

            window.scrollTo(0, start * (1 - ease));

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        // Hàm easing: Quadratic In-Out
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(scrollStep);
    }

    // Xử lý modal đăng nhập/đăng ký
const authModal = document.getElementById('auth-modal');
const closeBtn = document.getElementById('close-auth-modal');
const loginTab = document.getElementById('login');
const registerTab = document.getElementById('register');
const switchLinks = document.querySelectorAll('.switch-link');
const openAuthModalBtn = document.getElementById('open-auth-modal');

// Mở modal với tab mặc định
function openAuthModal(defaultTab = 'login') {
    authModal.classList.add('active');

    if (defaultTab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// Sự kiện mở modal
openAuthModalBtn.addEventListener('click', function () {
    openAuthModal('login');
});

// Sự kiện đóng modal
closeBtn.addEventListener('click', function () {
    authModal.classList.remove('active');
});

// Đóng khi click ra ngoài
window.addEventListener('click', function (event) {
    if (event.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Chuyển giữa đăng nhập và đăng ký
switchLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetTab = this.dataset.tab;

        if (targetTab === 'login') {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
        } else if (targetTab === 'register') {
            loginTab.classList.remove('active');
            registerTab.classList.add('active');
        }
    });
});
});