import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-mat-password-dialog',
  templateUrl: './mat-password-dialog.component.html',
  styleUrls: ['./mat-password-dialog.component.css']
})
export class MatPasswordDialogComponent implements OnInit {

  form = new FormGroup({
    passEdit1: new FormControl('', [Validators.required,  Validators.minLength(6)]),
    passEdit2: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  hide = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
