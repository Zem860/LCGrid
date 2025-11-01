const { ref } = Vue

export default {
    setup() {
        const test = ref(1)
        setTimeout(()=>{
            test.value = "123456787喵"
        },5000)
        
        return { test }
    },
    // 測試vue如何渲染
    template: `<div>{{ test }}</div>`  // ← 加上 template
}
