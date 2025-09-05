import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuditTrailService } from '../../shared/Services/audit-trail.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.scss'
})
export class AuditTrailComponent {
  logs: any[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  search = '';
    constructor(private http: HttpClient,private auditService: AuditTrailService) {}
      ngOnInit() {
    this.loadLogs();
  }
    loadLogs(): void {
    this.auditService.getLogs(this.search, this.page, this.pageSize)
      .subscribe(res => {
        debugger;
        this.logs = res.data;
        this.total = res.totalCount;
      });
  }

  onSearchChange(): void {
    this.page = 1; // reset page on new search
    this.loadLogs();
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.loadLogs();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadLogs();
    }
  }
}
