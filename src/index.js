import "./styles.scss";
import { LcGridVue, LcColumn } from "./components/LcGridVue/LcGridVue.js";
import LcModal from "./components/LcModal/LcModal.js";
import LcDatepicker from "./components/LcDatepicker/LcDatepicker.js";
import FakeBackend from "./FakeBackend/FakeBackend.js";
import test from "./components/Test/test.js";
import WarningModal from "./components/LcModal/WarningModal.js";
import { warn } from "vue";
// test引入近來
const { createApp, ref, onMounted, watch, toRaw } = Vue;

const app = createApp({
  components: {
    LcGridVue,
    LcColumn,
    LcModal,
    LcDatepicker,
    WarningModal,
    test,
    // 需要註冊成元件
  },
  setup() {
    const grid = ref(null);
    const modalData = ref({});
    const modalRef = ref(null);
    const editModalRef = ref(null);
    const editData = ref({});
    const mode = ref("create");
    const warningModalRef = ref(null)
    const warningModalData = ref(null)

    const deleteItems = () => {
      const selectedItem = grid.value.getSelected().map((_) => _.ReceNo);
      if (selectedItem.length === 0) {
        alert("請選取欲刪除資料");
      } else {

        const messageReceNos = selectedItem.join("、");
        const deletecase = messageReceNos.split("、");
        console.log(deletecase)
        warningModalData.value = deletecase
        openWarningModal();
      }
    };

    const deleteCases = () => {
      warningModalRef.value.confirmDelete(warningModalData);
      grid.value.query(true); //把分頁重設回第 1 頁，清除所有勾選項目
    }

    const exportList = () => {
      alert("匯出");
    };
    const changeUser = () => {
      alert("異動承辦人");
    };
    const openModal = (doc) => {
      mode.value = "create";
      modalData.value = { ...doc };
      modalRef.value.show();
    };

    const openEditModal = (item) => {
      mode.value = "edit";

      const data = FakeBackend.Get(item.SN);
      editData.value = data;
      editModalRef.value.show();
    };
    // lcmodal-->ref-->show-->index.html-->ref-->index.jsmodalopen = =lll
    //index自己有一層js主要是控制這層但是資料還是綁在modal上面所以這裡就是操作資料要在本來的畫面做處理
    const modalSave = () => {
      switch (mode.value) {
        case "edit":
          editModalRef.value.save(mode.value, editData.value);
          break;
        case "create":
          modalRef.value.save(mode.value, modalData.value);
          break;
        default:
          console.log("default甚麼都會做")
      }
      grid.value.query(true); //把分頁重設回第 1 頁，清除所有勾選項目
    };


    const openWarningModal = () => {
      warningModalRef.value.show();
    }

    const onModalHidden = () => {
      modalData.value = {};
    };

    return {
      deleteItems,
      exportList,
      changeUser,
      openModal,
      onModalHidden,
      modalSave,
      openEditModal,
      deleteCases,
      test,
      modalRef,
      modalData,
      grid,
      editModalRef,
      editData,
      warningModalRef,
      warningModalData
    };
  },
});
app.mount("#app");
