import { Component } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Busca:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs.."
  >
  `
})

export class SearchBoxComponent {
  constructor() { }

}
