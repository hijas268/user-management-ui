import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../shared/models/role.enum';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  form: FormGroup;
  roles = Object.values(Role);

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUser(id).subscribe(u => {
      this.user = u;
      this.form.patchValue(u);
    });
  }

  save(): void {
    if(this.form.valid && this.user){
      this.userService.updateUser(this.user.id, this.form.value).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => {
          if(err.error && err.error.errors){
            Object.keys(err.error.errors).forEach(field => {
              this.form.controls[field].setErrors({ backend: err.error.errors[field] });
            });
          }
        }
      });
    }
  }
}
