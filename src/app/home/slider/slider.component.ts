import { Component } from '@angular/core';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  slides: Slide[] = [
    {
      image: 'images/slide1.png',
      title: 'Odkryj nasz bestseller',
      description: 'Naturalne kosmetyki najwyższej jakości.',
      buttonLabel: 'Buy Now',
      buttonLink: '/products/1' // Link do produktu
    },
    {
      image: 'images/slide2.png',
      title: 'Poznaj nasz blog',
      description: 'Sprawdź najnowsze artykuły o pielęgnacji.',
      buttonLabel: 'Read More',
      buttonLink: '/blog/1' // Link do artykułu
    },
    // Możesz dodać więcej slajdów
  ];
  currentSlide = 0;

 prevSlide() {
    const previousSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;

    this.updateSlideClasses(previousSlide, this.currentSlide);
  }

  nextSlide() {
    const previousSlide = this.currentSlide;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;

    this.updateSlideClasses(previousSlide, this.currentSlide);
  }

  updateSlideClasses(previousSlide: number, currentSlide: number) {
    const slides = document.querySelectorAll('.slide');

    if (slides[previousSlide]) {
      slides[previousSlide].classList.remove('active');
    }
    if (slides[currentSlide]) {
      slides[currentSlide].classList.add('active');
    }
  }
}
