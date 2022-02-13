import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/interface/contact';

@Injectable({
  providedIn: 'root'
})
export class ViewContactService {

  private contactsUrl = 'api/contacts/';

  constructor(
  ) { }
}
