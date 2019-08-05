
import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import UUID from 'uuid-js'; //I installed uuid-js from npm

@Component({
  selector: 'modal-page',
  templateUrl: 'modal.page.html'
})
export class ModalPage implements OnInit {
  
  employees: object[] = [];
  values= {firstname: '', lastname: '', marriage: '', gender: '', DOB: '', department: '', notes: '', Hobbies: ''};
  
  constructor(public modalController: ModalController){
    
  }
 
  type() { //Used for testing to make sure that ngModel is being used as value in html input Firstname
    console.log('test', this.values.firstname);
  }

  ngOnInit(): void {
    const temp = localStorage.getItem('employees');
    if (temp) { //Fetches previous data in localstorage if not empty or undefined
      this.employees =JSON.parse(temp);
    }
    //localStorage.clear();
    //console.log(uuid4.toString());
  }

  dismiss() { //Used by Close Button INSIDE ModalPage (modal.html)
    this.modalController.dismiss();
  }

  addAccount(): void {
    var uuid4 = UUID.create();
    var Firstname = this.values.firstname;//Use ngModel intead of id (in html) better! //(<HTMLInputElement>document.getElementById("Firstname")).value; //Cast because it is of type HTMLElement by default
    var Lastname = this.values.lastname; //(<HTMLInputElement>document.getElementById("Lastname")).value;
    var DOB = this.values.DOB; //(<HTMLInputElement>document.getElementById("DOB")).value;
    var marriage = this.values.marriage; //(<HTMLInputElement>document.getElementById("Marriage")).value;
    var gender = this.values.gender; //(<HTMLInputElement>document.getElementById("Gender")).value;
    var notes = this.values.notes; //(<HTMLInputElement>document.getElementById("Notes")).value;
    var hobbies = this.values.Hobbies; //(<HTMLInputElement>document.getElementById("Hobbies")).value; //PROBLEM: Not showing hobbies for employee
    var dep = this.values.department; //(<HTMLInputElement>document.getElementById("Department")).value;

    let employee1 = {'id':uuid4, 'Firstname': Firstname, 'Lastname': Lastname, 'marriage': marriage, 'gender': gender, 'DOB': DOB, 'department':dep, 'notes':notes, 'Hobbies':hobbies,};
    this.employees.push(employee1);
    let jsonstring = JSON.stringify(this.employees);
    localStorage.setItem('employees', jsonstring);
  }

  //For ngFor in modal.html
  departments= [
    {'name':'IT'},
    {'name':'HR'},
    {'name':'Architecture'},
    {'name':'Media'},
    {'name':'Business'},
  ];

  hobbies= [
    {'name':'Chess', 'isChecked':false},
    {'name':'Swimming', 'isChecked':false},
    {'name':'Videogames', 'isChecked':false},
    {'name':'Hiking', 'isChecked':false},
    {'name':'Learning', 'isChecked':false},
  ];
}