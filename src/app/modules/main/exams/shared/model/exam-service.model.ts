import {Observable} from 'rxjs';
import {Exam, ExamRequest} from './exam.model';

export interface IExamService {
  getAll(): Observable<Exam[]>;

  registerExam(newExam: ExamRequest): Observable<ExamId>;

  removeById(examId: number): Observable<void>;

  checkIn(examCode: string): void;
}

export type ExamId = string;
