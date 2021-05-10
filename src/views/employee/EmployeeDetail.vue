<template>
  <div>
    <div id="dlgEmployeeDetail" class="flex-dialog">
      <div class="flex-model"></div>
      <div class="flex-dialog-content">
        <div class="flex-dialog-header">
          <div class="flex-left-header">
            <div class="flex-dialog-title">THÔNG TIN NHÂN VIÊN</div>
            <div class="flex-dialog-checkbox">
              <input type="checkbox" /><label>Là khách hàng</label>
            </div>
            <div class="flex-dialog-checkbox">
              <input type="checkbox" /><label>Là nhà cung cấp</label>
            </div>
          </div>
          <div class="flex-right-header">
            <div class="flex-dialog-close-button">
              &#x2715;
            </div>
          </div>
        </div>
        <div class="flex-dialog-body">
          <div class="flex-top-body">
            <div class="flex-top-left-body">
              <form class="flex-dialog-form">
                <div class="top-left-row-1">
                  <div class="top-left-row-1-a">
                    <label>Mã <label style="color: red">*</label></label
                    ><br />
                    <input type="text" />
                  </div>
                  <div class="top-left-row-1-b">
                    <label>Tên <label style="color: red">*</label></label
                    ><br />
                    <input type="text" />
                  </div>
                </div>
                <div class="top-left-row-2">
                  <label>Đơn vị</label>
                  <select>
                    <option>Phòng nhân sự</option>
                    <option>Phòng nhân sự</option>
                    <option>Phòng nhân sự</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="flex-top-right-body"></div>
          </div>

          <div class="flex-bottom-body"></div>
        </div>
        <div class="flex-dialog-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
  props: {
    isShow: { type: Boolean, default: false },
    employee: { type: Object, default: null },
    employees: { type: Array, default: null },
    formMode: { type: String, default: 'add' },
  },
  methods: {
    //Hien/An salary input
    showSalaryInput() {
      this.salaryDiv = true;
      this.salaryInput = false;
    },
    showSalaryDiv() {
      this.salaryDiv = false;
      this.salaryInput = true;
    },
    //Auto focus vao Ma nhan vien
    focusOnEmployeeCode() {
      this.$nextTick(function() {
        this.$refs.employeeCode.focus();
      });
    },
    //Xu ly hien thi du lieu ngay thang len dialog
    checkDate(date) {
      if (!date) {
        return false;
      }
      return true;
    },
    format(value) {
      return moment(value).format('YYYY-MM-DD');
    },
    //Goi den phuong thuc hideDialog cua EmployeeList
    btnCloseOnClick() {
      this.msg[0].IdentityNumberCheck = true;
      this.msg[1].EmailCheck = true;
      this.msg[2].FullNameCheck = true;
      this.msg[3].PhoneNumberCheck = true;
      this.msg[4].EmployeeCodeCheck = true;
      this.$emit('hideDialog');
    },
    //Chinh sua/them moi du lieu
    saveOldEmployeeCode() {
      this.employeeCodeCheck = this.employee.EmployeeCode;
    },
    btnSaveOnClick() {
      console.log('check1');
      if (this.beforePostUpdateCheck == true) {
        console.log(`OldCode: ${this.employeeCodeCheck}`);
        console.log(`IdentityNumber: ${this.employee.IdentityNumber}`);
        console.log(`Email: ${this.employee.Email}`);
        console.log(`FullName: ${this.employee.FullName}`);
        console.log(`Phone: ${this.employee.PhoneNumber}`);
        console.log(`EmployeeCode: ${this.employee.EmployeeCode}`);
        //Kiem tra trung lap Ma nhan vien
        var i,
          checkEmployeeCode = false;
        for (i = 0; i < this.employees.length; i++) {
          if (
            this.employee.EmployeeCode == this.employees[i].EmployeeCode &&
            this.employeeCodeCheck != this.employee.EmployeeCode
          ) {
            checkEmployeeCode = true;
            break;
          }
        }
        if (checkEmployeeCode == true) {
          this.msg[4].EmployeeCodeCheck = false;
        }
        if (
          this.employee.IdentityNumber == '' ||
          this.employee.IdentityNumber == null
        ) {
          this.msg[0].IdentityNumberCheck = false;
        } else {
          this.msg[0].IdentityNumberCheck = true;
        }
        if (
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
            this.employee.Email
          )
        ) {
          this.msg[1].EmailCheck = true;
        } else {
          this.msg[1].EmailCheck = false;
        }
        if (this.employee.FullName == '' || this.employee.FullName == null) {
          this.msg[2].FullNameCheck = false;
        } else {
          this.msg[2].FullNameCheck = true;
        }
        if (
          this.employee.PhoneNumber == '' ||
          this.employee.PhoneNumber == null
        ) {
          this.msg[3].PhoneNumberCheck = false;
        } else {
          this.msg[3].PhoneNumberCheck = true;
        }
        if (
          this.employee.IdentityNumber == '' ||
          this.employee.IdentityNumber == null ||
          !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
            this.employee.Email
          ) ||
          this.employee.FullName == '' ||
          this.employee.FullName == null ||
          this.employee.PhoneNumber == '' ||
          this.employee.PhoneNumber == null ||
          checkEmployeeCode == true
        ) {
          this.afterPostUpdateCheck = true;
          console.log(this.afterPostUpdateCheck);
        } else {
          this.afterPostUpdateCheck = false;
          console.log('check4');
        }
      }
      if (this.afterPostUpdateCheck == true) {
        console.log('Chua nhap du du lieu');
      } else {
        console.log('check5');
        if (this.formMode == 'add') {
          axios
            .post('http://api.manhnv.net/v1/Employees', this.employee)
            .then((res) => {
              console.log('Post du lieu');
              console.log(res);
              this.msg[0].IdentityNumberCheck = true;
              this.msg[1].EmailCheck = true;
              this.msg[2].FullNameCheck = true;
              this.msg[3].PhoneNumberCheck = true;
              this.msg[4].EmployeeCodeCheck = true;
              this.$emit('hideDialog');
            })
            .catch((res) => {
              console.log('Err: Post du lieu');
              console.log(res);
            });
        } else {
          axios
            .put(
              'http://api.manhnv.net/v1/Employees/' + this.employee.EmployeeId,
              this.employee
            )
            .then((res) => {
              console.log('Update du lieu');
              console.log(res);
              this.$emit('hideDialog');
            })
            .catch((res) => {
              console.log('Err: Update du lieu');
              console.log(res);
            });
        }
      }
    },
  },
  data() {
    return {
      employeeCodeCheck: '',
      salaryDiv: false,
      salaryInput: true,
      beforePostUpdateCheck: true,
      afterPostUpdateCheck: false,
      msg: [
        { IdentityNumber: 'Thiếu', IdentityNumberCheck: true },
        { Email: 'Sai định dạng', EmailCheck: true },
        { FullName: 'Thiếu', FullNameCheck: true },
        { PhoneNumber: 'Thiếu', PhoneNumberCheck: true },
        { EmployeeCode: 'Trùng', EmployeeCodeCheck: true },
      ],
    };
  },
};
</script>
<style scoped>
.cloneSalary {
  border: 1px solid #bbbbbb !important;
  height: 28px !important;
  /* center text in div tag */
  line-height: 28px;
  margin-top: 4px !important;
  border-radius: 4px !important;
  padding: 1px 16px 1px 16px !important;
  outline: none !important;
  font-size: 13px !important;
  vertical-align: middle !important;
}

.cloneSalary:focus {
  border: 2px solid rgb(62, 143, 248);
}
</style>
