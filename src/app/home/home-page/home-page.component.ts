import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

  private allProducts: Product[] = [
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' },
    { name: 'Krem do rąk', description: 'Naturalny krem do rąk z olejkami eterycznymi.', image: 'images/hand-cream.png' },
    { name: 'Mydło lawendowe', description: 'Ręcznie robione mydło o zapachu lawendy.', image: 'images/lavender-soap.png' },
    { name: 'Świeca sojowa', description: 'Świeca sojowa o zapachu wanilii.', image: 'images/soy-candle.png' }
  ];

  products: Product[] = [];
  private pageSize = 5; // Liczba produktów w jednej partii
  private currentPage = 0
  private isLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.loadNextPage(); // Załaduj pierwszą stronę przy inicjalizacji komponentu
  }

  // Funkcja ładowania kolejnej strony


  loadNextPage() {
    this.isLoading = true;
    // Dodaj kolejną partię produktów
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    setTimeout(() => { // Symulacja opóźnienia ładowania
      this.products = [...this.products, ...this.allProducts.slice(startIndex, endIndex)];
      this.currentPage++;
      this.isLoading = false;
    }, 100); // Opóźnienie 0,1 sekundy
  }

  addToCart(product: Product) {
    console.log(`${product.name} dodano do koszyka`);
  }

  // Nasłuchuj zdarzenia przewijania okna
  @HostListener("window:scroll", [])
  onScroll(): void {
    // Sprawdź, czy użytkownik przewinął do końca strony
    if (!this.isLoading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.loadNextPage(); // Załaduj kolejną stronę
    }
  }
}
