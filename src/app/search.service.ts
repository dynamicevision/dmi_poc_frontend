import { Injectable } from '@angular/core';
import {BucketDetails} from "./models/bucket-details";
import {PagedResponse} from "./models/paged-response";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  baseUrl: string = 'http://localhost:8080'
  async search(bucket: string, query: string): Promise<PagedResponse>{
    console.log('Searching: ', query)
    const data = await fetch(this.baseUrl+`/search?q=${query}&bucket=${bucket}`);
    return await data.json()?? []
  }

  async listBuckets(): Promise<PagedResponse> {
    const data = await fetch(this.baseUrl+'/buckets');
    return await data.json() ?? []
  }

  async uploadFile(bucket: string, formData: FormData) {
    const data = await fetch(this.baseUrl + '/upload', {
      method: 'POST',
      body: formData
    })

    return await data.json() ?? null;
  }


  listBucketObjects() {
    return [
      {
        name: 'object1',
        bucket: 'bucket1',
        url:'http://obj1'
      }
    ];
  }
}
