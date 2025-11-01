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

    const onModalHidden = ()=>{
      modalData.value = {}
    }

    return {
      deleteItems,
      exportList,
      changeUser,
      openModal,
      onModalHidden,
      test,
      modalRef,
      modalData,
      grid,
    };
  },
});
app.mount('#app')
