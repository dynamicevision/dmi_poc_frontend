import {Component, Input} from '@angular/core';
import {BucketDetails} from "../models/bucket-details";

@Component({
  selector: 'app-bucket-details',
  standalone: true,
  imports: [],
  templateUrl: './bucket-details.component.html',
  styleUrl: './bucket-details.component.css'
})
export class BucketDetailsComponent {

  @Input() bucketData!: BucketDetails
}
