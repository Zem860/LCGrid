import "./styles.scss";
import { LcGridVue, LcColumn } from "./components/LcGridVue/LcGridVue.js";
import LcModal from "./components/LcModal/LcModal.js";
import LcDatepicker from "./components/LcDatepicker/LcDatepicker.js";
import FakeBackend from "./FakeBackend/FakeBackend.js";

const { createApp, ref, onMounted, watch } = Vue;

const app = createApp({
  components: {
    LcGridVue,
    LcColumn,
    LcModal,
    LcDatepicker,
  },
  setup() {
    const grid = ref(null);
    const modalData = ref({});
    const modalRef = ref(null);

    const deleteItems = () => {
      const selectedItem = grid.value.getSelected().map((_) => _.ReceNo);
      const messageReceNos = selectedItem.join("、");
      alert("刪除文號:" + messageReceNos);
    };

    const exportList = () => {
      alert("匯出");
    };
    const changeUser = () => {
      alert("異動承辦人");
    };
    const openModal = (doc) => {
      modalData.value = { ...doc };
      modalRef.value.show();
    };
    const saveModal = () => {
      const {User, ReceNo} = {...modalData.value};
      const i = 101; // 假設新增的ID是101
      // FakeBackend.GetList();
      const dataStructure = {
        SN: i + 1,
        ReceNo: `11201010000${i.toString().padStart(2, '0')}`,
        CaseNo: `K000${i.toString().padStart(2, '0')}`,
        ComeDate: dayjs().add(i, 'day').toDate(),
        ReceDate: dayjs().add(i - 60, 'day').toDate(),
        FinalDate: dayjs().add(i - 30, 'day').toDate(),
        User: `${User}`,
      }
      FakeBackend.Create(dataStructure);
        // 排序最新在前＋跳回第 1 頁
      grid.value.searchData.sortField = 'SN';
      grid.value.searchData.sortAction = 'DESC';
      grid.value.searchData.nowPage = 1;
      grid.value.query();
      modalRef.value.hide();
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
      saveModal,

      modalRef,
      modalData,
      grid,
    };
  },
});
app.mount("#app");
