import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../interface/contact';
import { Name } from '../interface/name';
import { MainService } from '../service/main.service';
import { ViewContactService } from './service/view-contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public readOnly:boolean = true

  contactForm = new FormGroup({})
  contact:Contact={
    id:'',
    firstName: '',
    middleName: '',
    lastName: '',
    address:{
      street:'',
      city:'',
      state:'',
      zip:''
    },
    phoneNumber: '',
    emailId: ''
  }
  name:Name={
    id:'',
    firstName:'',
    lastName:''
  }
  public previousId:string=''
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private mainService:MainService,
    private viewContactService:ViewContactService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      phoneNumber: [''],
      emailId: ['']
    });

    this.mainService.getSelectedName().subscribe((name:Name)=>{
      this.name=name
      if(name!=null){
        const contacts = localStorage.getItem('Contacts')
        // console.log(contacts)
        if(contacts!=null){
          const contactLists = JSON.parse(contacts)
          contactLists.find((m:Contact)=>{
            if(m.id==name.id){
              this.previousId=name.id
              this.contactForm.setValue({
                firstName: m.firstName,
                middleName: m.middleName,
                lastName: m.lastName,
                address:{
                  street:m.address.street,
                  city:m.address.city,
                  state:m.address.state,
                  zip:m.address.zip
                },
                phoneNumber: m.phoneNumber,
                emailId: m.emailId
              })
            }
          })
        }
      }
    })

    this.mainService.getReadOnlyStatus().subscribe(value=>{
      this.readOnly=value
      this.contactForm.reset()
      // console.log("ggg")
      //reset Form
    })
  }

  editClicked(){
    this.readOnly=false
  }

  saveClicked(){
    this.contact=this.contactForm.value
    const id = this.contactForm.value.firstName+this.contactForm.value.middleName+this.contactForm.value.lastName
    this.contact.id =id

    const oldRecords = localStorage.getItem('Contacts')
    this.name.firstName=this.contact.firstName
    this.name.lastName=this.contact.lastName
    this.name.id=id
    const contactNames = localStorage.getItem('ContactNames')

    let contactList = []
    let contactNameList = []
    let updateOperation = true
    let index = null

    if(oldRecords!=null && contactNames!=null){
      contactList = JSON.parse(oldRecords)
      contactNameList = JSON.parse(contactNames)
      if(this.previousId!=this.name.id){
        contactList.find((m:Contact)=>{
          if(m.id==this.name.id){
            updateOperation = false
          }
        })
      }
      if(updateOperation){
        contactList.forEach((contact:Contact,i:number)=>{
          if(contact.id==this.previousId){
            console.log(i)
            index=i
          }
        })
      }
    }
    if(updateOperation){
      this.updateRecord(contactList,contactNameList,index)
    }
    this.mainService.setUpdateStatus(true)
  }

  updateRecord(contactList:Contact[], contactNameList:Name[],index:any){
    if(index!=null){
      contactList.splice(index, 1);
      contactNameList.splice(index,1)
    }
    contactList.push(this.contact)
    contactNameList.push(this.name)
    localStorage.setItem('Contacts',JSON.stringify(contactList))
    localStorage.setItem('ContactNames',JSON.stringify(contactNameList))
  }

  deleteClicked(){
    let contactList = []
    let contactNameList = []
    let index = null
    const oldRecords = localStorage.getItem('Contacts')
    const contactNames = localStorage.getItem('ContactNames')
    if(oldRecords!=null && contactNames!=null){
      contactList = JSON.parse(oldRecords)
      contactNameList = JSON.parse(contactNames)
    }
    contactList.forEach((contact:Contact,i:number)=>{
      if(contact.id==this.previousId){
        index = i
      }
    })

    if(index!=null){
      contactList.splice(index, 1);
      contactNameList.splice(index,1)
      localStorage.setItem('Contacts',JSON.stringify(contactList))
      localStorage.setItem('ContactNames',JSON.stringify(contactNameList))
    }
    this.mainService.setUpdateStatus(true)
  }

}
