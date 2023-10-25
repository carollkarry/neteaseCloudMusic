<template>
  <div class="son">
    <h3>子组件</h3>
    <p>{{ info }}</p>
  </div>
  <div class="emit-container">
    <input @click="add" type="button" value="点击累加">
  </div>
</template>

<script>
export default {
  name: "son",
  props:['info','skill','food'],
  methods:{
    add(){
      this.$emit('add');
    }
  }
}
</script>

<style scoped>
.son {
  border: 3px solid hotpink;
  width: 300px;
  height: 300px;
  background-color: orange;
}
</style>