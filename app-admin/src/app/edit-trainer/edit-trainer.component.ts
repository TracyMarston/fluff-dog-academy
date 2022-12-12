import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TrainerDataService } from "../services/trainer-data.service";

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {
  
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainerService: TrainerDataService
  ) { }

  ngOnInit() {
     // retrieve stashed trainerId
     let trainerCode = localStorage.getItem("trainerCode");
     if (!trainerCode) {
       alert("Something wrong, couldn't find where I stashed trainerCode!");
       this.router.navigate(['']);
       return;
     }
     console.log('EditTrainerComponent#onInit found trainerCode ' + trainerCode);
 
     // initialize form
     this.editForm = this.formBuilder.group({
      _id: [],
      code: [trainerCode, Validators.required], 
      image: ['', Validators.required],
      firstname: ['', Validators.required], 
      lastname: ['', Validators.required],
      title: ['', Validators.required], 
      email: ['', Validators.required], 
      certification: ['', Validators.required], 
      bio: ['', Validators.required],
     
    });


    console.log('EditTrainerComponent#onInit calling TrainerDataService#getTrainer(\'' + trainerCode + '\')');
    this.trainerService.getTrainer(trainerCode)
      .then(data => {
        console.log('RESPONSE' );
        console.log(data);

        
        // Don't use editForm.setValue() as it will throw console error
        this.editForm.patchValue(data);
    })
  }
  onSubmit() {
    this.submitted = true;
   

    //if (this.editForm.valid) {
      this.trainerService.updateTrainer(this.editForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['trainers']);
      });
    //}
  }

  f() { return this.editForm.controls; }
}

