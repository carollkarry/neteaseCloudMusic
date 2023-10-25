import {postRequest} from "@/plugins/axios";

const qs=require('qs')

//每次请求都带上时间戳timestamp参数，防止缓存
/**
 * 手机号登录
 * @param loginByPhone 手机号实体 phone password
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const byPasswordLogin=function (loginByPhone){
    return postRequest('/login/cellphone',loginByPhone);
}

/**
 * 发送短信验证码
 * @param captcha 验证码实体，包括phone与timestamp
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const sendCaptcha=function (captcha){
    return postRequest('/captcha/sent',captcha);
}

/**
 * 验证短信验证码
 * @param pCaptcha 验证码实体，包括phone与captcha,Timestamp
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const byCode=function (pCaptcha){
    return postRequest('/captcha/verify',pCaptcha);
}

/**
 * 注册/修改密码
 * @param registers 参数包括，captcha,phone,password,nickname,timestamp
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const registerByPhone=function (registers){
    return postRequest('/register/cellphone',registers);
}

/**
 * 检测手机号是否已经注册
 * @param phone 手机号
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const checkPhoneIsRegister=function (phone){
    return postRequest('/cellphone/existence/check',phone);
}

/**
 * 退出登录
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const logoutM=function (){
    return postRequest('/logout','');
}

/**
 * 获取登录状态
 * @returns {Promise<*>}
 * @author TangXiaoLi
 * @date 2023/7/31
 */
export const getLoginStatusM=function (){
    return postRequest('/login/status','');
}