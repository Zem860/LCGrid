import './styles.scss';
import {LcGridVue, LcColumn} from './components/LcGridVue/LcGridVue.js';
import LcModal from './components/LcModal/LcModal.js';
import LcDatepicker from './components/LcDatepicker/LcDatepicker.js';
import FakeBackend from './FakeBackend/FakeBackend.js';
import test from './components/Test/test.js';
// test引入近來
const {
  createApp,
  ref,
  onMounted,
  watch
} = Vue;

const app = createApp({
  components: {
    LcGridVue,
    LcColumn,
    LcModal,
    LcDatepicker,
    test
    // 需要註冊成元件
  },
  setup() {
    const grid = ref(null);
    const modalData  = ref({})
    const modalRef = ref(null)

    const deleteItems = () => {
      const selectedItem = grid.value.getSelected().map(_ => _.ReceNo)
      const messageReceNos = selectedItem.join('、');
      alert('刪除文號:' + messageReceNos);
    }

    const exportList = () =>{
      alert('匯出');
    }
    const changeUser = () =>{
      alert('異動承辦人');
    }
    const openModal = (doc)=>{
      modalData.value = {...doc}
      modalRef.value.show()
    }
    // lcmodal-->ref-->show-->index.html-->ref-->index.jsmodalopen = =lll
    //index自己有一層js主要是控制這層但是資料還是綁在modal上面所以這裡就是操作資料要在本來的畫面做處理
    const modalSave = () =>{ 
      modalRef.value.save(modalData.value)
      grid.value.query(true) //把分頁重設回第 1 頁，清除所有勾選項目
    }

    const onModalHidden = ()=>{
      modalData.value = {}
    }

    return {
      deleteItems,
      exportList,
      changeUser,
      openModal,
      onModalHidden,
      modalSave,
      test,
      modalRef,
      modalData,
      grid,
    };
  },
});
app.mount('#app')
