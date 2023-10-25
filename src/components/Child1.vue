<template>
  <el-dialog title="添加货物" :visible.sync="dialogFormVisible" width="500px">
    <el-form :model="form">
      <el-form-item label="货物名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" style="width: 218px"></el-input>
      </el-form-item>
      <el-form-item label="货物产地" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="setGoods()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Child1",
  data(){
    return{
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    init(){
      console.log("子组件")
    },
    showDialog(){
      this.dialogFormVisible=true;
      console.log("dialog")
    },
    setGoods(){
      this.$emit('children',this.form);
      this.dialogFormVisible=false;
    }
  }
}
</script>

<style scoped>

</style>