import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsModule } from '../../gifs.module';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Busca:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs.."
      (keyup.enter)="searchTags()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public taginput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTags() {
    const newTag = this.taginput.nativeElement.value;
    this.gifsService.searchTags(newTag);
    this.taginput.nativeElement.value = '';
  }
}
