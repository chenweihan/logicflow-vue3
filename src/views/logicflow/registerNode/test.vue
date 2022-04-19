<template>
  <Html :name="name" @changeData="changeData"></Html>
</template>

<script lang="ts">
import Html from "./Html.vue";
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  components: { Html },
  setup: () => {
    return {
      name: "test",
      changeData: (value: any) => {
        console.log("changeData", value);
      },
    };
  },
});
</script>

<style scoped>
</style>
