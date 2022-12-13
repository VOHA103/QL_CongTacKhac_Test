import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_cau_hinh_popupComponent } from './popupAdd.component';
import { sys_cau_hinh} from '@/app/database/sys_cau_hinh.data';
import { sys_cau_hinh_model } from '@/app/model/sys_cau_hinh.model';
import { environment } from '@/environments/environment';
@Component({
  selector: 'sys_cau_hinh_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_cau_hinh_indexComponent implements OnInit {
  [x: string]: any;
  public isCreate:boolean;
 
  public title:string;
  //Copyright
  public name_footer:string;
  //Powered by
  public title_footer:string;
  public note:string;
  type_: number;
  private REST_API_URL = environment.api;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished=new EventEmitter();

  public sys_cau_hinh_:sys_cau_hinh_model;
  public sys_cau_hinh_model:sys_cau_hinh_model;
  public sys_cau_hinh_admins:sys_cau_hinh[]=[];
 public response:{dbPath:''}
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  public loading = false;
  total = 0;
  page = 1;
  limit = 10;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1' };
  searchKey: string;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {}
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_cau_hinh_popupComponent, {
      width: '850px',
      data: item,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.DataHanlder();
    // });
  }

  returnToCreate = () => {
    this.isCreate = true;
    this.title='';
     this.name_footer='';
    this.title_footer='';
    //this.type_=0;
    this.note='';
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44334/sys_cau_hinh_/${serverPath}`; 
  }
  // private getsys_cau_hinh_admins = () => {
  //   this.http.get('https://localhost:44334/sys_cau_hinh_/sys_cau_hinh_admins')
  //   .subscribe({
  //     next: (res) => this.sys_cau_hinh_admins = res as sys_cau_hinh_admin[],
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });
  // }

 
 

  // public createImgPath(serverPath: string) {
  //   debugger
  //   return this.REST_API_URL + `/${serverPath}`;
  // }


  ngOnInit(): void {

     this.isCreate=true;
  
  }
}
