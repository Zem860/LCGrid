import FakeBackend from "../../FakeBackend/FakeBackend";

const { ref, computed } = Vue;

export default {
  components: {},
  props: {
    modalSize: {
      type: String,
      validator(value) {
        return ["modal-sm", "modal-lg", "modal-xl"].includes(value);
      },
    },
  },
  setup(props) {
    const visible = ref(false);
    const noticeModalData = ref();
    const show = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    const confirmDelete = (targets) => {
      FakeBackend.Delete(targets.value);
      alert("刪除人員成功!!!");
      hide();
    };

    const dialogWidth = computed(() => {
      // 仿照Bootstrap Modal Size
      switch (props.modalSize) {
        case "modal-sm":
          return "300px";
        case "modal-lg":
          return "800px";
        case "modal-xl":
          return "1140px";
        default:
          return "500px";
      }
    });

    return {
      visible,
      show,
      hide,
      confirmDelete,
      dialogWidth,
      noticeModalData,
    };
  },

  template: `  
    <div>
            <modal
                v-model:visible="visible"
                modal
                :draggable="false"
                :style="{ width: dialogWidth }"
                :pt="{
                    header: 'border-bottom',
                    content: 'p-3',
                    footer: 'border-top p-3'
                }">
                <template #header>
                    <slot name="header"></slot>
                </template>
                <slot name="body" :noticeModalData=noticeModalData></slot>
                <template #footer>
                 <slot name="footer" :hide="hide"></slot>
                </template>
            </modal>
        </div>
    `,
};
