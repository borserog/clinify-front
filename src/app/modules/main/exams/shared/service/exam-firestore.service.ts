import {Injectable} from '@angular/core';
import {IExamService} from '../model/exam-service.model';
import {from, Observable} from 'rxjs';
import {Exam, ExamRequest} from '../model/exam.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, take, tap} from 'rxjs/operators';
import {MessageService} from '../../../../../shared/services/snackbar/message.service';
import {MessageLevel} from '../../../../../shared/services/snackbar/message-level.enum';

@Injectable({
  providedIn: 'root'
})
export class ExamFirestoreService implements IExamService {
  private readonly exams$: Observable<Exam[]>;

  private readonly EXAMS_COLLECTION = 'exams';

  private readonly collection: AngularFirestoreCollection<Exam | ExamRequest>;

  constructor(
    private afs: AngularFirestore,
    private message: MessageService
  ) {
    this.collection = afs.collection(this.EXAMS_COLLECTION);
    this.exams$ = this.collection.valueChanges({idField: 'id'});
  }

  getAll(): Observable<Exam[]> {
    return this.exams$;
  }

  registerExam(newExam: ExamRequest): Observable<string> {
    return from(this.collection.add(newExam)).pipe(
      map((newExamDocument): string => {
        return newExamDocument.id;
      })
    );
  }

  removeById(examId: number | string): Observable<void> {
    const inputExamId = typeof examId === 'string' ? examId : examId.toString();

    return from(this.collection.doc(inputExamId).delete());
  }

  checkIn(examCode: string): void {
    const afsQueryFn = (ref) => {
      return ref.where('code', '==', examCode);
    };

    this.afs.collection(this.EXAMS_COLLECTION, afsQueryFn).valueChanges({ idField: 'id' }).pipe(
      tap((data) => {
        this.collection.doc(data[0].id).update({ checkIn: new Date().toISOString() });
      }),
      take(1)
    ).subscribe(() => {
      this.message.open('Check-in realizado com sucesso', MessageLevel.SUCCESS);
    });
  }

  private updateExam(examId: string): void {

  }
}
