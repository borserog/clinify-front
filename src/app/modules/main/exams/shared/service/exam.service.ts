import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Exam, ExamRequest} from '../model/exam.model';
import {IExamService} from '../model/exam-service.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService implements IExamService {
  static readonly RESOURCE_URL = environment.apiUrl + 'exams';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(ExamService.RESOURCE_URL);
  }

  registerExam(newExam: ExamRequest): Observable<any> {
    return this.http.post<Exam>(ExamService.RESOURCE_URL, newExam);
  }

  removeById(examId: number | string): Observable<any> {
    return this.http.delete<Exam>(ExamService.RESOURCE_URL + `/${examId}`);
  }

  checkIn(examCode: string): Observable<Exam> {
    return this.http.patch<Exam>(ExamService.RESOURCE_URL + '/checkIn', examCode);
  }

  finishExam(examId: number | string): Observable<Exam> {
    return this.http.patch<Exam>(ExamService.RESOURCE_URL + '/finish/' + examId, {});
  }
}