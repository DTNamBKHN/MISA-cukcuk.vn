<template>
  <div>
    <div class="page-title">
      <div class="page-left">Danh sách nhân viên</div>
      <div class="page-right">
        <button
          id="btnAdd"
          class="btn-default btn-icon"
          @click="btnAddOnClick()"
        >
          Thêm nhân viên
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 310px"
        placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
      />
      <div class="dropdown-box dropdown-box-room">
        <div class="dropdown">
          <button class="dropbtn">
            Tất cả phòng ban
          </button>
          <div class="dropdown-content">
            <a href="#">Random text</a>
            <a href="#">Random text</a>
            <a href="#">Random text</a>
          </div>
        </div>
        <div class="dropdown-icon"></div>
      </div>

      <div class="dropdown-box dropdown-box-position">
        <div class="dropdown">
          <button class="dropbtn">
            Tất cả vị trí
          </button>
          <div class="dropdown-content">
            <a href="#">Random text</a>
            <a href="#">Random text</a>
            <a href="#">Random text</a>
          </div>
        </div>
        <div class="dropdown-icon"></div>
      </div>

      <button class="btn-refresh" @click="loadData()"></button>
      <button class="btn-delete" @click="deleteOnClick()"></button>
    </div>
    <div class="grid">
      <table id="tblListCustomer" class="table" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Gia đình</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="trOnDblClick(employee.EmployeeId)"
            @click="beforeDeleteOnClick(employee.EmployeeId)"
            :class="{ 'bg-selected-row': onActive }"
          >
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
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging">
      <div data-v-a72348a4="" class="paging-bar">
        <div data-v-a72348a4="" class="paging-record-info">
          Hiển thị <b data-v-a72348a4="">1-10/1000</b> nhân viên
        </div>
        <div data-v-a72348a4="" class="paging-option">
          <div data-v-a72348a4="" class="btn-select-page m-btn-firstpage">
            <img src="../../assets/icon/btn-firstpage.svg" />
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-prev-page">
            <img src="../../assets/icon/btn-prev-page.svg" />
          </div>
          <div data-v-a72348a4="" class="m-btn-list-page">
            <button
              data-v-a72348a4=""
              class="btn-pagenumber btn-pagenumber-selected"
            >
              1</button
            ><button data-v-a72348a4="" class="btn-pagenumber">2</button
            ><button data-v-a72348a4="" class="btn-pagenumber">3</button
            ><button data-v-a72348a4="" class="btn-pagenumber">4</button>
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-next-page">
            <img src="../../assets/icon/btn-next-page.svg" />
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-lastpage">
            <img src="../../assets/icon/btn-lastpage.svg" />
          </div>
        </div>
        <div data-v-a72348a4="" class="paging-record-option">
          <b data-v-a72348a4="">10</b> nhân viên/trang
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
  </div>
</template>
<script>
import EmployeeDetail from './EmployeeDetail.vue';
import Warning from '../warning/Warning.vue';
import axios from 'axios';
export default {
  components: {
    EmployeeDetail,
    Warning,
  },
  created() {
    //load du lieu cho trang
    axios
      .get('https://localhost:44369/api/v1/Employees')
      .then((res) => {
        this.employees = res.data;
        this.selectedEmployee = this.employees[0];
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
        .get('http://api.manhnv.net/v1/Employees')
        .then((res) => {
          this.employees = res.data;
          console.log('Thuc hien load lai du lieu');
          console.log(this.employees);
        })
        .catch((res) => {
          console.log('Error: Thuc hien load lai du lieu');
          console.log(res);
        });
    },
    //Hien thi dialog
    btnAddOnClick() {
      axios('http://api.manhnv.net/v1/Employees/NewEmployeeCode')
        .then((res) => {
          this.selectedEmployee = {};
          this.selectedEmployee.EmployeeCode = res.data;
          console.log('An nut them moi nhan vien');
          console.log(res);
          this.dialogFormMode = 'add';
          this.isShowDialogDetail = true;
        })
        .catch((res) => {
          console.log('Err: An nut them moi nhan vien');
          console.log(res);
        });
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
        .get('http://api.manhnv.net/v1/Employees/' + employeeId)
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
    beforeDeleteOnClick(employeeId) {
      //this.$el.querySelectorAll('tr').removeClass('bg-selected-row');
      // this.onActive = !this.onActive;
      //Lay id cua ban ghi can xoa
      this.deleteID = employeeId;
      console.log(`deleteID: ${this.deleteID}`);
    },
    //Gui yeu cau xoa ban ghi
    deleteOnClick() {
      //Hien thi warning
      this.warning = true;
    },
    //Thuc hien xoa
    deleteEmployeeRequest() {
      //Goi api yeu cau xoa nhan vien
      axios
        .delete('http://api.manhnv.net/v1/Employees/' + this.deleteID)
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
  },
  data() {
    return {
      dialogFormMode: 'add',
      employees: [],
      selectedEmployee: {},
      isShowDialogDetail: false,
      warning: false,
      onActive: false,
      deleteID: '',
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
</style>
