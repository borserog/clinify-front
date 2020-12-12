import { Component, OnInit } from '@angular/core';
import {ExamFirestoreService} from '../main/exams/shared/service/exam-firestore.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  inputCode: string;

  constructor(
    private examService: ExamFirestoreService
  ) { }

  ngOnInit(): void {
  }

  checkin(): void {
    this.examService.checkIn(this.inputCode);
  }
}
