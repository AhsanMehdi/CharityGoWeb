import { Component, OnInit,EventEmitter } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { AlertService } from "../../services/alert.service";
import { ToastrService } from 'ngx-toastr';
import {
  NgForm,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { first } from "rxjs/operators";
import { IProject } from "../../_models/Iproject";
import { ICampaign } from "../../_models/Icampaign";
import { Router, ActivatedRoute } from "@angular/router";
import { UploadFile, UploadInput, UploadOutput } from "ng-uikit-pro-standard";
import { IMyOptions, humanizeBytes } from "ng-uikit-pro-standard";

@Component({
  selector: 'app-campaignadd',
  templateUrl: './campaignadd.component.html',
  styleUrls: ['./campaignadd.component.scss']
})
export class CampaignaddComponent implements OnInit {

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  
  createCampaignForm:  FormGroup; 
  validatingForm: FormGroup; /*for validations*/
 
  loading = false;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }
  
  ngOnInit() {
    this.createCampaignForm = this.formBuilder.group({
   
      nickName: ['', Validators.required],  
      subject: ['',Validators.required],
      descriptionStory: ['', [Validators.required, Validators.minLength(12)]],
      objective: ['', [Validators.required, Validators.minLength(12)]],
      country: ['', Validators.required],
      status: ['', Validators.required],
      dateOfCreation: ['', Validators.required],
      imageUrl: ['', Validators.required]
  });
  }/* ngoninint ends*/
  signupformshow:boolean=true;
  userSingup(){
   this.signupformshow=true;
 
 }
  onCreateCampaignSubmit() {
  
    console.log(this.createCampaignForm)
    this.submitted = true;
    // stop here if form is invalid
    // if (this.registerUserForm.invalid) {
    //     return;
        
    // }
    this.loading = true;
    console.log ("I am going to display vslues ")
    if (this.createCampaignForm.value.imageUrl== ""){
      this.createCampaignForm.value.imageUrl = "xyz"
    }
    
    this.backendService.createCampaign(this.createCampaignForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Campaign Created Successfully', true);
                this.router.navigate(['/campaigns']);
              
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}
