import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../getData.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  public data;
  text: any;
  pageSize: any;
  public config = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 1000,
  };
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
  };

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  // Số thứ tự
  formatStt = (index: string) => {
    if (this.pageSize) {
      return (
        (this.pageSize - 1) * this.config.itemsPerPage + parseInt(index, 0)
      );
    } else {
      return parseInt(index, 0);
    }
  };
  pageChanged(event) {
    this.pageSize = event;
    this.getData();
  }
  getData = () => {
    this.postService
      .Get(
        `http://202.182.111.45:8081/v1/accounts?_size=${
          this.config.itemsPerPage
        }&_from=${this.pageSize - 1 ? this.pageSize - 1 : 0}&_counting=true`
      )
      .subscribe((res) => {
        if (res && res) {
          this.data = res.data;
          this.data.forEach((e, index) => {
            e.index = index + 1;
          });
          this.config = {
            itemsPerPage: 10,
            currentPage: this.pageSize ? this.pageSize : 0,
            totalItems: res.count,
          };
        }
      });
  };
  searchListEnter = (event): void => {
    if (event.keyCode === 13) {
      this.search();
    }
  };
  // click
  clickRecord = (status, id) => {
    if (status == 'view') {
      const param = {
        id: id,
        type: 'view',
      };
      let paramId = window.btoa(JSON.stringify(param));
      this.router.navigate(['/user', paramId]);
    } else if (status == 'delete') {
      this.postService
        .Del('http://202.182.111.45:8081/v1/account/' + id)
        .subscribe((res) => {
          if (res && res.code == '200') {
            alert('Xóa thành công');
            this.getData();
          }
        });
    } else {
      const param = {
        id: id,
        type: 'edit',
      };
      let paramId = window.btoa(JSON.stringify(param));
      this.router.navigate(['/user', paramId]);
    }
  };
  // Router thêm mới
  addUser = () => {
    this.router.navigate(['user/new']);
  };
  // tìm keiém
  search = () => {
    setTimeout(() => {
      this.postService
        .Get(
          `http://202.182.111.45:8081/v1/accounts?_size=${
            this.config.itemsPerPage
          }&_from=${this.config.currentPage - 1}&_counting=true&name=${
            this.text
          }`
        )
        .subscribe((res) => {
          if (res) {
            this.data = res.data;
          }
        });
    }, 300);
  };
  // Đăng xuất
  logOut = () => {
    this.router.navigate(['/']);
  };
}
