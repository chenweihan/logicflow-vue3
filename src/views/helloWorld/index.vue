<template>
  <img alt="Vue logo" src="../../assets/logo.png" />
  <h1> Vue 3 + TypeScript + Vite + LogicFlow </h1>

  <p style="width:600px;margin:auto">
    LogicFlow 是一款流程图编辑框架，提供了一系列流程图交互、编辑所必需的功能和灵活的节点自定义、插件等拓展机制。LogicFlow支持前端研发自定义开发各种逻辑编排场景，如流程图、ER图、BPMN流程等。在工作审批配置、机器人逻辑编排、无代码平台流程配置都有较好的应用。
  </p>

  <p> <img style="width:100px;" alt="Vue logo" src="../../assets/horizontal-logo.png" /></p>
  
  <p>
    See more information. <a href="http://logic-flow.org/" target="_blank">LogicFlow</a>
  </p>

  <p @click="gotoLogicflowBpmn">
    <span class="link">goto logincflow Bpmn demo</span>
  </p>
   <p @click="gotoLogicflowCustom">
    <span class="link">goto logincflow custom demo</span>
  </p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const count = ref(0);
    const router = useRouter();
    const gotoTodolist = ()=> {
      router.push('/todolist') 
    }
    const gotoLogicflowBpmn = ()=> {
      router.push('/logicflowBpmn') 
    }
    const gotoLogicflowCustom = ()=> {
      router.push('/logicflowCustom') 
    }
    return { 
      count,
      gotoTodolist,
      gotoLogicflowBpmn,
      gotoLogicflowCustom
    }
  }
})
</script>

<style scoped>
a,.link {
  color: #42b983;
  cursor: pointer;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
