<template>
  <div class="lf-html-wrapper">
    <div class="custom-html">
      <div class="custom-head">{{ title }}</div>
      <div class="custom-body">
        <button @mousedown.stop="changeData()">修改标题</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Html",
  props:{
    name:{
      type:String,
      default:()=>{return}
    }
  },
  setup: (props, context) => {
    const {emit}=context;
    let title = ref<string>("标题HTML");
    
    console.log(props);

    const changeData = () => {
      title.value = "标题hello-world";
      emit('changeData',title.value)
    };
    return {
      title,
      changeData,
    };
  },
});
</script>

<style scoped>
.lf-html-wrapper .custom-html {
  width: 96px;
  height: 96px;
  border: 2px solid #2987ff;
}

.lf-html-wrapper .custom-head {
  color: red;
  height: 26px;
  line-height: 26px;
}

.lf-html-wrapper .custom-body {
  color: #2987ff;
  height: 50px;
  line-height: 50px;
}
</style>
