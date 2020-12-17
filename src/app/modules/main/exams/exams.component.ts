import {Observable, Subject} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {MessageLevel} from 'src/app/shared/services/snackbar/message-level.enum';
import {MessageService} from 'src/app/shared/services/snackbar/message.service';
import {Exam} from './shared/model/exam.model';
import {ExamService} from './shared/service/exam.service';

interface Exams {
  active: Exam[];
  finished: Exam[];
}

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  readonly examsSubject = new Subject<Exams>();
  exams$: Observable<Exams>;

  columnsToDisplay = ['patient', 'examCode', 'healthPlan', 'date', 'checkIn', 'actionsRow'];

  constructor(
    private examService: ExamService,
    private snackbar: MessageService
  ) {
  }

  ngOnInit(): void {
    this.exams$ = this.examsSubject;

    this.loadExams();
  }

  finishExam(examId: number): void {
    this.examService.finishExam(examId).pipe(take(1)).subscribe(() => {
      this.loadExams();
      this.snackbar.open('Exames atualizados', MessageLevel.INFO);
    }, (err) => {
      this.snackbar.open(err.message, MessageLevel.DANGER);
    });
  }

  deleteExam(exam: Exam): void {
    this.examService.removeById(exam.id).pipe(take(1)).subscribe(() => {
        this.snackbar.open('Consulta Deletada!', MessageLevel.INFO);
        this.loadExams();
      }
    );
  }

  private loadExams(): void {
    this.examService.getAll().pipe(
      map((fetchedExams) => {
        return fetchedExams.reduce((acc, exam): Exams => {
          if (exam.finished) {
            acc.finished.push(exam);

            return {
              ...acc,
              finished: acc.finished
            };
          }

          acc.active.push(exam);

          return {
            ...acc,
            active: acc.active
          };
        }, {active: [], finished: []} as Exams);
      }),
      take(1)
    )
      .subscribe((exams: Exams): void => {
        this.examsSubject.next(exams);
      });
  }
}
