/*
 * @Author: 
 * @Date: 2020-10-09 10:49:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-09 11:39:17
 * @Description: file content
 * @Company: 
 */

$(function () {

  var form = layui.form;
  var layer = layui.layer;
  // 检验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "必须是6~12位且不能出现空格"],
    // 判断新旧是否一致
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) return "新旧不能相同";
    },
    // 判断两次输入是否一致
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) return "两次不一致";
    }
  });

  // 渲染数据到页面
  $('.layui-form').on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/updatepwd",
      data: $(this).serialize(),

      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('修改成功两秒后跳转登录页面');
        $(".layui-form")[0].reset(); // 清空列表
        // 设置后跳转主页面
        setTimeout(function () {
          window.parent.location.href = '../../../login.html';
        }, 2000)
      }
    });
  })
})