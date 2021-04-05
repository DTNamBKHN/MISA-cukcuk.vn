<template>
  <div>
    <div id="header">
      <div class="header-left">
        <div class="dropdown">
          <button class="dropbtn">
            Nhà hàng Biển Đông<i class="arrow down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Nhà hàng Biển Bắc</a>
            <a href="#">Nhà hàng Biển Nam</a>
            <a href="#">Nhà hàng Biển Tây</a>
          </div>
        </div>
      </div>
      <div class="header-right">
        <img class="avatar" src="../../assets/icon/avatar-default.png" />
        <span class="name">Lương Duyên Bình Nguyên</span>
        <img class="option" src="../../assets/icon/option.png" />
      </div>
    </div>
  </div>
</template>
<style scoped>
#header {
  display: flex;
  align-items: center;
  border: 1px solid #dedede;
  position: absolute;
  left: 200px;
  right: 0;
  height: 60px;
  top: 0;
  padding: 0 24px 0 24px;
}

.header-left .dropdown-btn a {
  height: 40px;
}

.header-left button {
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
  height: 40px;
  position: absolute;
  right: 24px;
  font-weight: bold;
  padding: 12px 0 12px 0;
}

.avatar {
  background-image: url('../../assets/icon/avatar-default.png');
  background-repeat: no-repeat;
  background-position-y: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background-size: contain;
  cursor: pointer;
}

.name {
  margin: 0 16px 0 16px;
}

.option {
  cursor: pointer;
}
</style>
