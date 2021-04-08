<template>
  <div @mousemove="focusOnEmployeeCode">
    <div
      id="dlgEmployeeDetail"
      class="dialog"
      :class="{ 'dialog-hide': !isShow }"
    >
      <div class="model"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
          <div class="dialog-close-button" @click="btnCloseOnClick()">
            &#x2715;
          </div>
        </div>
        <div class="dialog-body">
          <div class="left-body">
            <img src="../../assets/img/default-avatar.jpg" />
            <div class="img-desc">
              Vui lòng chọn ảnh có định dạng <b>.jpg, .jpeg, .png, .gif</b>
            </div>
          </div>
          <div class="left-right-body">
            <form class="dialog-form">
              <label class="body-title">A. THÔNG TIN CHUNG</label><br />
              <label>Mã nhân viên (<label style="color: red">*</label>)</label
              ><span :class="{ 'hide-span': msg[4].EmployeeCodeCheck }">{{
                msg[4].EmployeeCode
              }}</span
              ><br />
              <input
                @focus="saveOldEmployeeCode()"
                tabindex="1"
                ref="employeeCode"
                type="text"
                v-model="employee.EmployeeCode"
                required
              /><br />
              <label>Ngày sinh</label><br />
              <input
                tabindex="2"
                id="dtDateOfBirth"
                type="date"
                v-model="employee.DateOfBirth"
              />
              <br />
              <label
                >Số CMTND/ Căn cước (<label style="color: red">*</label>)</label
              >
              <span :class="{ 'hide-span': msg[0].IdentityNumberCheck }">{{
                msg[0].IdentityNumber
              }}</span
              ><br />
              <input
                tabindex="4"
                type="text"
                v-model="employee.IdentityNumber"
                required
              /><br />
              <label>Nơi cấp</label><br />
              <input
                tabindex="6"
                type="text"
                v-model="employee.IdentityPlace"
              /><br />
              <label>Email (<label style="color: red">*</label>)</label>
              <span :class="{ 'hide-span': msg[1].EmailCheck }">{{
                msg[1].Email
              }}</span
              ><br />
              <input
                tabindex="7"
                type="text"
                v-model="employee.Email"
                required
              /><br />
              <label class="body-title">B. THÔNG TIN CÔNG VIỆC</label><br />
              <label>Vị trí</label><br />
              <select tabindex="9" id="position" v-model="employee.PositionId">
                <option value="148ed882-32b8-218e-9c20-39c2f00615e8"
                  >Nhân viên Marketting</option
                >
                <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91"
                  >Thu ngân</option
                >
                <option value="3700cc49-55b5-69ea-4929-a2925c0f334d"
                  >Giám đốc</option
                > </select
              ><br />
              <label>Mã số thuế cá nhân</label><br />
              <input
                tabindex="11"
                type="text"
                v-model="employee.PersonalTaxCode"
              /><br />
              <label>Ngày gia nhập công ty</label><br />
              <input
                tabindex="13"
                id="participateDay"
                type="date"
                v-model="employee.JoinDate"
              /><br />
            </form>
          </div>
          <div class="right-right-body">
            <form class="dialog-form">
              <label style="visibility: hidden" class="body-title"
                >A. THÔNG TIN CHUNG</label
              ><br />
              <label>Họ và tên (<label style="color: red">*</label>)</label
              ><span :class="{ 'hide-span': msg[2].FullNameCheck }">{{
                msg[2].FullName
              }}</span
              ><br />
              <input
                tabindex="1"
                type="text"
                v-model="employee.FullName"
                required
              /><br />
              <label>Giới tính</label><br />
              <select tabindex="3" id="gender" v-model="employee.Gender">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Không xác định</option> </select
              ><br />
              <label>Ngày cấp</label><br />
              <input
                tabindex="5"
                id="provideDate"
                type="date"
                v-model="employee.IdentityDate"
              /><br />
              <label style="visibility: hidden">Nơi cấp</label><br />
              <input
                tabindex="6"
                style="visibility: hidden"
                type="text"
              /><br />
              <label>Số điện thoại (<label style="color: red">*</label>)</label
              ><span :class="{ 'hide-span': msg[3].PhoneNumberCheck }">{{
                msg[3].PhoneNumber
              }}</span
              ><br />
              <input
                tabindex="8"
                type="text"
                v-model="employee.PhoneNumber"
                required
              /><br />
              <label style="visibility: hidden" class="body-title"
                >B. THÔNG TIN CÔNG VIỆC</label
              ><br />
              <label>Phòng ban</label><br />
              <select
                tabindex="10"
                id="department"
                v-model="employee.DepartmentId"
              >
                <option value="142cb08f-7c31-21fa-8e90-67245e8b283e"
                  >Phòng Marketting</option
                >
                <option value="17120d02-6ab5-3e43-18cb-66948daf6128"
                  >Phòng đào tạo</option
                >
                <option value="469b3ece-744a-45d5-957d-e8c757976496"
                  >Phòng Nhân sự</option
                >
                <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c"
                  >Phòng Công nghệ</option
                > </select
              ><br />
              <label>Mức lương cơ bản</label><br />
              <div
                tabindex="12"
                @click="showSalaryInput()"
                :class="{ 'div-hide': salaryDiv }"
                class="cloneSalary"
              >
                {{ this.employee.Salary | formatNumber }}
              </div>
              <input
                @blur="showSalaryDiv()"
                :class="{ 'div-hide': salaryInput }"
                type="text"
                v-model="employee.Salary"
              /><br />
              <label>Gia đình</label><br />
              <select
                tabindex="14"
                id="martialStatus"
                v-model="employee.MartialStatus"
              >
                <option value="0">Độc thân</option>
                <option value="1">Đã có gia đình</option>
                <option value="2">Sống chung chưa kết hôn</option>
                <option value="3">Đã kết hôn</option>
                <option value="4">Góa</option>
                <option value="5">Ly thân</option>
                <option value="null">Không có dữ liệu</option> </select
              ><br />
            </form>
          </div>
        </div>
        <div class="dialog-footer">
          <button
            id="btnDestroy"
            class="btn-default btn-icon destroy"
            @click="btnCloseOnClick()"
          >
            Hủy
          </button>
          <button
            tabindex="15"
            id="btnSave"
            class="btn-default btn-icon save"
            @click="btnSaveOnClick()"
          >
            Lưu
          </button>
        </div>
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
  margin-top: 4px !important;
  border-radius: 4px !important;
  padding: 1px 16px 1px 16px !important;
  outline: none !important;
  font-size: 13px !important;
  vertical-align: middle !important;
}
</style>
