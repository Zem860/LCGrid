import { toRaw } from "vue";
import FakeBackend from "../../FakeBackend/FakeBackend";

const { ref,computed } = Vue;

export default {
  components: {},
  emits: ["hidden"],
  props: {
    modalSize: {
      type: String,
      validator(value, props) {
        return ["modal-sm", "modal-lg", "modal-xl"].includes(value);
      },
    },
    closeText: {
      type: String,
      default: "取消",
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const warningModalData = ref();
    const show = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    const confirmDelete = (targets)=>{
      FakeBackend.Delete(toRaw(targets.value))
      hide();
    }

 
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
    
    return { visible, show, hide,confirmDelete, dialogWidth, warningModalData };
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
                <slot name="body" :warningModelData=warningModelData></slot>
                <template #footer>
                 <slot name="footer"></slot>
                </template>
            </modal>
        </div>
    `,
};
