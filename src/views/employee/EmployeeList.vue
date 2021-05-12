<template>
  <div>
    <div class="page-title">
      <div class="page-left">Nhân viên</div>
      <div class="page-right">
        <button
          id="btnAdd"
          class="btn-default btn-icon"
          @click="btnAddOnClick()"
        >
          Thêm mới nhân viên
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 310px"
        placeholder="Tìm theo mã, tên nhân viên"
        v-model="search_string"
        @keyup.enter="search()"
      />

      <button class="btn-refresh" @click="loadData()"></button>
    </div>
    <div class="grid" style="overflow: scroll;">
      <table id="tblListCustomer" class="table" width="100%" border="0">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Mã nhân viên</th>
            <th>Tên nhân viên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Số CMND</th>
            <th>Chức danh</th>
            <th>Tên đơn vị</th>
            <th class="hide-column-1070">Số tài khoản</th>
            <th class="hide-column-1220 hide-column-1070">Tên ngân hàng</th>
            <th class="hide-column-1220 hide-column-1070">
              Chi nhánh ngân hàng
            </th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="trOnDblClick(employee.EmployeeId)"
            @click="beforeDeleteOnClick(employee.EmployeeId)"
            :class="{ 'bg-selected-row': onActive }"
          >
            <td><input type="checkbox" /></td>
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.Gender }}</td>
            <td v-if="checkDate(employee.DateOfBirth)">
              {{ new Date(employee.DateOfBirth) | dateFormat('DD.MM.YYYY') }}
            </td>
            <td v-if="!checkDate(employee.DateOfBirth)">Không có dữ liệu</td>
            <td>{{ employee.MobilePhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
          </tr> -->
          <tr
            v-for="employee in employees"
            :key="employee.employeeId"
            @dblclick="trOnDblClick(employee.employeeId)"
          >
            <td><input type="checkbox" /></td>
            <td>{{ employee.employeeCode }}</td>
            <td>{{ employee.fullName }}</td>
            <td v-if="employee.gender == 0">Nữ</td>
            <td v-if="employee.gender == 1">Nam</td>
            <td v-if="employee.gender == 2">Không xác định</td>
            <td v-if="employee.gender == null">Không có dữ liệu</td>
            <td v-if="checkDate(employee.dateOfBirth)">
              {{ new Date(employee.dateOfBirth) | dateFormat('DD.MM.YYYY') }}
            </td>
            <td v-if="!checkDate(employee.dateOfBirth)">Không có dữ liệu</td>
            <td v-if="employee.identityNumber != null">
              {{ employee.identityNumber }}
            </td>
            <td v-if="employee.identityNumber == null">Không có dữ liệu</td>
            <td>{{ employee.employeePosition }}</td>
            <td
              v-if="
                employee.employeeDepartmentId ==
                  '3b880afd-77ba-69c9-6510-dde5fda516a2'
              "
            >
              Executive
            </td>
            <td
              v-if="
                employee.employeeDepartmentId ==
                  '4fe5ee09-2c89-580a-dc49-fe4bedd9e894'
              "
            >
              Research and Development
            </td>
            <td
              v-if="
                employee.employeeDepartmentId ==
                  '61e3cc06-6237-222a-7e5b-5b97e23db0bb'
              "
            >
              Manufacturing
            </td>
            <td
              v-if="
                employee.employeeDepartmentId ==
                  '7461553a-1f2b-56a6-e8c0-f32a102323e6'
              "
            >
              Marketing
            </td>
            <td class="hide-column-1070">{{ employee.bankAccount }}</td>
            <td class="hide-column-1220 hide-column-1070">
              {{ employee.bankName }}
            </td>
            <td class="hide-column-1220 hide-column-1070">
              {{ employee.bankBranch }}
            </td>
            <td>
              <div class="function-dropdown-box">
                <div class="function-dropdown">
                  <a
                    @click="trOnDblClick(employee.employeeId)"
                    class="function-dropbtn"
                    >Sửa</a
                  >
                  <div class="function-dropdown-content">
                    <a href="#">Nhân bản</a>
                    <a href="#" @click="deleteOnClick(employee.employeeId)"
                      >Xóa</a
                    >
                    <a href="#">Ngưng sử dụng</a>
                  </div>
                </div>
                <div class="dropdown-icon"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging">
      <div data-v-a72348a4="" class="paging-bar">
        <div data-v-a72348a4="" class="paging-record-info">
          Tổng số:<b data-v-a72348a4=""> {{ totalRow }}</b> bản ghi
        </div>
        <div class="dropdown-box dropdown-box-room">
          <div class="dropdown">
            <button class="dropbtn">
              10 bản ghi trên một trang
            </button>
            <div class="dropdown-content">
              <a href="#" v-on:click="rowPerPage = 10"
                >10 bản ghi trên một trang</a
              >
              <a href="#" v-on:click="rowPerPage = 20"
                >20 bản ghi trên một trang</a
              >
              <a href="#" v-on:click="rowPerPage = 30"
                >30 bản ghi trên một trang</a
              >
              <a href="#" v-on:click="rowPerPage = 50"
                >50 bản ghi trên một trang</a
              >
              <a href="#" v-on:click="rowPerPage = 100"
                >100 bản ghi trên một trang</a
              >
            </div>
          </div>
          <div class="dropdown-icon"></div>
        </div>
        <div class="pagination">
          <ul>
            <li @click="previousClicked()" :disabled="aaa === true">Trước</li>
            <li
              :class="[pageIndex === n ? 'active' : '']"
              v-for="n in paginateWithDots"
              :key="n"
              @click="changePerPage(n)"
            >
              {{ n }}
            </li>
            <li @click="nextClicked()" :disabled="pageIndex == totalPage">
              Sau
            </li>
          </ul>
        </div>
      </div>
    </div>
    <EmployeeDetail
      :isShow="isShowDialogDetail"
      @hideDialog="hideDialog"
      :employee="selectedEmployee"
      :employees="employees"
      :formMode="dialogFormMode"
    ></EmployeeDetail>
    <Warning
      :showWarning="warning"
      @deleteEmployeeRequest="deleteEmployeeRequest"
      @destroyRequest="destroyRequest"
    ></Warning>
    <CodeWarning> </CodeWarning>
  </div>
</template>
<script>
import EmployeeDetail from './EmployeeDetail.vue';
import Warning from '../warning/Warning.vue';
import CodeWarning from '../warning/CodeWarning.vue';
import axios from 'axios';
export default {
  components: {
    EmployeeDetail,
    Warning,
    CodeWarning,
  },
  created() {
    //load du lieu cho trang
    axios
      .get('https://localhost:44369/api/v1/Employees/total')
      .then((res) => {
        this.totalRow = parseInt(res.data);
        this.totalPage = Math.ceil(this.totalRow / this.rowPerPage);
        this.pageIndex = 1;
        this.loadData();
      })
      .catch((res) => {
        console.log(res);
      });
  },
  props: [],
  methods: {
    //load data
    loadData() {
      axios
        .get(
          'https://localhost:44369/api/v1/Employees/Paging/' +
            this.pageIndex +
            '/' +
            this.rowPerPage
        )
        .then((res) => {
          this.employees = res.data;
          // this.totalRow = this.employees.length;
          // this.totalPage = this.totalRow / this.rowPerPage + 1;
          console.log('Thuc hien load lai du lieu');
          console.log(this.employees);
          this.paginateWithDots = this.pagination(
            this.pageIndex,
            this.totalPage
          );
          console.log(this.paginateWithDots);
        })
        .catch((res) => {
          console.log('Error: Thuc hien load lai du lieu');
          console.log(res);
        });
    },
    //Hien thi dialog
    btnAddOnClick() {
      axios('https://localhost:44369/api/v1/Employees/NewEmployeeCode')
        .then((res) => {
          this.selectedEmployee = {};
          this.selectedEmployee.employeeCode = 'NV-' + res.data;
          console.log(this.selectedEmployee.employeeCode);
          console.log('An nut them moi nhan vien');
          this.dialogFormMode = 'add';
          this.isShowDialogDetail = true;
        })
        .catch((res) => {
          console.log('Err: An nut them moi nhan vien');
          console.log(res);
        });
      this.isShowDialogDetail = true;
    },
    //An dialog
    hideDialog() {
      this.isShowDialogDetail = false;
      this.loadData();
    },
    //Xu ly du lieu ngay thang
    checkDate(date) {
      if (!date) {
        return false;
      }
      return true;
    },
    //Hien thi thong tin len dialog khi dblclick
    trOnDblClick(employeeId) {
      //Lay id cua ban ghi duoc chon

      //Goi api lay thong tin nhan vien
      axios
        .get('https://localhost:44369/api/v1/Employees/' + employeeId)
        .then((res) => {
          this.selectedEmployee = {};
          this.selectedEmployee = res.data;
          console.log('Nhan dblclcik');
          console.log(this.selectedEmployee);
        })
        .catch((res) => {
          console.log('Err: Nhan dblclcik');
          console.log(res);
        });
      //Thuc hien binding du lieu len form chi tiet
      //Cap nhat trang thai cua form
      this.dialogFormMode = 'edit';
      //Hien thi dialog chi tiet
      this.isShowDialogDetail = true;
    },
    //Chuan bi xoa 1 nhan vien: highlight dong can xoa, luu id cua dong can xoa
    deleteOnClick(employeeId) {
      //this.$el.querySelectorAll('tr').removeClass('bg-selected-row');
      // this.onActive = !this.onActive;
      //Lay id cua ban ghi can xoa
      this.deleteID = employeeId;
      console.log(`deleteID: ${this.deleteID}`);
      //Hien thi cảnh báo
      this.warning = true;
    },
    //Thuc hien xoa
    deleteEmployeeRequest() {
      //Goi api yeu cau xoa nhan vien
      axios
        .delete('https://localhost:44369/api/v1/Employees/' + this.deleteID)
        .then((res) => {
          console.log('Xoa thanh cong');
          console.log(res);
          //Cap nhat trang thai cua form
          this.loadData();
          //Dong warning
          this.warning = false;
          //Bo background color
          this.onActive = false;
        })
        .catch((res) => {
          console.log('Err: xoa');
          console.log(res);
        });
    },
    destroyRequest() {
      //Dong warning
      this.warning = false;
      //load  lai Data
      this.loadData();
      // //Bo background color
      //     this.onActive = false;
    },
    search() {
      axios
        .get(
          'https://localhost:44369/api/v1/Employees/search/' +
            this.search_string
        )
        .then((res) => {
          this.employees = res.data;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    changePerPage(page) {
      if (page === '...') {
        return false;
      }
      this.pageIndex = page;
      this.loadData();
    },
    pagination(c, m) {
      //c = currenpage, m = sum page
      let delta = 2,
        range = [],
        rangeWithDots = [],
        l;

      range.push(1);
      for (let i = c - delta; i <= c + delta; i++) {
        if (i < m && i > 1) {
          range.push(i);
        }
      }
      range.push(m);

      range.map((val) => {
        if (l) {
          if (val - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (val - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(val);
        l = val;
      });

      return rangeWithDots;
    },
    previousClicked() {
      if (this.pageIndex > 1) {
        this.pageIndex -= 1;
        this.loadData();
        console.log(`da click ${this.pageIndex}`);
        this.aaa = false;
      } else {
        this.aaa = true;
      }
    },
    nextClicked() {
      if (this.pageIndex < this.totalPage) {
        this.pageIndex += 1;
        this.loadData();
        console.log(`da click ${this.pageIndex}`);
        this.bbb = false;
      } else {
        this.bbb = true;
      }
    },
  },
  data() {
    return {
      search_string: '',
      dialogFormMode: 'add',
      employees: [],
      selectedEmployee: {},
      isShowDialogDetail: false,
      warning: false,
      onActive: false,
      deleteID: '',
      totalRow: null,
      rowPerPage: 10,
      totalPage: null,
      pageIndex: null,
      paginateWithDots: [],
      aaa: false,
      bbb: false,
    };
  },
};
</script>

<style scoped>
.page-title {
  height: 40px;
  display: flex;
  align-items: center;
}

.page-title .page-right {
  position: absolute;
  right: 24px;
}

.page-title .page-left {
  font-size: 24px;
  font-weight: bold;
}

.toolbar {
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 42px;
  /* background-color: #ff0000; */
}

.grid {
  position: absolute;
  right: 24px;
  left: 24px;
  bottom: 60px;
  top: 128px;
  overflow-y: auto;
  overflow: hidden;
}

.paging {
  position: absolute;
  bottom: 0;
  height: 60px;
  left: 24px;
  right: 24px;
}

.m-col {
  width: 50%;
  float: left;
  padding: 0 4px;
  box-sizing: border-box;
}

.m-row {
  width: 100%;
  display: flex;
  margin-top: 8px;
  position: relative;
}

.m-row label {
  display: block;
}

.m-row input,
select {
  margin-top: 4px;
}

.paging .dropdown-box-room {
  width: 215px;
  position: relative;
}

.dropdown-box-room .dropdown-content {
  position: absolute;
  top: -205px;
}
@media screen and (max-width: 1220px) {
  .hide-column-1220 {
    display: none;
  }
}

@media screen and (max-width: 1070px) {
  .hide-column-1070 {
    display: none;
  }
}

/* CSS pagination */
.pagination {
}
.pagination ul {
  display: flex;
  list-style-type: none;
}

.pagination li {
  padding: 5px;
}

.pagination li:hover {
  border: 1px solid rgb(136, 133, 133);
  cursor: pointer;
}

.active {
  font-weight: bold;
}
</style>
