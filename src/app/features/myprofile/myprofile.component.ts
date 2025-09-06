import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/Services/user.service';
// import { TranslateModule } from '@ngx-translate/core';
import { GetprofileService } from '../../shared/Services/getprofile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class myprofileComponent implements OnInit {
  user: any = {};
  isReadOnly = false;
  loading = true;

  constructor(
    private userService: UserService,
    private getprofile: GetprofileService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.isReadOnly = this.getprofile.getUserRole() === 'ReadOnlyUser';
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  saveProfile() {
    if (this.isReadOnly) return;
    this.userService.updateProfile(this.user).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => console.error(err)
    });
  }
}
