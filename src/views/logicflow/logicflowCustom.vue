<template>
  <div class="flowCanvas">
    <div class="container" ref="container"></div>
    <!-- 节点面板 -->
    <CustomNodePanel v-if="lf" :lf="lf"></CustomNodePanel>
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
      <div>节点名称: {{ currentNode.data.text ? currentNode.data.text.value : '没有配置节点text值' }}</div>
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
import CustomNodePanel from "./components/CustomNodePanel.vue";
import BpmnDataPanel from "./components/BpnmDataPanel.vue";

export default {
  name: "logicflowCustom",
  data() {
    return {
      lf: null,
      drawer: false,
      currentNode: null,
    };
  },
  components: { CustomNodePanel, BpmnDataPanel },

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