import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { AlertService } from '../../services/alert.service';
import { IReviewProject  } from '../../_models/Iprojectreview';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-donatenow',
  templateUrl: './donatenow.component.html',
  styleUrls: ['./donatenow.component.scss']
})
export class DonatenowComponent implements OnInit {

  projectId: any
  campaignId:any  /*when click on participate now*/
  ownerId:any
  profiles:any /*variable to get the profile of a user*/
  callProfileFunction: boolean = false ;
  ownerName:string
  ownerLocation:string
  ownerContact:string
  ownerEmail:string
  userType:string
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router, private backendService: BackendService,
      private alertService: AlertService) {
    this.projectId = this.route.snapshot.queryParams.id;
  
    console.log("the id of project is "+this.projectId)

   }


  ngOnInit(): void {
   
    this.getProjectOwnerId() ; // when project
    console.log ("is project id is null  ::"+ this.projectId)
    

 
    // if (this.callProfileFunction == true)
    // this.getUserProfiles() ;
  }
  
  getProjectOwnerId(){ /*function to get the user id of whom who created the project*/
    console.log("function getting owner id")
    this.backendService.getProjectOwnerId(this.projectId) /* to check is the user is owner of project*/
    .pipe(first())
    .subscribe(
      data => {  
        console.log(" project owner id :" + data.userId)
        this.ownerId = data.userId ;
        this.callProfileFunction = true ;
        console.log("receiving from owner is id " + this.ownerId)
        this.getNgoProfiles() ;
        this.backendService.getUserTypeByUserId(this.ownerId) /* to check is the user is owner of campaign*/
    .pipe(first())
    .subscribe(
        data => {
          console.log("value of data is : "+ data)
          console.log(data.user[0].userType)
          
       
        this.ownerEmail = data.user[0].email;
        console.log ("user is : "+ this.userType+ " and email is ::"+ this.ownerEmail)
  
        
       // debugger
        },
        error => {
            this.alertService.error(error);
       
        })

      },
        error => {
            this.alertService.error(error);
           
        })
  }

  getNgoProfiles(){ /* this function will return the profile data of specific user*/
    console.log("function getting profiles")
    console.log("calling backend service with id is "+this.ownerId )
    this.backendService.getNgoByUserId(this.ownerId)
    .pipe(first())
    .subscribe(
        data => {
       this.profiles = data.ngo[0] ;
       this.ownerName = this.profiles.nickName;
       this.ownerLocation = this.profiles.country;
       this.ownerContact = this.profiles.contactNumber;
       console.log ("user data : " + this.ownerName +this.ownerLocation  + this.ownerContact)
       console.log(data)
       console.log("profile info is "+ this.profiles)
       console.log("other info is "+ data.ngo[0]) 
      
        },
        error => {
            this.alertService.error(error);
       
        })

  }

  
 
 


}
