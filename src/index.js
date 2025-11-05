import "./styles.scss";
import { LcGridVue, LcColumn } from "./components/LcGridVue/LcGridVue.js";
import LcModal from "./components/LcModal/LcModal.js";
import LcDatepicker from "./components/LcDatepicker/LcDatepicker.js";
import FakeBackend from "./FakeBackend/FakeBackend.js";
import WarningModal from "./components/LcModal/WarningModal.js";
import { warn } from "vue";
const { createApp, ref, onMounted, watch, toRaw } = Vue;

const app = createApp({
  components: {
    LcGridVue,
    LcColumn,
    LcModal,
    LcDatepicker,
    WarningModal,
    // 需要註冊成元件
  },
  setup() {
    const grid = ref(null);
    const modalData = ref({});
    const modalRef = ref(null);
    const mode = ref("create");
    const warningModalRef = ref(null);
    const warningModalData = ref(null);

    const switchColor = (d)=>{
      const today = dayjs()
      const dueDay = dayjs(d)
      const tenDaysBeforeDue = dueDay.subtract(10, 'day')
      let color = ""
      if (dueDay.isBefore(today, 'day')){
        color = "text-danger"
      } else if (dueDay.isSame(today, 'day')){
        color = "text-success"
      } else if (today.isBefore(dueDay, 'day') && today.isAfter(tenDaysBeforeDue, 'day')){
        return "text-primary"
      }
      return color
    }

    const deleteItems = () => {
      const selectedItem = grid.value.getSelected().map((_) => _.ReceNo);
      if (selectedItem.length === 0) {
        alert("請選取欲刪除資料");
      } else {
        const messageReceNos = selectedItem.join("、");
        const deletecase = messageReceNos.split("、");
        console.log(deletecase);
        warningModalData.value = deletecase;
        openWarningModal();
      }
    };

    const deleteCases = () => {
      warningModalRef.value.confirmDelete(warningModalData);
      grid.value.query(true); //把分頁重設回第 1 頁，清除所有勾選項目
    };

    const exportList = () => {
      alert("匯出");
    };
    const changeUser = () => {
      alert("異動承辦人");
    };
    const openModal = ({ item, action }) => {
      modalData.value = {};
      mode.value = action;
      if (mode.value === "edit" || mode.value === "review") {
        const data = FakeBackend.Get(item.SN);
        modalData.value = data;
      } else {
        modalData.value = {};
      }
      modalRef.value.show(mode);
      //測試目前只丟標題
    };
    // lcmodal-->ref-->show-->index.html-->ref-->index.jsmodalopen = =lll
    //index自己有一層js主要是控制這層但是資料還是綁在modal上面所以這裡就是操作資料要在本來的畫面做處理
    const modalSave = () => {
      modalRef.value.save(mode.value, modalData.value);
      grid.value.queryAll();
    };

    const openWarningModal = () => {
      warningModalRef.value.show();
    };

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
      deleteCases,
      switchColor,
      modalRef,
      modalData,
      grid,
      warningModalRef,
      warningModalData,
      mode
    };
  },
});
app.mount("#app");
