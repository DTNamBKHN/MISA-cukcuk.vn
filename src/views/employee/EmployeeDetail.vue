<template>
  <div>
    <div
      id="dlgEmployeeDetail"
      class="flex-dialog"
      :class="{ 'dialog-hide': !isShow }"
    >
      <div class="flex-model"></div>
      <div class="flex-dialog-content">
        <div class="flex-dialog-header">
          <div class="flex-left-header">
            <div class="flex-dialog-title">Thông tin nhân viên</div>
            <div class="flex-dialog-checkbox">
              <input type="checkbox" /><label>Là khách hàng</label>
            </div>
            <div class="flex-dialog-checkbox">
              <input type="checkbox" /><label>Là nhà cung cấp</label>
            </div>
          </div>
          <div class="flex-right-header">
            <div class="flex-dialog-close-button" @click="btnCloseOnClick()">
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
                    <input
                      type="text"
                      v-model="employee.employeeCode"
                      required
                    />
                  </div>
                  <div class="top-left-row-1-b">
                    <label>Tên <label style="color: red">*</label></label
                    ><span class="validate hide-span"
                      >Tên không được phép để trống</span
                    ><br />
                    <input type="text" v-model="employee.fullName" required />
                  </div>
                </div>
                <div class="top-left-row-2">
                  <label>Đơn vị <label style="color: red">*</label></label>
                  <select v-model="employee.employeeDepartmentId" required>
                    <option value="3b880afd-77ba-69c9-6510-dde5fda516a2"
                      >Executive</option
                    >
                    <option value="4fe5ee09-2c89-580a-dc49-fe4bedd9e894"
                      >Research and Development</option
                    >
                    <option value="61e3cc06-6237-222a-7e5b-5b97e23db0bb"
                      >Manufacturing</option
                    >
                    <option value="7461553a-1f2b-56a6-e8c0-f32a102323e6"
                      >Marketing</option
                    >
                  </select>
                </div>
                <div class="top-left-row-3">
                  <label>Chức danh</label>
                  <input type="text" v-model="employee.employeePosition" />
                </div>
              </form>
            </div>
            <div class="flex-top-right-body">
              <form class="flex-dialog-form">
                <div class="top-right-row-1">
                  <div class="top-right-row-1-a">
                    <label>Ngày sinh</label>
                    <input
                      @blur="showDateDiv()"
                      :class="{ 'div-hide': dateInput }"
                      type="date"
                      v-model="employee.dateOfBirth"
                    />
                    <div
                      @click="showDateInput()"
                      :class="{ 'div-hide': dateDiv }"
                      class="cloneDate"
                      v-if="checkDate(this.employee.dateOfBirth)"
                    >
                      {{
                        new Date(this.employee.dateOfBirth)
                          | dateFormat('DD.MM.YYYY')
                      }}
                    </div>
                    <div
                      @click="showDateInput()"
                      :class="{ 'div-hide': dateDiv }"
                      class="cloneDate"
                      v-if="!checkDate(this.employee.dateOfBirth)"
                    ></div>
                  </div>
                  <div class="top-right-row-1-b">
                    <label style="display:block">Giới tính</label><br />
                    <div class="top-right-row-1-b-child">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="1"
                        v-model="employee.gender"
                      />
                      <label for="male">Nam</label>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="0"
                        v-model="employee.gender"
                      />
                      <label for="female">Nữ</label>
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="2"
                        v-model="employee.gender"
                      />
                      <label for="other">Khác</label>
                    </div>
                  </div>
                </div>
                <div class="top-right-row-2">
                  <div class="top-right-row-2-a">
                    <label>Số CMND</label>
                    <input type="text" v-model="employee.identityNumber" />
                  </div>
                  <div class="top-right-row-2-b">
                    <label>Ngày cấp</label>
                    <input
                      @blur="showDateDiv()"
                      :class="{ 'div-hide': dateInput }"
                      type="date"
                      v-model="employee.identityDate"
                    />
                    <div
                      @click="showDateInput()"
                      :class="{ 'div-hide': dateDiv }"
                      class="cloneDate"
                      v-if="checkDate(this.employee.identityDate)"
                    >
                      {{
                        new Date(this.employee.identityDate)
                          | dateFormat('DD.MM.YYYY')
                      }}
                    </div>
                    <div
                      @click="showDateInput()"
                      :class="{ 'div-hide': dateDiv }"
                      class="cloneDate"
                      v-if="!checkDate(this.employee.identityDate)"
                    ></div>
                  </div>
                </div>
                <div class="top-right-row-3">
                  <label>Nơi cấp</label>
                  <input type="text" v-model="employee.identityPlace" />
                </div>
              </form>
            </div>
          </div>
          <div class="flex-bottom-body">
            <form class="flex-dialog-form">
              <div class="bottom-row-1">
                <label>Địa chỉ</label>
                <input type="text" v-model="employee.address" />
              </div>
              <div class="bottom-row-2">
                <div class="bottom-row-2-a">
                  <label>ĐT di động</label>
                  <input type="text" v-model="employee.mobilePhoneNumber" />
                </div>
                <div class="bottom-row-2-b">
                  <label>ĐT cố định</label>
                  <input type="text" v-model="employee.landlineNumber" />
                </div>
                <div class="bottom-row-2-c">
                  <label>Email</label>
                  <input type="text" v-model="employee.email" />
                </div>
              </div>
              <div class="bottom-row-2">
                <div class="bottom-row-2-a">
                  <label>Tài khoản ngân hàng</label>
                  <input type="text" v-model="employee.bankAccount" />
                </div>
                <div class="bottom-row-2-b">
                  <label>Tên ngân hàng</label>
                  <input type="text" v-model="employee.bankName" />
                </div>
                <div class="bottom-row-2-c">
                  <label>Chi nhánh</label>
                  <input type="text" v-model="employee.bankBranch" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="flex-dialog-footer">
          <button id="btnDestroy" class="btn-default btn-icon destroy">
            Hủy
          </button>
          <button
            id="btnSave"
            class="btn-default btn-icon save"
            @click="btnSaveOnClick()"
          >
            Cất và thêm
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
    showDateInput() {
      this.dateDiv = true;
      this.dateInput = false;
    },
    showDateDiv() {
      this.dateDiv = false;
      this.dateInput = true;
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
      this.$emit('hideDialog');
    },
    //Chinh sua/them moi du lieu
    saveOldEmployeeCode() {
      this.employeeCodeCheck = this.employee.EmployeeCode;
    },
    btnSaveOnClick() {
      if (this.formMode == 'add') {
        axios
          .post('https://localhost:44369/api/v1/Employees', this.employee)
          .then((res) => {
            console.log('Post du lieu');
            console.log(res);
            this.$emit('hideDialog');
          })
          .catch((res) => {
            console.log('Err: Post du lieu');
            console.log(res);
          });
      } else {
        axios
          .put(
            'https://localhost:44369/api/v1/Employees/' +
              this.employee.employeeId,
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
    },
  },

  data() {
    return {
      employeeCodeCheck: '',
      dateDiv: false,
      dateInput: true,
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
.cloneDate {
  border: 1px solid #bbbbbb !important;
  height: 39px !important;
  line-height: 39px;
  border-radius: 4px !important;
  padding: 0px 16px 0px 16px !important;
  outline: none !important;
  font-size: 13px !important;
  box-sizing: border-box;
  margin-bottom: 0px;
}

.cloneDate:focus {
  border: 2px solid rgb(62, 143, 248);
}
</style>
