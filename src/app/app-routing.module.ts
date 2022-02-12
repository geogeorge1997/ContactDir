import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MainComponent } from './main/main.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  { path:'', component:MainComponent},
  // { path:'contact', component:ViewContactComponent},
  { path:'**',component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
