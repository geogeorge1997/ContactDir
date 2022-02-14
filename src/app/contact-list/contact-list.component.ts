import { Component, OnChanges, OnInit } from '@angular/core';
import { Name } from '../interface/name';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contactNameList:Name[]=[]
  public searchedListNames:Name[]=[]
  public displayNames:Name[]=[]
  public name:Name | undefined

  value = '';

  constructor(
    private mainService:MainService) { }

  ngOnInit(): void {
    this.contactNameList = this.mainService.getContactNames()
    this.displayNames=this.contactNameList

    this.mainService.getUpdateStatus().subscribe(value=>{
      const contactNames=this.mainService.getContactNames()
      if(contactNames!=null){
        this.contactNameList = this.mainService.getContactNames()
        this.displayNames=this.contactNameList
    }
    })
  }

  didModify() {
    this.searchedListNames=[]
    let reg = new RegExp(this.value.toLowerCase())
    if(this.contactNameList!=null){
      this.contactNameList.forEach((item)=>{
        try{
          var searchF = item.firstName.toLowerCase().search(reg)
          var searchL = item.lastName.toLowerCase().search(reg)
          if(searchF >= 0 || searchL >= 0)
          this.searchedListNames.push(item)
        }
        catch(err){}
      })
    }
    this.displayNames=this.searchedListNames
  }

  contactClicked(name:Name,i:number){
    this.mainService.setMenuOpenedStatus(false)
    this.mainService.setReadOnlyStatus(true)
    this.mainService.setSelectedName(name)
  }

  addContact(){
    this.mainService.setMenuOpenedStatus(false)
    this.mainService.setReadOnlyStatus(false)
  }

}
