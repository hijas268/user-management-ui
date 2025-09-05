// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/Services/user.service';
import { CreateuserModel, User } from '../../../shared/models/user.model';
import { NavbarComponent } from "../../../shared/components/navbar/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import {  UserRole } from '../../../shared/models/role.enum';
import { GetprofileService } from '../../../shared/Services/getprofile.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  roleid:any='';
  selectedUser: User | null = null;
  searchTerm = '';
  roleFilter = '';
  page = 1;
  pageSize = 5;
  total = 0;

  newUser: Partial<CreateuserModel> = { Username: '', Email: '', RoleId: 2,Password:'' };

  constructor(private userService: UserService,public getuserprofile:GetprofileService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

loadUsers(): void {
  const params: any = {};

  if (this.searchTerm) {
    params.search = this.searchTerm;
  }

  if (this.roleFilter) {
    params.role = this.roleFilter;
  }

  params.page = this.page;
  params.pageSize = this.pageSize;

  this.userService.searchusers(params).subscribe((res: any) => {
    // If API returns {data, totalCount}
    this.users = res.data ?? res;
    this.total = res.totalCount ?? this.users.length;
  });
}

  getRoleName(roleId: number): string {
 
  return UserRole[roleId] ?? 'Unknown';
}
  addUser(): void {
  
    this.newUser.RoleId = Number(this.roleid);
    this.userService.createUser(this.newUser).subscribe(() => {
      this.newUser = { Username: '', Email: '', RoleId: 2,Password:''  };
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
  nextPage(): void {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
  resetForm(): void {
    this.selectedUser = null;
  }
}
