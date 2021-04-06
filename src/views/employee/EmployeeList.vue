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

      <button class="btn-refresh"></button>
      <button class="btn-delete"></button>
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
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="trOnDblClick(employee.EmployeeId)"
          >
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td v-if="checkDate(employee.DateOfBirth)">
              {{ new Date(employee.DateOfBirth) | dateFormat('DD.MM.YYYY') }}
            </td>
            <td v-if="!checkDate(employee.DateOfBirth)">Không có dữ liệu</td>
            <td>{{ employee.PhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td>{{ employee.Salary | formatNumber }}</td>
            <td>{{ employee.WorkStatus }}</td>
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
    ></EmployeeDetail>
    <Warning></Warning>
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
      .get('http://api.manhnv.net/v1/Employees')
      .then((res) => {
        this.employees = res.data;
      })
      .catch((res) => {
        console.log(res);
      });
  },
  props: [],
  methods: {
    //Hien thi dialog
    btnAddOnClick() {
      this.isShowDialogDetail = true;
    },
    //An dialog
    hideDialog() {
      this.isShowDialogDetail = false;
    },
    //Xu ly du lieu ngay thang
    checkDate(date) {
      if (!date) {
        return false;
      }
      return true;
    },
    trOnDblClick(employeeId) {
      this.isShowDialogDetail = true;
    },
  },
  data() {
    return {
      employees: [],
      validateDate: false,
      isShowDialogDetail: false,
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
