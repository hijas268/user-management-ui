import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { Role } from '../../../shared/models/role.enum';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  roles = Role;

  constructor(private userService: UserService, public auth: AuthService) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  filteredUsers(): User[] {
    return this.users
      .filter(u => !u.isDeleted)
      .filter(u => u.username.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize);
  }

  deleteUser(user: User): void {
    if(confirm(Are you sure to delete ?)){
      this.userService.updateUser(user.id, { ...user, isDeleted: true }).subscribe(() => this.loadUsers());
    }
  }
}
