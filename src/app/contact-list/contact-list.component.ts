import { Component, OnInit } from '@angular/core';
import { Name } from '../interface/name';
import { MainService } from '../service/main.service';
import { ContactListService } from './service/contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contactListNames:Name[]=[]
  public name:Name | undefined

  constructor(
    private contactListService:ContactListService,
    private mainService:MainService) { }

  ngOnInit(): void {
    const contactName=this.contactListService.getContactNames()
    if(contactName!=null){
      this.contactListNames=JSON.parse(contactName)
    }
    console.log(this.contactListNames)
  }

  contactClicked(name:Name,i:number){
    console.log(i)
    this.mainService.setSelectedName(name)
  }

}
