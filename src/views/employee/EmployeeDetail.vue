<template>
  <div>
    <div id="dlgEmployeeDetail" class="dialog">
      <div class="model">Hello</div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN NHÂN VIÊN</div>
          <div class="dialog-close-button">&#x2715;</div>
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
              <input type="text" /><br />
              <label>Ngày sinh</label><br />
              <input id="dtDateOfBirth" type="date" /><br />
              <label
                >Số CMTND/ Căn cước (<label style="color: red">*</label>)</label
              ><br />
              <input type="text" /><br />
              <label>Nơi cấp</label><br />
              <input type="text" /><br />
              <label>Email (<label style="color: red">*</label>)</label><br />
              <input type="text" /><br />
              <label class="body-title">B. THÔNG TIN CÔNG VIỆC</label><br />
              <label>Vị trí</label><br />
              <select id="position">
                <option value="1">Phó phòng</option>
                <option value="0">Giám đốc</option>
                <option value="2">Nhân viên</option>
              </select>
            </form>
          </div>
          <div class="right-right-body"></div>
        </div>
        <div class="dialog-footer">
          <button id="btnSave" class="btn-default btn-icon destroy">Hủy</button>
          <button id="btnDestroy" class="btn-default btn-icon save">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { isShow: { type: Boolean, default: false } },
};
</script>
<style scoped></style>
