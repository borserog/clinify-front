import {Component, OnInit} from '@angular/core';
import {ExamService} from '../main/exams/shared/service/exam.service';
import {take} from 'rxjs/operators';
import {MessageService} from '../../shared/services/snackbar/message.service';
import {MessageLevel} from '../../shared/services/snackbar/message-level.enum';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  inputCode: string;

  constructor(
    private examService: ExamService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
  }

  checkIn(): void {
    this.examService.checkIn(this.inputCode).pipe((take(1))).subscribe(() => {
      this.message.open('Check-in realizado com sucesso', MessageLevel.SUCCESS);
    }, () => {
      this.message.open('Deu ruim no seu check-in parça', MessageLevel.DANGER);
    });
  }
}
