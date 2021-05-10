<template>
  <div>
    <div id="header">
      <div class="header-left">
        <img src="" class="hamburger-icon" />
        <div class="dropdown-box">
          <div class="dropdown">
            <button class="dropbtn">
              Nhà hàng Biển Đông
            </button>
            <div class="dropdown-content">
              <a href="#">Nhà hàng Biển Bắc</a>
              <a href="#">Nhà hàng Biển Nam</a>
              <a href="#">Nhà hàng Biển Tây</a>
            </div>
          </div>
          <div class="dropdown-icon"></div>
        </div>
      </div>
      <div class="header-right">
        <img class="notify-icon" src="" />
        <img class="avatar" src="../../assets/icon/avatar-default.png" />
        <span class="name">Lương Duyên Bình Nguyên</span>
        <img class="option" src="" />
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
/* --------------------Header-left------------------------ */
.header-left {
  display: flex;
  position: absolute;
  left: 24px;
  align-items: center;
}

.header-left .hamburger-icon {
  background: url('../../assets/icon/Sprites.64af8f61.svg') no-repeat -847px -35px;
  width: 16px;
  height: 16px;
  border: 0px;
  cursor: pointer;
}

.header-left .dropdown-btn a {
  height: 40px;
}

.header-left button {
  font-weight: bold;
}
/* -------------------Header right------------------------- */
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  position: absolute;
  right: 24px;
  font-weight: bold;
  padding: 12px 0 12px 0;
}

.notify-icon {
  background: url('../../assets/icon/Sprites.64af8f61.svg') no-repeat -257px -32px;
  width: 22px;
  height: 21px;
  cursor: pointer;
  margin-right: 16px;
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
  background: url('../../assets/icon/Sprites.64af8f61.svg') no-repeat -948px -366px;
  width: 8px;
  height: 5px;
  cursor: pointer;
}
</style>
