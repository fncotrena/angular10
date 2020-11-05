import { Component, OnInit, Inject  } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ConfirmDialogComponent);
  }
}




