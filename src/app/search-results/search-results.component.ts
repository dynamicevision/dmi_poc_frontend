import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BucketDetails} from "../models/bucket-details";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    MatListModule,
    FormsModule
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  @Input() result!: any
  @Output() checkboxCheckEvent: EventEmitter<any> = new EventEmitter<any>()
  isChecked?: boolean
  downloadMyFile() {
    if(confirm("Are you sure to download "+this.result.name)) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', this.result.url);
      link.setAttribute('download', this.result.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  checkboxChangeHandler($event: any){
    console.log('Checked: ', this.result.name, this.isChecked)
    this.checkboxCheckEvent.emit({name: this.result.name, isChecked: this.isChecked})
  }
}
