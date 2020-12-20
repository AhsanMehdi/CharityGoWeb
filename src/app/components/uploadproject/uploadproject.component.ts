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

@Component({
  selector: 'app-uploadproject',
  templateUrl: './uploadproject.component.html',
  styleUrls: ['./uploadproject.component.scss']
})
export class UploadProjectComponent implements OnInit {


  Title = "";
  Loucation = "";
  Type = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private alertService: AlertService
  ) {
    this.Title = this.route.snapshot.queryParams.title;
    this.Loucation = this.route.snapshot.queryParams.loucation;
    this.Type = this.route.snapshot.queryParams.type;

    console.log(this.Title, this.Loucation, this.Type)
  }

  ngOnInit(): void {
  }

}