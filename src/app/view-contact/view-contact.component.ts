import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../interface/contact';
import { Name } from '../interface/name';
import { MainService } from '../service/main.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public readOnly:boolean = true
  deviceInfo:any;
  isMobile:boolean=false

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
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {

    this.deviceInfo = this.deviceService.getDeviceInfo()
    this.isMobile = this.deviceService.isMobile();

    this.initForm()
    this.setForm()

    this.mainService.getReadOnlyStatus().subscribe(value=>{
      this.readOnly=value
      this.previousId=''
      this.contactForm.reset()
    })
  }

  initForm(){
    this.contactForm = this.fb.group({
      firstName: ['',[Validators.required]],
      middleName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      address: this.fb.group({
        street: ['',[Validators.required]],
        city: ['',[Validators.required]],
        state: ['',[Validators.required]],
        zip: ['',[Validators.required]]
      }),
      phoneNumber: ['',[Validators.required,Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      emailId: ['',[Validators.required,Validators.email]]
    });
  }

  setForm(){
    this.mainService.getSelectedName().subscribe((name:Name)=>{
      this.name=name
      if(name!=null){
        const contactLists = this.mainService.getContactDetails()
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
    })
  }

  editClicked(){
    this.readOnly=false
  }

  saveClicked(){

    if(this.contactForm.valid){
      this.contact=this.contactForm.value
      const id = this.contactForm.value.firstName+this.contactForm.value.middleName+this.contactForm.value.lastName
      this.contact.id =id
  
      this.name.firstName=this.contact.firstName
      this.name.lastName=this.contact.lastName
      this.name.id=id
  
      let contactDetailList = this.mainService.getContactDetails()
      let contactNameList = this.mainService.getContactNames()
      let updateOperation = true
      let index = null
  
      if(this.previousId!=this.name.id){
        contactDetailList.find((m:Contact)=>{
          if(m.id==this.name.id){
            updateOperation = false
            window.alert("User already exists")
          }
        })
      }
      if(updateOperation){
        contactDetailList.forEach((contact:Contact,i:number)=>{
          if(contact.id==this.previousId){
            index=i
          }
        })
      }
  
      if(updateOperation){
        this.updateRecord(contactDetailList,contactNameList,index)
      }
      this.mainService.setUpdateStatus(true)
    }
    else{
      window.alert("Fill the details")
    }
    
  }

  updateRecord(contactDetailList:Contact[], contactNameList:Name[],index:any){
    if(index!=null){
      contactDetailList.splice(index, 1);
      contactNameList.splice(index,1)
    }
    contactDetailList.push(this.contact)
    contactNameList.push(this.name)

    this.mainService.setContactDetails(contactDetailList)
    this.mainService.setContactNames(contactNameList)
  }

  deleteClicked(){
    let index = null
    let contactDetailList = this.mainService.getContactDetails()
    let contactNameList = this.mainService.getContactNames()

    contactDetailList.forEach((contact:Contact,i:number)=>{
      if(contact.id==this.previousId){
        index = i
      }
    })

    if(index!=null){
      contactDetailList.splice(index, 1);
      contactNameList.splice(index,1)
      this.mainService.setContactDetails(contactDetailList)
      this.mainService.setContactNames(contactNameList)
    }
    this.mainService.setUpdateStatus(true)
    this.contactForm.reset()
  }

  onClick(){
    this.mainService.setMenuOpenedStatus(true)
  }
}
