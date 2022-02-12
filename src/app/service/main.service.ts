import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Name } from '../interface/name';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  name = new Subject<Name>()

  constructor() { }

  getSelectedName(): Observable<Name>{
    return this.name.asObservable()
  }

  setSelectedName(name:Name){
    this.name.next(name)
  }
}
