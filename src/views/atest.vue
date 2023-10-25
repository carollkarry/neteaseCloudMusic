<template>
 我是a组件
 <div class="bak">
   <slot ></slot>
 </div>


</template>

<script>
export default {
  name: "atest"
}
</script>

<style scoped>
.bak{
  background-color: #42b983;
}
</style>