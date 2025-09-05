// sidebar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import{GetprofileService} from '../../Services/getprofile.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,NgIf,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public getuserprofile:GetprofileService) {
   
    
  }
 }
