import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Name } from 'src/app/interface/name';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  // private contactNames:Observable<Name[]> | undefined
  // private contactNames:Name[]=[]

  constructor() { }

  getContactNames() {
    const contactNames=localStorage.getItem('ContactNames')
    return contactNames
  }
}