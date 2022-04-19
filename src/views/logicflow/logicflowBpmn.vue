<template>
  <div class="flowCanvas">
    <div class="container" ref="container"></div>
    <!-- 节点面板 -->
    <BpmnNodePanel v-if="lf" :lf="lf"></BpmnNodePanel>
    <!-- 数据面板 -->
    <BpmnDataPanel v-if="lf" :lf="lf"></BpmnDataPanel>
    <!-- 弹窗编辑 -->
    <el-drawer
      title="编辑节点"
      :modal="false"
      v-model="drawer"
      :direction="'rtl'"
    >
      <div>节点ID: {{ currentNode.data.id }}</div>
      <div>节点名称: {{ currentNode.data.text.value }}</div>
    </el-drawer>
  </div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import {
  BpmnElement,
  BpmnXmlAdapter,
  Snapshot,
  Control,
  Menu,
  SelectionSelect,
} from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
import BpmnNodePanel from "./components/BpmnNodePanel.vue";
import BpmnDataPanel from "./components/BpnmDataPanel.vue";

export default {
  name: "logicflowBpmn",
  data() {
    return {
      lf: null,
      drawer: false,
      currentNode: null,
    };
  },
  components: { BpmnNodePanel, BpmnDataPanel },

  mounted() {
    LogicFlow.use(BpmnElement);
    LogicFlow.use(BpmnXmlAdapter);
    LogicFlow.use(Snapshot);
    LogicFlow.use(Control);
    LogicFlow.use(Menu);
    LogicFlow.use(SelectionSelect);
    //初始化
    this.lf = new LogicFlow({
      container: this.$refs.container,
      grid: {
        size: 10,
        visible: true,
        type: "mesh",
        config: {
          color: "#ababab",
          thickness: 1,
        },
      },
      keyboard: {
        enabled: true,
      },
    });
    this.lf.render();
    //绑定事件
    const { eventCenter } = this.lf.graphModel;
    this.bindEvent(eventCenter);
  },

  methods: {
    bindEvent(eventCenter) {
      eventCenter.on("node:click", (args) => {
        console.log("节点单击", args);
        this.drawer = true;
        this.currentNode = args;
      });
    },

    handleClose(done) {
      done();
    },
  },
};
</script>

<style>
.flowCanvas {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0px;
  display: flex;
}
.flowCanvas .container {
  display: flex;
  flex-grow: 1; /*铺满剩余空间*/
  border: 3px solid #ababab;
  overflow: hidden;
}
</style>