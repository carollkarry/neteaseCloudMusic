<template>
<!--  <div class="father">-->
<!--    <h2>父组件</h2>-->
<!--    &lt;!&ndash; 01.基本使用 &ndash;&gt;-->
<!--    <son info="你好吗hhh?" skill="不,我不好" food="吃西兰花可以平复心情哦"></son>-->
<!--  </div>-->
<!--  <div>-->
<!--    &lt;!&ndash; emit基本使用 &ndash;&gt;-->
<!--    <h2>你点了:{{ num }} 次</h2>-->

<!--    <son @add="fatherAdd"></son>-->
<!--  </div>-->
<!--  <div>-->

<!--      <el-button type="primary" @click='add()'>添加</el-button>-->
<!--    <dialog ref="gds"/>-->
<!--  </div>-->
  <Child1 ref="myChild" />
  <el-button @click="add" @children="parentGoods">调用子组件方法</el-button>

  <div>
    <ul v-for="item in products" :key="item.id" class="product-ul">
      <li>商品名称：{{item.name}}</li>
      <li>商品价格：{{item.price | filterPrice}}</li>
      <li>商品详情：<a v-bind:href="item.detail | filterURL">查看详情</a></li>
    </ul>
  </div>


</template>

<script>
import son from '@/components/son'
import HelloWorld from "@/components/HelloWorld";
import atest from "@/views/atest";
import Atest from "@/views/atest";
import {byCode, sendCaptcha} from "@/plugins/loginbyPhone";
import dialog from "@/components/dialog";
import Child1 from "@/components/Child1";
export default {
  name: 'HomeView',

  data() {
    return {
      products: [
        { name: 'cpu', price: 25, detail: 'cpu' },
        { name: '硬盘', price: '', detail: 'ying' }
      ],
      user:{ name:"nanmo" },
      num:0,
      books: [
        { id: 1000, name: 'Linux编程之美', price: 60 },
        { id: 1001, name: 'Java疯狂讲义', price: 60 },
        { id: 1002, name: '深入理解计算机原理', price: 80 },
        { id: 1003, name: '操作系统', price: 30 },
        { id: 1004, name: '数据结构导论', price: 60 },
      ]
    }
  },
  filters:{
    filterPrice(price) {
      return price?('$' + price) : '--'
    },
    filterURL (val) {
      return val ? ('https://baidu.com/' + val) : '#'
    }
  },
  computed:{
  totalPrice(){
    let result=0;
    for(let i=0;i<this.books.length;i++){
      result+=this.books[i].price;
    }
    return result;
  }
  },
  watch:{
    /**
     * 监听手机号，改变获取验证码的按钮状态
     */
    'registerForm.phone'(value){
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const val = reg.test(value)
      this.captchaBtn = !val;
    },
  },
  methods: {
    clickBtn(){
      // this.$nextTick(() => {
      //   console.log('我是父组件')
      //   this.list.forEach((item, index) => {
      //     this.$refs.myChild[index].init()
      //   })
      // })
      this.$refs.myChild.init()

    },
    add() {
      // 弹出对话框
      this.$refs.myChild.showDialog()
    },
    parentGoods(obj){
      console.log("parentGoods",obj);
    },
    fatherAdd(){
      console.log('fatherAdd');
      this.num++;
    },
    /**
     * 错误提示信息
     */
    errorMsg(){
      this.$message({
        showClose:true,
        message:'电话号码或验证码有误',
        type:'error'
      })
    },
    /**
     * 短信发送成功提示
     */
    successSendMsg(){
      this.$message({
        showClose:true,
        message:'验证码发送成功！',
        type:'success'
      })
    },
    /**
     * 注册成功提示
     */
    successRegisterMsg(){
      this.$message({
        showClose:true,
        message:'注册成功！',
        type:'success'
      })
    },
    login() {},
    /**
     * 注册用户
     */
    async registerUser(formName){
      console.log(this.registerForm.phone,this.registerForm.captcha,this.registerForm.nickname,this.registerForm.password);
      this.$refs[formName].validate(async (valid)=>{
        if(valid){
          /**
           * 发送请求
           */
          let timestamp=new Date().getTime();
          const byCodeData=await byCode({phone:this.registerForm.phone,captcha:this.registerForm.captcha,timestamp:timestamp});
          console.log(byCodeData)

          if(byCodeData.code===200&&byCodeData.data===true){
            /**
             * 验证成功,跳转
             */
            this.successRegisterMsg();
            this.$router.push("/");
          }
          else {
            this.errorMsg()
          }
        }
        else {
          console.log('error submit!');
          return false;
        }
      })
    },
    /**
     * 发送验证码
     * @returns {Promise<void>}
     * @author 唐小莉
     * @date 2023/8/5
     */
    async getCaptcha(){
      console.log("click")
      this.phone=this.registerForm.phone;//手机号
      let timestamp=new Date().getTime();
      /**
       * 调用sendCaptcha发送验证码
       */
      const sendCode=await sendCaptcha({phone:this.phone,timestamp:timestamp});
      if(sendCode.code===200) {
        this.successSendMsg();
      }
      else{
        this.errorMsg();
      }
      /**
       * 修改页面样式
       */
      const timer=setInterval(()=>{
        this.codeSec=this.codeSec-1;
        this.codeMsg=this.codeSec+'s后重试';
        this.showBtn=false;
        if(this.codeSec===0){
          clearInterval(timer);
          this.codeSec=60;
          this.showBtn=true;
        }
      },1000)
    }

  },
  components: {
    Atest,
    HelloWorld,
    son,
    dialog,
    Child1
  },
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.father {
  height: 100vh;
  background-color: skyblue;
  /* 去除 因为h2 造成的塌陷 */
  overflow: hidden;
}
.main-div{
  position: center;
  width: 80%;
  height: 700px;
}
.main-box {
  position: absolute;
  width: 800px;
  min-width: 800px;
  min-height: 500px;
  height: 500px;
  padding: 25px;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  margin: auto;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 380px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;
      .title {
        font-size: 34px;
        font-weight: 600;
        line-height: 3;
        color: #181818;
      }
      .text {
        margin-top: 10px;
        margin-bottom: 12px;
      }
      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
      .from__input__div{
        width: 380px;
        height: 40px;
        margin: 4px 0;
        padding-left:5px;
        display: flex;
        flex-direction: row;
        .form__input1 {
          width: 280px;
          height: 40px;
          align-self:flex-start;
          padding-left: 23px;
          font-size: 13px;
          letter-spacing: 0.15px;
          border: none;
          outline: none;
          // font-family: 'Montserrat', sans-serif;
          background-color: #ecf0f3;
          transition: 0.25s ease;
          border-radius: 8px;
          box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
          &::placeholder {
            color: #a0a5a8;
          }
        }
        .form__input2 {
          width: 100px;
          height: 40px;
          margin: -1px 4px;
          align-self:flex-end;
          padding-left: 20px;
          font-size: 13px;
          letter-spacing: 0.15px;
          border: none;
          outline: none;
          // font-family: 'Montserrat', sans-serif;
          background-color: #4b70e2;
          transition: 0.25s ease;
          border-radius: 8px;
          box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
          &::placeholder {
            color: #a0a5a8;
          }
        }

      }
    }
  }
  .container-register {
    z-index: 100;
    left: calc(100% - 480px);
  }
  .container-login {
    left: calc(100% - 480px);
    z-index: 0;
  }
  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }
  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    padding: 40px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;
    .switch__circle {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -50%;
      left: -60%;
      transition: 1.25s;
    }
    .switch__circle_top {
      top: -10%;
      left: 60%;
      width: 300px;
      height: 300px;
    }
    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 300px;
      padding: 25px 25px;
      transition: 1.25s;
      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }
  .login {
    left: calc(100% - 380px);
    .switch__circle {
      left: 0;
    }
  }
  .primary-btn {
    width: 180px;
    height: 40px;
    border-radius: 50px;
    margin-top: 15px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    &:hover {
      box-shadow: 4px 4px 6px 0 rgba(49, 130, 197, 0.5);
    }
  }
}
</style>

