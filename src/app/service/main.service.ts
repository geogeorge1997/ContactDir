import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Name } from '../interface/name';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  name = new Subject<Name>()
  readOnly = new Subject<boolean>()
  updateValue = new Subject<boolean>()

  constructor() { }

  getSelectedName(): Observable<Name>{
    return this.name.asObservable()
  }

  setSelectedName(name:Name){
    this.name.next(name)
  }

  getReadOnlyStatus(): Observable<boolean>{
    return this.readOnly.asObservable()
  }

  setReadOnlyStatus(readOnly:boolean){
    this.readOnly.next(readOnly)
  }

  getUpdateStatus(): Observable<boolean>{
    return this.updateValue.asObservable()
  }

  setUpdateStatus(readOnly:boolean){
    this.updateValue.next(readOnly)
  }
}
