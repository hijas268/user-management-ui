// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/Services/user.service';
import { User } from '../../../shared/models/user.model';
import { NavbarComponent } from "../../../shared/components/navbar/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  searchTerm = '';
  roleFilter = '';
  page = 1;
  pageSize = 5;
  total = 0;

  newUser: Partial<User> = { username: '', email: '', role: 'User' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
      .getUsers({
        search: this.searchTerm,
        role: this.roleFilter,
        page: this.page,
        pageSize: this.pageSize
      })
      .subscribe((res: any) => {
        this.users = res.data ?? res; // supports API returning paged object
        this.total = res.totalCount ?? this.users.length;
      });
  }

  addUser(): void {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.newUser = { username: '', email: '', role: 'User' };
      this.loadUsers();
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    if (!this.selectedUser) return;

    this.userService
      .updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe(() => {
        this.selectedUser = null;
        this.loadUsers();
      });
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  resetForm(): void {
    this.selectedUser = null;
  }
}
