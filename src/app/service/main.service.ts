import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../interface/contact';
import { Name } from '../interface/name';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  name = new Subject<Name>()
  readOnly = new Subject<boolean>()
  updateValue = new Subject<boolean>()
  menuOpened = new Subject<boolean>()

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

  getMenuOpenedStatus(): Observable<boolean>{
    return this.menuOpened.asObservable()
  }

  setMenuOpenedStatus(menuOpened:boolean){
    this.menuOpened.next(menuOpened)
  }

  getContactNames() {
    let contactNameList = []
    const contactNames=localStorage.getItem('ContactNames')
    if(contactNames!=null){
      contactNameList = JSON.parse(contactNames)
    }
    return contactNameList
  }

  setContactNames(contactNameList:Name[]){
    localStorage.setItem('ContactNames',JSON.stringify(contactNameList))
  }

  getContactDetails() {
    let contactList = []
    const contactDetails=localStorage.getItem('Contacts')
    if(contactDetails!=null){
      contactList = JSON.parse(contactDetails)
    }
    return contactList
  }

  setContactDetails(contactList:Contact[]){
    localStorage.setItem('Contacts',JSON.stringify(contactList))
  }
}
