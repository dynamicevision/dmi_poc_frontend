import {Component, inject, OnInit} from '@angular/core';
import {SearchService} from "../search.service";
import {CommonModule} from "@angular/common";
import {BucketDetailsComponent} from "../bucket-details/bucket-details.component";
import {BucketDetails} from "../models/bucket-details";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SearchResultsComponent} from "../search-results/search-results.component";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports:[
    CommonModule,
    BucketDetailsComponent,
    SearchResultsComponent,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class SearchComponent implements OnInit{

  searchService: SearchService = inject(SearchService);
  buckets: BucketDetails[] = []
  searchResults: any[] = []
  fileName = '';
  searchForm = new FormGroup({
    query: new FormControl(''),
    bucket: new FormControl('')
  })
  uploadForm = new FormGroup({
    bucket: new FormControl('')
  })
  multiDownloadList: any[] = []
  async ngOnInit() {
    this.buckets = (await this.searchService.listBuckets()).content
  }

  async submitQuery() {
    const data = await this.searchService.search(this.searchForm.value.bucket??'', this.searchForm.value.query ?? '')
    this.searchResults = data.content;
  }

  async checkboxEventHandler(data: any) {
    console.log('checkboxEventHandler:: ', data)
    if(data.isChecked){
      this.multiDownloadList.push(data.name);
    } else {
      const nameIndex = this.multiDownloadList.indexOf(data.name);
      if(nameIndex > -1){
        this.multiDownloadList.splice(nameIndex, 1);
      }
    }
  }

  async downloadMultipleFiles() {
    console.log('TO be downloaded files: ', this.multiDownloadList);
  }

  async onFileSelected($event: any) {
    const file:File = $event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append('bucket', this.uploadForm.value.bucket??'');

      await this.searchService.uploadFile(this.uploadForm.value.bucket??'', formData)
    }
  }
}
