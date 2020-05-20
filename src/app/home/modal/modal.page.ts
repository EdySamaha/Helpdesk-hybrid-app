
import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'modal-page',
  templateUrl: 'modal.page.html'
})
export class ModalPage implements OnInit {
  
  buttonName = 'add';
  ishidden=false; isdisabled=false;
  employees: object[] = [];
  values= {firstname: '', lastname: '', marriage: '', gender: '', DOB: '', department: '', notes: '', Hobbies: ''};
  
  bindedAddFunction;
  bindedEdit;
  bindedDelete;
  bindedView;
  bindedModalFlag;
  employeeData;

  constructor(public modalController: ModalController, public navParams: NavParams){
    
  }
 
  type() { //Used for testing to make sure that ngModel is being used as value in html input Firstname
    console.log('test', this.values.firstname);
  }

  ngOnInit(): void {
    console.log('this.navParams', this.navParams);
    console.log('this.navParams 2', this.navParams.get('addFunction'));
    this.bindedAddFunction = this.navParams.get('addFunction');
    this.bindedEdit = this.navParams.get('editFunction');
    this.bindedDelete= this.navParams.get('deleteFunction');
    //this.bindedView = this.navParams.get('viewFunction'); //NO NEED. ALSO COMMENTED OUT IN Office.ts viewFunction
    this.bindedModalFlag = this.navParams.get('modalFlag');
    this.employeeData=this.navParams.get('employeeData');

    console.log(this.bindedModalFlag);

    if(this.bindedModalFlag==="edit"){
      this.buttonName="Save";
      this.display();
      this.ishidden=false;
      this.isdisabled=false;
      //CHANGE JSON (DONE IN offfice.page.ts)
    }
    else if(this.bindedModalFlag==="view"){
      this.buttonName=""; //NO BUTTON IF VIEW
      this.display();
      this.ishidden=true;     //DISABLE MODIFICATIONS OF INPUTS AND HIDES BUTTON
      this.isdisabled=true; 
    }

    const temp = localStorage.getItem('employees');
    if (temp) { //Fetches previous data in localstorage if not empty or undefined
      this.employees = JSON.parse(temp);
    }
    
    //localStorage.clear();
    //console.log(uuid4.toString());
  }

  dismiss() { //Used by Close Button INSIDE ModalPage (modal.html)
    this.modalController.dismiss();
  }

  display(){ //Displays data from view() and edit() in office (binded), in modal
    this.values.firstname = this.employeeData.Firstname;
    this.values.lastname= this.employeeData.Lastname; 
    this.values.DOB = this.employeeData.DOB; 
    this.values.marriage = this.employeeData.marriage; 
    this.values.gender = this.employeeData.gender; 
    this.values.notes = this.employeeData.notes;
    this.values.Hobbies = this.employeeData.Hobbies; //NOTE: Hobbies JSON list is empty. SHOULD use isChecked
    this.values.department = this.employeeData.department;
  }

  buttonFunction(){
    if(this.buttonName==="add") {this.addAccount()}
    else if(this.buttonName==="Save") {this.bindedEdit(this.employeeData, this.values)}
  }

  addAccount(): void {
    this.bindedAddFunction(this.values);
    //DONE IN OFFICE.page.ts BIND SO NO NEED HERE ANYMORE
    // var uuid4 = UUID.create();
    // var Firstname = this.values.firstname;//Use ngModel intead of id (in html) better! //(<HTMLInputElement>document.getElementById("Firstname")).value; //Cast because it is of type HTMLElement by default
    // var Lastname = this.values.lastname; //(<HTMLInputElement>document.getElementById("Lastname")).value;
    // var DOB = this.values.DOB; //(<HTMLInputElement>document.getElementById("DOB")).value;
    // var marriage = this.values.marriage; //(<HTMLInputElement>document.getElementById("Marriage")).value;
    // var gender = this.values.gender; //(<HTMLInputElement>document.getElementById("Gender")).value;
    // var notes = this.values.notes; //(<HTMLInputElement>document.getElementById("Notes")).value;
    // var hobbies = this.values.Hobbies; //(<HTMLInputElement>document.getElementById("Hobbies")).value; //PROBLEM: Not showing hobbies for employee
    // var dep = this.values.department; //(<HTMLInputElement>document.getElementById("Department")).value;

    // let employee1 = {'id':uuid4, 'Firstname': Firstname, 'Lastname': Lastname, 'marriage': marriage, 'gender': gender, 'DOB': DOB, 'department':dep, 'notes':notes, 'Hobbies':hobbies,};
    // this.employees.push(employee1);
    // let jsonstring = JSON.stringify(this.employees);
    // localStorage.setItem('employees', jsonstring);
  }

  //For ngFor in modal.html
  departments= [
    {'name':'IT'},
    {'name':'HR'},
    {'name':'Architecture'},
    {'name':'Media'},
    {'name':'Business'},
  ];

  gender= [
    {'name':'Male'},
    {'name':'Female'},
    {'name':'Other'},
  ];

  hobbies= [
    {'name':'Chess', 'isChecked':false},
    {'name':'Swimming', 'isChecked':false},
    {'name':'Videogames', 'isChecked':false},
    {'name':'Hiking', 'isChecked':false},
    {'name':'Learning', 'isChecked':false},
  ];
}