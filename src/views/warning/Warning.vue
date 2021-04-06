<template>
  <div>
    <div id="dlgWarning" class="dialog dialog-hide">
      <div class="model"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">Xóa bản ghi</div>
          <div class="dialog-close-button">&#x2715;</div>
        </div>
        <div class="dialog-body">
          <div class="warning-img"></div>
          <div class="warning-content">
            Bạn có chắc chắn muốn xóa bản ghi này không?
          </div>
        </div>
        <div class="dialog-footer">
          <button id="btnDestroy" class="btn-default destroy">
            Hủy
          </button>
          <button id="btnDelete" class="btn-default delete">
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.dialog .dialog-content {
  width: 400px;
  min-height: 87px;
  overflow: hidden;
}
.dialog .dialog-title {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}
.dialog .dialog-body {
  display: flex;
  align-items: center;
  padding: 0 0 24px 0;
}
.dialog-body .warning-img {
  width: 40px;
  height: 40px;
  background-image: url('../../assets/icon/delete-warning.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #dedede;
  border-radius: 50%;
}

.dialog-body .warning-content {
  font-size: 13px;
  color: #000000;
  font-family: regular;
  margin-left: 10px;
}
.dialog-footer {
  height: 60px;
}

.dialog-footer .destroy {
  right: 110px;
}
</style>
