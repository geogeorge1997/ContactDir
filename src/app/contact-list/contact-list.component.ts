import { Component, OnChanges, OnInit } from '@angular/core';
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
  public searchedListNames:Name[]=[]
  public displayNames:Name[]=[]
  public name:Name | undefined

  value = '';

  constructor(
    private contactListService:ContactListService,
    private mainService:MainService) { }

  ngOnInit(): void {
    const contactName=this.contactListService.getContactNames()
    if(contactName!=null){
      this.contactListNames=JSON.parse(contactName)
      this.displayNames=this.contactListNames
    }
    this.mainService.getUpdateStatus().subscribe(value=>{
      const contactName=this.contactListService.getContactNames()
      if(contactName!=null){
        this.contactListNames=JSON.parse(contactName)
        this.displayNames=this.contactListNames
    }
    })
    // console.log(this.contactListNames)
  }

  didModify() {
    this.searchedListNames=[]
    console.log(this.value)
    let reg = new RegExp(this.value.toLowerCase())
    if(this.contactListNames!=null){
      this.contactListNames.forEach((item)=>{
        var searchF = item.firstName.toLowerCase().search(reg)
        var searchL = item.lastName.toLowerCase().search(reg)
        if(searchF >= 0 || searchL >= 0)
        this.searchedListNames.push(item)
      })
    }
    this.displayNames=this.searchedListNames
    console.log(this.searchedListNames)
  }

  contactClicked(name:Name,i:number){
    console.log(i)
    this.mainService.setReadOnlyStatus(true)
    this.mainService.setSelectedName(name)
  }

  addContact(){
    this.mainService.setReadOnlyStatus(false)
  }

}
