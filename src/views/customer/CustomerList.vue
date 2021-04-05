<template>
  <div>
    <div class="page-title">
      <div class="page-left">Danh sách khách hàng</div>
      <div class="page-right">
        <button
          id="btnAdd"
          class="btn-default btn-icon"
          @click="btnAddOnClick()"
        >
          Thêm khách hàng
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 264px"
        placeholder="Tìm kiếm theo mã, tên khách hàng"
      />
      <button class="btn-refresh"></button>
      <button class="btn-delete"></button>
    </div>
    <div class="grid">
      <table id="tblListCustomer" class="table" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã khách hàng</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Nhóm khách hàng</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th class="text-align-right">Số tiền nợ</th>
            <th class="text-align-center">Đang hoạt động</th>
          </tr>
        </thead>
        <tbody>
          <tr @dblclick="trOnDblClick()">
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
            <td>ex</td>
            <td class="text-align-right">1.025.000</td>
            <td class="text-align-center"><input type="checkbox" checked /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging">
      <div data-v-a72348a4="" class="paging-bar">
        <div data-v-a72348a4="" class="paging-record-info">
          Hiển thị <b data-v-a72348a4="">1-10/1000</b> khách hàng
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
          <b data-v-a72348a4="">10</b> khách hàng/trang
        </div>
      </div>
    </div>
    <CustomerDetail
      :isShow="isShowDialogDetail"
      :formMode="dialogFormMode"
      @hideDialog="hideDialog"
    ></CustomerDetail>
  </div>
</template>
<script>
import CustomerDetail from './CustomerDetail.vue';
export default {
  components: {
    CustomerDetail,
  },
  created() {},
  props: [],
  methods: {
    /**
     * Hiển thị dialog
     */
    btnAddOnClick() {
      this.isShowDialogDetail = true;
    },
    /**
     * Ẩn dialog
     */
    hideDialog() {
      this.isShowDialogDetail = false;
    },
    trOnDblClick() {
      this.dialogFormMode = 'edit';
      this.isShowDialogDetail = true;
    },
  },
  data() {
    return {
      dialogFormMode: 'add',
      isShowDialogDetail: false,
    };
  },
  watch: {},
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
