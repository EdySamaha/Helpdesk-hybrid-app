import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../home/modal/modal.page';

@Component({
  selector: 'app-list',
  templateUrl: 'office.page.html',
  styleUrls: ['office.page.scss']
})
export class OfficePage implements OnInit {
  
  employeeJS;

  constructor(public modalController: ModalController) {

  }

  //Following function for buttons inside Office dir (Create Acc in list.html) NOT inside Modal itsel
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    await modal.present();
  }

  edit(index): void{
    
    this.presentModal();
    // this.values.firstname = this.employeeJS[index].Firstname;
    // this.values.lastname= this.employeeJS[index].Lirstname; 
    // this.values.DOB = this.employeeJS[index].DOB; 
    // this.values.marriage = this.employeeJS[index].marriage; 
    // this.values.gender = this.employeeJS[index].gender; 
    // this.values.notes = this.employeeJS[index].notes;
    // this.values.Hobbies = this.employeeJS[index].Hobbies; 
    // this.values.department = this.employeeJS[index].department;
    //Change ADD to SAVE button and overwrite in JSON
  }

  view(): void {
    
    //console.log(this.employeeJS[0]);
    this.presentModal();
    //Disable ADD button and make input fields UNCHANGEABLE
  }

  //#region TEST FOR BINDING BUTTONS
  // buttonType() {
  //   var buttonType = {  
  //      text: "View", 
  //      edit: this.edit(), 
  //      view: this.view(),
  //      //add: addAccount(),
  //   }
  // }
  
  
//   person.hello("world");  // output: "James Smith says hello world"
//   var helloFunc = person.hello.bind({ name: "Jim Smith" });
//   helloFunc("world");  // output: Jim Smith says hello world"
//   //OR
//   var helloFunc = person.hello.bind({ name: "Jim Smith" }, "world");
//  helloFunc();  // output: Jim Smith says hello world"
//#endregion


  /* //NOT used by Office dir
  async dismiss() {
    await this.modalController.dismiss();
  }*/

  ngOnInit() {
    const temp = localStorage.getItem('employees');
    if (temp) {//Fetches previous data in localstorage if not empty or undefined
      this.employeeJS =JSON.parse(temp);
    }
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
