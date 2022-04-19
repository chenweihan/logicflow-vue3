import { HtmlNode, HtmlNodeModel, h as lfh } from "@logicflow/core";
import { createApp, h } from 'vue'
import Html from './Html.vue'

// 提供节点的dom
class CustomHtmlNode extends HtmlNode {

    /*Vue组件*/
    setHtml(rootEl){
        console.log('setHtml');
        const { properties } = this.props.model;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
        /**挂载-Vue3组件**/
        //createApp(Html).mount(el)
        createApp({
            render: function () {
                return h(Html, {
                    name: 'test',
                    //https://v3.cn.vuejs.org/guide/render-function.html#v-on
                    'onChangeData': (value) => {
                        console.log('changeData', value)
                    }

                })
            }
        }).mount(el)
    }

    /* 纯HTML*/
    /*
    setHtml(rootEl) {
        const { properties } = this.props.model;
        const el = document.createElement('div');
        el.className = 'lf-html-wrapper';
        const html = `
                        <div class="custom-html">
                            <div class="custom-head">HTML</div>
                            <div class="custom-body">
                              <div>${properties.text}</div>
                            </div>
                        </div>
                    `
        el.innerHTML = html;
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
    }
    */

}

// 提供节点的样式
class CustomHtmlNodeModel extends HtmlNodeModel {

    getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = '#2987ff';
        style.fill = 'transparent';
        style.strokeWidth = 2;
        return style;
    }

    initNodeData(data) {
        super.initNodeData(data);
        data.text.editable = false; // 禁止节点文本编辑
        const width = 100;
        const height = 100;
        this.width = width;
        this.height = height;
        this.anchorsOffset = [
            [width / 2, 0],
            [0, height / 2],
            [-width / 2, 0],
            [0, -height / 2],
        ]
    }

    /*
    setAttributes() {
        this.text.editable = false; // 禁止节点文本编辑
        const width = 100;
        const height = 80;
        this.width = width;
        this.height = height;
        this.anchorsOffset = [
            [width / 2, 0],
            [0, height / 2],
            [-width / 2, 0],
            [0, -height / 2],
        ]
    }
    */
}

export default {
    type: "CustomHtml",
    view: CustomHtmlNode,
    model: CustomHtmlNodeModel
}