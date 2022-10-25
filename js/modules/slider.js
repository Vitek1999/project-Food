function slider({ container, slide, nextArrow, prevArrow, totalCourent, currentCounter, wrapper, field }) {
    //slider
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        sliderBtnPrev = document.querySelector(prevArrow),
        sliderBtnNext = document.querySelector(nextArrow),
        sliderCurrent = document.querySelector(currentCounter),
        sliderTotal = document.querySelector(totalCourent),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let sliderIndex = 1,
        offset = 0;


    if (slides.length < 10) {
        sliderTotal.textContent = `0${slides.length}`;
        sliderCurrent.textContent = `0${sliderIndex}`;
    } else {
        sliderTotal.textContent = slides.length;
        sliderCurrent.textContent = sliderIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    sliderBtnNext.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        if (slides.length < 10) {
            sliderCurrent.textContent = `0${sliderIndex}`;
        } else {
            sliderCurrent.textContent = sliderIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex - 1].style.opacity = 1;
    });

    sliderBtnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        if (slides.length < 10) {
            sliderCurrent.textContent = `0${sliderIndex}`;
        } else {
            sliderCurrent.textContent = sliderIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex - 1].style.opacity = 1;

    });
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                sliderCurrent.textContent = `0${sliderIndex}`;
            } else {
                sliderCurrent.textContent = sliderIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[sliderIndex - 1].style.opacity = 1;

        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

}
export default slider;