import {Patient} from 'src/app/modules/main/patients/shared/model/patient.model';
import {NewExamComponent} from './new-exam/new-exam.component';
import {MessageService} from '../../../shared/services/snackbar/message.service';
import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {delay, map, take} from 'rxjs/operators';
import {MessageLevel} from 'src/app/shared/services/snackbar/message-level.enum';
import {MatDialog} from '@angular/material/dialog';
import {NewPatientComponent} from './new-patient/new-patient.component';
import {PatientFirestoreService} from './shared/service/patient-firestore.service';
import {
  ListingStatus,
  listingStatusInitialState,
  createListingStatusLoadingState, createListingStatusErrorState, createListingStatusLoadedState
} from '../../../shared/model/component-status.model';
import {PatientService} from './shared/service/patient.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  readonly patientsSubject = new Subject<Patient[]>();

  patients$: Observable<Patient[]>;

  patientsDataSource: MatTableDataSource<Observable<any>>;

  status$ = new BehaviorSubject<ListingStatus>(listingStatusInitialState);

  columnsToDisplay = ['patient', 'healthPlan', 'birthDate', 'actionsRow'];

  constructor(
    private patientFirestoreService: PatientFirestoreService,
    private patientService: PatientService,
    private snackbar: MessageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.patients$ = this.patientsSubject;

    this.loadPatients();
  }

  openNewPatientDialog(): void {
    const dialogRef = this.dialog.open(NewPatientComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.loadPatients();
    });
  }

  openNewExamDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(NewExamComponent, {
      data: patient
    });
  }

  deletePatient(patient: Patient): void {
    this.patientFirestoreService.removeById(patient.id).pipe(take(1)).subscribe(() => {
        this.snackbar.open('Paciente Deletado!', MessageLevel.INFO);
        this.loadPatients();
      }
    );
  }

  private loadPatients(): void {
    this.status$.next(createListingStatusLoadingState('Carregando pacientes'));

    this.patientService.getAll().pipe(
      take(1)
    )
      .subscribe((patients: Patient[]): void => {
        if (patients.length !== 0) {
          this.status$.next(listingStatusInitialState);
          this.patientsSubject.next(patients);
        } else {
          this.status$.next(createListingStatusLoadedState('Nenhum paciente cadastrado'));
        }
      }, (error => {
        this.status$.next(createListingStatusErrorState('Ocorreu um erro. Tente novamente!'));
      }));
  }
}
