<template>
  <div class="data-panel">
    <div class="data-item" @mousedown="downloadXml()" title="下载XML格式数据">
      <div class="data-item-icon bpmn-xml"></div>
    </div>
    <div class="data-item" @mousedown="downloadImage()" title="下载图片格式数据">
      <div class="data-item-icon bpmn-img"></div>
    </div>
    <div class="data-item">
      <input type="file" className="data-upload" @change="uploadXml($event)" title="上传XML格式数据"/>
      <div class="data-item-icon bpmn-upload"></div>
    </div>
    <div class="data-item" @mousedown="getGraphRawData()" title="下载JSON格式数据" >
      <div class="data-item-icon bpmn-look"></div>
    </div>
  </div>
</template>
<script lang="ts">
import LogicFlow from '@logicflow/core';

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function isJSON(str:string) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("error：" + str + "!!!" + e);
      return false;
    }
  }
  //console.log("It is not a string!");
}

type FileEventTarget = EventTarget & { files: FileList };

export default {
  name: "BpmnDataPanel",
  data() {
    return {};
  },
  props: {
    lf: Object,
  },

  mounted() {},

  methods: {
    downloadXml() {
      const data = (this.$props.lf as LogicFlow).getGraphData() as string;
      download("logic-flow.xml", data);
    },
    downloadImage() {
      (this.$props.lf as LogicFlow).getSnapshot();
    },
    uploadXml(ev: Event) {
      const file = (ev.target as FileEventTarget).files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          let data = event.target.result as string;
          /* 这里JSON无法解析，只有XML可以载入？？
          if (isJSON(data)) {
            data = JSON.parse(data);
          }
          */
          (this.$props.lf as LogicFlow).render(data);
        }
      };
      reader.readAsText(file); // you could also read images and other binaries
    },
    getGraphRawData() {
      const data = JSON.stringify((this.$props.lf as LogicFlow).getGraphRawData());
      download("logic-flow.txt", data);
    },
  },
};
</script>
<style>
.data-panel {
  position: absolute;
  bottom: 10px;
  left: 10px;
  height: 20px;
  width: auto;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
}
.data-item {
  margin: 0px 5px;
  display: inline-block;
  position: relative;
}
.data-item-icon {
  width: 20px;
  height: 20px;
  background-size: cover;
}
.data-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}

.data-upload {
  opacity: 0;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  right: 0;
}

.bpmn-xml {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABqUlEQVQ4T92Uv0tbURTHPyevUwc3qUshU/8DBzOYmwiFDlK6dHKwVHBwUKjUoleS4Ku0UkEHB6HSDp1cpHRwSnKz1KH/QaeAS0txcXDy5ciNL5LEF4k/oOBZHvfdcz/33O/53ivccUgvnrFaBAo95ksuFD9/Kf4LMOdCcb4UY9UAVeBWFd5XoHmnaQIKCOm21nnNko7c1LQZSp2IkvsgdT+86PLYoj6KUvzp8sGvIGCiXJLf/v9YQZ9EEd+A4fa8oMFQeVX+dgD9IG8134CvwGMV1morspDkteyyfhTlLXCYgslKKJVW3iUfxlV46Aiw40KZaocaq5+B18BBEDDZqv4CmLO6pnDS7vzxoj48PuWLwEuU7ymY8QsasIXwXGF34AGvfhTlpAUatfo0BRkxVhVwLpRc9/GM1U/AG4WfsT4ZYN2FMp+Q6w1vrgTGt2MW2IgBcy6UzSRdjdX+gH5xdlGf+W9tVfaTYPHG/QN7QbqadQ7MWj0S5ZiIXMuc/QA6YOeXoqrCgNfwqnfvuuxS04fZJd0W4QUweF1CnP9Plb3ae5nu+cDeEMwZu/TFGsleoRIAAAAASUVORK5CYII=)
    center center no-repeat;
  cursor: grab;
}

.bpmn-img {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAB80lEQVQ4T62SP2hTURTGf997Qx1F1EFQ61DpWAcHhyY3zrpp0EEoaEGnuta80MSXttBRhw4W2iC6xEWdCsJ7qf/G6uCgg3TQRaE6OEmSI+/ZFBJjU9p804V7z+9+55xPDFgaMA+5wC5g3EcM7xP+AXiiXGCPDD4B9X0CncRk4jCSKEWhUqALzJlxOTlL1OKK4t18lNQBUQfQzdhBmkTAe8Fvg7P45OKyfvaD9gRmC3ZVHnNxqFMJIBtY1ROrUajH/YC5omXNiDsd3rExPNbNyEt8B57TYjye07s9AdMZFm0RYyIFiJU41K1esLRFn1dxWY3kvqfDduH4tB1Jzi/nlbjsUCawEQ8WgBHE5yGPidWyNncEZgp23BPX8VmKy/rSJrqi3cSYB576PgutJsst+GVwwxcn/pnhlvW8GRXgq8FpjNv1WdVcYDXgksRUFOpe8vZ8wU62xAowJDG9DQTK33zeHG2mrUxhFONZVVzBAkQI/ACa5pGv31USq225kh22BlXBMWAs3XIC5O9cDpm4Vg/1tl2RLdo5jBeCTYkrUajX3XN1M3aAJg/TDraADrEUh5r8XzxcwZ4hLgpGo4o+dr/rXsqD3YQ3U7Qza6HWe33aAaRFFY+NfuHd8b7FMB7LciUbpcEakGZvzzI2ULqcwWrgwD/S1/2fF41d/wAAAABJRU5ErkJggg==)
    center center no-repeat;
  cursor: grab;
}

.bpmn-upload {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAPpJREFUOE/t1MERgjAQBdC/XWTGDtAOPNmDUIQ1GEVjDRYh9uDJDtQOnNmjHawTDBgQCDoczY2BffPZTUIYeNHAHnqBSssdwIMNjUMBgqDScgAQOyhjQ0kX2gl62NUhNmEn2gqWGCGBYJGDhD0ENnEr2gj6GG8pU1pO1mNDM7WSuAttAwWExGIW8sH82aFs6KM+OJQm8OehFIX1hH+w0oFyKCqViFO6NfUnn6rdNm7q9W/82jeo5QLBkXeUhs6r/14tJQVhzoYmr73vltIiEGx+BNfFnvRBe6OcIWj87dbUhAjAlA2NqglddADBK6qGX/1W9Top3/R0cPAJtuF4FVy0lcoAAAAASUVORK5CYII=)
    center center no-repeat;
  cursor: grab;
}

.bpmn-look {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAnRJREFUOE+tlD9oU1EUh7/TF2qjHVSkeZUOIkqlLe3goIuiiyJUFKTVUR0ERYdCUSlJfSahqBQ6KAoO6qgGQbEguih10cGhpS2KIg7F3hRRh2pqycuRmyZpkv5JBe947znfPb97zu8K/3lJJd4mT2tmYLONq4HPXzyZWS5nUeCWc7pqeh0DKLuB5jLAGMJQ7Q+6Pl2XP+XwBcBQrx4V5TYwC1wVZcTPMGwTnSraVGgFLgDVKpxKRuVBMbQEGIroDoE3wOuAw+EJT74vJq/B0/Vpn8fALoWdyZi8zcfNAz0NuD4TwDMTkxOV3taeuxG9CxwwDg14krZ7BaDbq/0oRzRFS7Jffq0EGOrWNRJkFOGRiUp3KTCi74E7JibXVgLLx7gRPQ+cNDHZVgA2dGkwXctvVQ4m4zJYDHTDusfE5VUB0KsdKA9R9tr9UFjbRXgamGb1xICkspLrerS1ymE47bPxW59MFpLD6iFcAhImJp3uPOyyiYtn4zb0aH3A4WvGp22qT0ayQNfTJnzGMj7uVJ8ks3t5mNCZrQgSgK2uAMsVE6pyMDg0G0/Gs8CsG3xSouyfjMsLKxPhJUKniUpiscryKurDuk+F5zUOQeui+S5HdBS4Z2LS/49Nsd09bmLSUj42N1E6Ag6NSw10+UW5Af+AkDBROVMCzPp3LVPAsImJ9XDF5UZ0CGir/Uld3tel1pvz8X0rXVOcXWrAcwN9w0pV4Vixnxd+DnN+fgKkgFuqjPsZ3uU+h+0iNAGngaDCoWIfl0gu0Wd9neEKSjvQWKbdvtmgqeJi3r/F5xU/WOui2SBbbVJ1io/WDcs9bkVgxc6UBfwFYNYAJBo0vLQAAAAASUVORK5CYII=)
    center center no-repeat;
  cursor: grab;
}
</style>
