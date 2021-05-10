<template>
  <div>
    <div class="flex-dialog dialog-hide">
      <div class="flex-model"></div>
      <div class="codewarning-content">
        <div class="codewarning-body">
          <div class="warning-img"></div>
          <div class="warning-content">
            Mã nhân viên &lt; NV-0001 &gt; đã tồn tại trong hệ thống, vui lòng
            kiểm tra lại
          </div>
        </div>
        <div class="flex-dialog-footer">
          <button id="btnDestroy" class="btn-default btn-icon destroy">
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.codewarning-content {
  padding: 24px 24px 0px 24px;
  position: absolute;
  top: 50%;
  left: 42%;
  transform: translate(-50%, -50%);
  width: 470px;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  background-color: #ffffff;
}
/* ----------Body---------- */
.codewarning-body {
  width: 100%;
  height: 140px;
  /* background-color: yellow; */
  margin: 0px;
  border: 0px;
  display: flex;
  flex: 1 1;
  align-items: center;
  justify-content: space-around;
}

.codewarning-body .warning-img {
  width: 40px;
  height: 40px;
  background-image: url('../../assets/icon/delete-warning.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #dedede;
  border-radius: 50%;
  margin-right: 12px;
}

.destroy {
  margin-right: 0 !important;
}
</style>
