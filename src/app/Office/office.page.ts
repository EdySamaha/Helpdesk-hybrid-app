import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../home/modal/modal.page';

import UUID from 'uuid-js'; //I installed uuid-js from npm
import * as _ from 'lodash';//FOR _.find(id) in edit()...

@Component({
  selector: 'app-list',
  templateUrl: 'office.page.html',
  styleUrls: ['office.page.scss']
})
export class OfficePage implements OnInit {
  
  employeeJS = [];

  constructor(public modalController: ModalController) {

  }

  //Following function for buttons inside Office dir (Create Acc in list.html) NOT inside Modal itsel
  async presentModal(_modalFlag, _employeeData) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { //navParams
        modalFlag: _modalFlag,
        addFunction: this.addAccount.bind(this), //IMPORTANT TO BE ABLE TO USE IN modal.page.ts ; (this) so that this script remains the parent of those functions and we'll able to control them from here even if they are called in another
        editFunction: this.EditEmployee.bind(this),
        deleteFunction: this.deleteAccount.bind(this),
        //viewFunction: this.view.bind(this), //NO BUTTON FOR VIEW IN MODAL
        employeeData: _employeeData
        //NOTE: Values of employee selected are inputed in modal through display() in modal.page.ts
      }
    });
    await modal.present();
  }

  edit(id) { //IN OFFICE PAGE NOT MODAL
    //console.log(id);
    var employeeData = _.find(this.employeeJS, function(o) { return o.id.hex === id; });
    console.log("employeeData:", employeeData);
    this.presentModal('edit', employeeData);
    //Change ADD to SAVE button and overwrite in JSON; add a DELETE button
  }

  EditEmployee(employeeData,data){ //keep same id
    var Firstname = data.firstname;//Use ngModel intead of id (in html) better! //(<HTMLInputElement>document.getElementById("Firstname")).value; //Cast because it is of type HTMLElement by default
    var Lastname = data.lastname; //(<HTMLInputElement>document.getElementById("Lastname")).value;
    var DOB = data.DOB; //(<HTMLInputElement>document.getElementById("DOB")).value;
    var marriage = data.marriage; //(<HTMLInputElement>document.getElementById("Marriage")).value;
    var gender = data.gender; //(<HTMLInputElement>document.getElementById("Gender")).value;
    var notes = data.notes; //(<HTMLInputElement>document.getElementById("Notes")).value;
    var hobbies = data.Hobbies; //(<HTMLInputElement>document.getElementById("Hobbies")).value; //PROBLEM: Not showing hobbies for employee
    var dep = data.department; //(<HTMLInputElement>document.getElementById("Department")).value;

      //DELETE OLD employee
    this.employeeJS = this.employeeJS.filter((emp)=> {return emp.id.hex != employeeData.id.hex;}); //returns array without employee we want to edit
      //REPLACE with NEW EMPLOYEE:
    let employee1 = {'id':employeeData.id, 'Firstname': Firstname, 'Lastname': Lastname, 'marriage': marriage, 'gender': gender, 'DOB': DOB, 'department':dep, 'notes':notes, 'Hobbies':hobbies,};
    this.employeeJS.push(employee1);
    let jsonstring = JSON.stringify(this.employeeJS);
    localStorage.setItem('employees', jsonstring);
  }

  view(id) { //IN OFFICE PAGE NOT MODAL
    var employeeData = _.find(this.employeeJS, function(o) { return o.id.hex === id; });
    console.log("employeeData:", employeeData);
    this.presentModal('view', employeeData);
    //Disable ADD button and make input fields UNCHANGEABLE (DONE IN modal.page.ts)
  }

  deleteAccount(id){
    this.employeeJS = this.employeeJS.filter(function (employee) { return employee.id.hex !== id; } ); //filter(function (employee) { return employee !== employeeData; } );
    let jsonstring = JSON.stringify(this.employeeJS);
    localStorage.setItem('employees', jsonstring);
    console.log('employee with id= '+id+' has been deleted');
  }

  addAccount(data) {
    var uuid4 = UUID.create();
    var Firstname = data.firstname;//Use ngModel intead of id (in html) better! //(<HTMLInputElement>document.getElementById("Firstname")).value; //Cast because it is of type HTMLElement by default
    var Lastname = data.lastname; //(<HTMLInputElement>document.getElementById("Lastname")).value;
    var DOB = data.DOB; //(<HTMLInputElement>document.getElementById("DOB")).value;
    var marriage = data.marriage; //(<HTMLInputElement>document.getElementById("Marriage")).value;
    var gender = data.gender; //(<HTMLInputElement>document.getElementById("Gender")).value;
    var notes = data.notes; //(<HTMLInputElement>document.getElementById("Notes")).value;
    var hobbies = data.Hobbies; //(<HTMLInputElement>document.getElementById("Hobbies")).value; //PROBLEM: Not showing hobbies for employee
    var dep = data.department; //(<HTMLInputElement>document.getElementById("Department")).value;

    let employee1 = {'id':uuid4, 'Firstname': Firstname, 'Lastname': Lastname, 'marriage': marriage, 'gender': gender, 'DOB': DOB, 'department':dep, 'notes':notes, 'Hobbies':hobbies,};
    this.employeeJS.push(employee1);
    let jsonstring = JSON.stringify(this.employeeJS);
    localStorage.setItem('employees', jsonstring);
  }



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
