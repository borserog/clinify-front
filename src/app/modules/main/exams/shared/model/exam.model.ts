import { Patient } from 'src/app/modules/main/patients/shared/model/patient.model';

export interface Exam {
  id: number | string;
  patient: Patient;
  date: Date;
  finished: boolean;
  checkIn: string;
  code: string;
}

export type ExamRequest = Omit<Exam, 'id'>;
