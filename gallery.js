// Инициализация карусели для ванной
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.bathroom-carousel');
  if (!carousel) return;

  const container = carousel.querySelector('.carousel-container');
  const images = carousel.querySelectorAll('.carousel-img');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');

  if (!container || !images.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      if (i === index) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });
  }

  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  showImage(currentIndex);
});
