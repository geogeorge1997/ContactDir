import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../interface/contact';
import { Name } from '../interface/name';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

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
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private mainService:MainService) { }

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
      console.log(name)
    })
  }

  editClicked(){
    console.log(this.contactForm.value)
  }

  saveClicked(){
    let _date =this.datepipe.transform(new Date(), 'M/d/yyyy-h:mm-a')
    this.contact=this.contactForm.value
    const id = this.contactForm.value.firstName+this.contactForm.value.lastName+_date
    this.contact.id =id
    const oldRecords = localStorage.getItem('Contacts')
    this.name.firstName=this.contact.firstName
    this.name.lastName=this.contact.lastName
    this.name.id=id
    const contactNames = localStorage.getItem('ContactNames')

    if(oldRecords!=null && contactNames!=null){
      const contactList = JSON.parse(oldRecords)
      const contactNameList = JSON.parse(contactNames)
      contactList.push(this.contact)
      contactNameList.push(this.name)
      localStorage.setItem('Contacts',JSON.stringify(contactList))
      localStorage.setItem('ContactNames',JSON.stringify(contactNameList))
    }
    else{
      const contactList = []
      const contactNameList = []
      contactList.push(this.contact)
      contactNameList.push(this.name)
      localStorage.setItem('Contacts',JSON.stringify(contactList))
      localStorage.setItem('ContactNames',JSON.stringify(contactNameList))
    }
  }

  deleteClicked(){
    
  }

}
