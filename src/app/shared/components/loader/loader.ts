import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService} from '../../../core/services/LoadingService';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent {
  constructor(public loadingService: LoadingService) {}
}