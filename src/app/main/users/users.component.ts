import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  columnsToDisplay: string[] = ['username', 'email', 'active', 'createdOn'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

}
