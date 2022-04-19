<template>
  <div class="node-panel">
    <div class="node-item" @mousedown="openSelection()">
      <div class="node-item-icon selection"></div>
      <span class="node-label">选区</span>
    </div>
    <div class="node-item" @mousedown="addStartNode()">
      <div class="node-item-icon start"></div>
      <span class="node-label">开始节点</span>
    </div>
    <div class="node-item" @mousedown="addGeneralNode()">
      <div class="node-item-icon general"></div>
      <span class="node-label">普通节点</span>
    </div>
    <div class="node-item" @mousedown="addConditionNode()">
      <div class="node-item-icon condition"></div>
      <span class="node-label">条件节点</span>
    </div>
    <div class="node-item" @mousedown="addHtmlNode()">
      <div class="node-item-icon html"></div>
      <span class="node-label">Html节点</span>
    </div>
    <div class="node-item" @mousedown="addEndNode()">
      <div class="node-item-icon end"></div>
      <span class="node-label">结束节点</span>
    </div>
  </div>
</template>
<script lang="ts">
import LogicFlow from "@logicflow/core";
//注册节点
import CustomRect from "../registerNode/CustomRect";
import CustomPolygon from "../registerNode/CustomPolygon";
import CustomStart from "../registerNode/CustomStart";
import CustomEnd from "../registerNode/CustomEnd";
import CustomHtml from "../registerNode/CustomHtml";

//UI组件
import { ElMessage } from "element-plus";

export default {
  name: "CustomNodePanel",
  data() {
    return {};
  },
  props: {
    lf: Object,
  },

  mounted() {
    //框选使用
    let lf = this.$props.lf as LogicFlow;
    lf &&
      lf.on("selection:selected", () => {
        lf.updateEditConfig({
          stopMoveGraph: false,
        });
      });
    //注册节点
    this.registerNode();
  },
  methods: {
    registerNode() {
      let that = this;
      let lf = this.$props.lf as LogicFlow;
      lf.register(CustomRect);
      lf.register(CustomPolygon);
      lf.register(CustomStart);
      lf.register(CustomEnd);
      lf.register(CustomHtml);

      //注册非业务事件，业务事件需要放在上一层
      lf.on("connection:not-allowed", (data) => {
        ElMessage({
          type: "error",
          message: data.msg,
        });
      });

      lf.on("custom:button-click", (model) => {
        console.log('custom:button-click')
        lf.setProperties(model.id, {
          body: "LogicFlow",
        });
      });
    },
    openSelection() {
      (this.$props.lf as LogicFlow).updateEditConfig({
        stopMoveGraph: true,
      });
    },
    addStartNode() {
      (this.$props.lf as LogicFlow).dnd.startDrag({
        type: "CustomStart",
        text: "开始",
        properties: { start: "开始" }, //自定义属性，同时导出的文件节点属性上会生成
      });
    },
    addGeneralNode() {
      (this.$props.lf as LogicFlow).dnd.startDrag({
        type: "CustomRect",
        text: "普通节点",
        properties: { CustomRect: "矩形" }, //自定义属性，同时导出的文件节点属性上会生成
      });
    },
    addConditionNode() {
      (this.$props.lf as LogicFlow).dnd.startDrag({
        type: "CustomaPolygon",
        text: "条件节点",
      });
    },
    addHtmlNode() {
      (this.$props.lf as LogicFlow).dnd.startDrag({
        type: "CustomHtml",
        text: "",
        properties: {text: "点击修改标题" },
      });
    },
    addEndNode() {
      (this.$props.lf as LogicFlow).dnd.startDrag({
        type: "CustomEnd",
        text: "结束节点",
      });
    },
  },
};
</script>
<style>
.node-panel {
  position: absolute;
  top: 100px;
  left: 10px;
  width: 50px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
}
.node-item {
  margin-bottom: 10px;
}
.node-item-icon {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}

.selection {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=)
    center center no-repeat;
  cursor: grab;
}

.start {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==)
    center center no-repeat;
  cursor: grab;
}
.end {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC)
    center center no-repeat;
  cursor: grab;
}
.general {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAIlJREFUOE9jZKAyYKSyeQxgA7Xa/pv/+8/gSYnhzIwMq65WMV5jVJn0n531G8Mxhv8MRpQYyMDAcOszO4MBo0b7fwdGBob9//8xNDIwMRwgy9B/DA6MTAz1/xkYHFEMvFHN2ECOgRqt/xtGDYREymgYEp2ChnCyoUrWo3rhQPXii+ioJFIh1UtsAJK4mqGHZK9YAAAAAElFTkSuQmCC)
    center center no-repeat;
  cursor: grab;
}
.html {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAZpJREFUOE/F1D1Lw1AYBeBzxEXcHPRaKjg6ibtDEcTNrVbcdFURBDvZxJKkIIJLEZwUFERoEdwdBPUP6KCzLr1VhG46aF5JbUJsm35AwYzJvQ/nPTcJ0eOLPfbwv6AyZRd9ONVZPkZN1nHCmCHTLnDnAlOvNu+7AlVGsiAS2uaMv1GZkoaLtHY4rAy5BnGrLZr1cEPCGrYDIqUtFv0No4ZcCvChbS4pUxYgKIDY1xa3wugfMAqLb8rA1yDKAmyWHR55QAg91BZXfTQAozBv4UhGZklc0cV4KcfnUA2/SQUn2uGyd78KtsKqzw3xukpqm5P1nQVJgYK2ueiDXmfeQfzpLUhiyA0ED9rheguwqG2mwiPvgUjXo/GsDH19451EsmTxIgyG0lWxYOQgSUYOQKyF0RFT5umi+NkPVcmy0tAfEGANYK3PYxArPqpMyYtgomxzrh3WFKwdwrl3Ft6LrQx5InBWsumEOr0G8OaPGfke1hce25Yxtw8vdJEo5XjTyZ+p7besMpLXDjc6wSJH7nRzs3VtE3aL9xz8Abf1vRWPrKqXAAAAAElFTkSuQmCC)
    center center no-repeat;
  cursor: grab;
}

.condition {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAALdJREFUOE+11NERgyAMANBkCxbTabwWPadpF2OL9EBBLZBERX7h3iUhCULjgxrPvKjz79yEX+m9CAaM4BMghF5CWTBhBOMKviW0Cu4xN6P1oBnIAgKLFsESFmsnoRnIYRr0AO4w62Zc6lY5tUgTeAbjIg2gJk1tpM+AV6Ms1bH2KWPsPW2q8d2zbZN+L84vQdY+ZiA/KX5iinOtGb2EStiyP7jm3SK9vxyy9FusrwPaasFKG/r//gdxhLQV5onRWwAAAABJRU5ErkJggg==)
    center center no-repeat;
  cursor: grab;
}


/*******************纯html格式的样式****************/

.lf-html-wrapper {
  width:100px;
  height:100px;
}
.lf-html-wrapper .custom-html {
  width:96px;
  height:96px;
  border:2px solid #2987ff;
}

.lf-html-wrapper .custom-head {
  color:red;
  height:26px;
  line-height:26px;
}

.lf-html-wrapper .custom-body {
  color:#2987ff;
  height:50px;
  line-height:50px;
}


</style>
