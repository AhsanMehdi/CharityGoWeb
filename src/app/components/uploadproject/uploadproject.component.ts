import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { AlertService } from "../../services/alert.service";
import {
  NgForm,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { first } from "rxjs/operators";
import { IProject } from "../../_models/Iproject";
import { Router, ActivatedRoute } from "@angular/router";
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-uploadproject',
  templateUrl: './uploadproject.component.html',
  styleUrls: ['./uploadproject.component.scss']
})
export class UploadProjectComponent implements OnInit {


  Title = "";
  Loucation = "";
  Type = "";
  FundingDuration = "";

  ShowTab1 = true;
  ShowTab2= false;
  ShowTab3= false;

  Tab1state : string = "completed"
  Tab2state : string = ""
  Tab3state : string = ""

  validatingForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private alertService: AlertService,
    private fb: FormBuilder,
  ) {
    this.Title = this.route.snapshot.queryParams.title;
    this.Loucation = this.route.snapshot.queryParams.loucation;
    this.Type = this.route.snapshot.queryParams.type;

    this.validatingForm = fb.group({
      objective: new FormControl({value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),

      
      title: new FormControl({value: this.Title, disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),
      loucation: new FormControl({value: this.Loucation, disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),
      type: new FormControl({value: this.Type, disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),

      estimatedBudget: new FormControl({value:'', disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),

  
      expectedEndDate: new FormControl({value:'', disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),

      RegisterationNumber: new FormControl({value:'', disabled: false}, [
        Validators.required,
        Validators.minLength(4),
      ]),

    });

    console.log(this.Title, this.Loucation, this.Type)
  }

  public myDatePickerOptions: IMyOptions = {
    dayLabels: {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'},
    };

  ngOnInit(): void {
  }

  postproject(): void{

  }

  onSubmit(): void{
    
  }

  onNext(section: string): void{

    if (section == '2'){
      this.ShowTab1= false
      this.ShowTab2 = true
      this.Tab2state="completed"
    }else  if (section == '3'){
      this.ShowTab1= false
      this.ShowTab2 = false
      this.ShowTab3 = true
      this.Tab3state="completed"
    }
  
    
  }

  

}