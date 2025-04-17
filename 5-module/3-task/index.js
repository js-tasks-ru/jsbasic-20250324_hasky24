function initCarousel() {

  let carouselInner = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');
  let widthContainer = carouselInner.offsetWidth;
  let count = 1;
  let position = 0;
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let container = document.querySelector('.container');

  if (count === 1) {
    arrowLeft.style.display = 'none';
  }

  container.addEventListener('click', function (event) {
    if (event.target.closest('.carousel__arrow_right')) {
      if (count < slides.length) {
        position += widthContainer;
        count += 1;
        arrowLeft.style.display = '';
        carouselInner.style.transform = `translateX(-${position}px)`;
      }

      if (count === slides.length) {
        arrowRight.style.display = 'none';
      }
    }

    if (event.target.closest('.carousel__arrow_left')) {
      if (count > 1) {
        position -= widthContainer;
        count -= 1;
        arrowRight.style.display = '';
        carouselInner.style.transform = `translateX(-${position}px)`;
      }

      if (count === 1) {
        arrowLeft.style.display = 'none';
      }
    }
  });
}



