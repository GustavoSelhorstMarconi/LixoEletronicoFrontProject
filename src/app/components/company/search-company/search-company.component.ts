import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-search-company',
  standalone: true,
  imports: [CardModule, ImageModule, RatingModule],
  templateUrl: './search-company.component.html',
  styleUrl: './search-company.component.scss'
})
export class SearchCompanyComponent {

}
