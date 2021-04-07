<template>
  <div>
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
              ><br />
              <input type="text" v-model="employee.EmployeeCode" /><br />
              <label>Ngày sinh</label><br />
              <input
                v-if="checkDate(employee.DateOfBirth)"
                id="dtDateOfBirth"
                type="date"
                :value="format(employee.DateOfBirth)"
              /><input
                v-if="!checkDate(employee.DateOfBirth)"
                id="dtDateOfBirth"
                type="date"
                value=""
              />
              <br />
              <label
                >Số CMTND/ Căn cước (<label style="color: red">*</label>)</label
              ><br />
              <input type="text" v-model="employee.IdentityNumber" /><br />
              <label>Nơi cấp</label><br />
              <input type="text" v-model="employee.IdentityPlace" /><br />
              <label>Email (<label style="color: red">*</label>)</label><br />
              <input type="text" v-model="employee.Email" /><br />
              <label class="body-title">B. THÔNG TIN CÔNG VIỆC</label><br />
              <label>Vị trí</label><br />
              <select id="position" v-model="employee.PositionId">
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
              <input type="text" v-model="employee.PersonalTaxCode" /><br />
              <label>Ngày gia nhập công ty</label><br />
              <input
                v-if="!checkDate(employee.JoinDate)"
                id="participateDay"
                type="date"
                value=""
              />
              <input
                v-if="checkDate(employee.JoinDate)"
                id="participateDay"
                type="date"
                :value="format(employee.JoinDate)"
              /><br />
            </form>
          </div>
          <div class="right-right-body">
            <form class="dialog-form">
              <label style="visibility: hidden" class="body-title"
                >A. THÔNG TIN CHUNG</label
              ><br />
              <label>Họ và tên (<label style="color: red">*</label>)</label
              ><br />
              <input type="text" v-model="employee.FullName" /><br />
              <label>Giới tính</label><br />
              <select id="gender" v-model="employee.Gender">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Không xác định</option> </select
              ><br />
              <label>Ngày cấp</label><br />
              <input
                v-if="!checkDate(employee.IdentifyDate)"
                id="provideDate"
                type="date"
                value=""
              />
              <input
                v-if="checkDate(employee.IdentifyDate)"
                id="provideDate"
                type="date"
                :value="format(employee.IdentifyDate)"
              /><br />
              <label style="visibility: hidden">Nơi cấp</label><br />
              <input style="visibility: hidden" type="text" /><br />
              <label>Số điện thoại (<label style="color: red">*</label>)</label
              ><br />
              <input type="text" v-model="employee.PhoneNumber" /><br />
              <label style="visibility: hidden" class="body-title"
                >B. THÔNG TIN CÔNG VIỆC</label
              ><br />
              <label>Phòng ban</label><br />
              <select id="department" v-model="employee.DepartmentId">
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
              <input type="text" v-model="employee.Salary" /><br />
              <label>Gia đình</label><br />
              <select id="martialStatus" v-model="employee.MartialStatus">
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
          <button id="btnDestroy" class="btn-default btn-icon destroy">
            Hủy
          </button>
          <button
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
    formMode: { type: String, default: 'add' },
  },
  methods: {
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
    btnSaveOnClick() {
      if (this.formMode == 'add') {
        axios
          .post('http://api.manhnv.net/v1/Employees', this.employee)
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
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
