import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TrainerDataService } from '../services/trainer-data.service';
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainerService: TrainerDataService) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required], 
      image: ['', Validators.required],
      firstname: ['', Validators.required], 
      lastname: ['', Validators.required],
      title: ['', Validators.required], 
      email: ['', Validators.required], 
      certification: ['', Validators.required], 
      bio: ['', Validators.required],
      

  
    })
  }
  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid){
    this.trainerService.addTrainer(this.addForm.value)
    .then( data => {
      console.log(data);
      this.router.navigate(['']);
    });
  }
}

// get the form short name to access the form fields
get f() { return this.addForm.controls; }
}