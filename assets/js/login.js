/*
 * @Author: 
 * @Date: 2020-10-06 14:45:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-07 10:42:43
 * @Description: file content
 * @Company: 
 */
$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide();
  })
  // 从layui中获取form
  var form = layui.form;
  var layer = layui.layer;
  // 自定义校验规则
  form.verify({
    // 自定义prd校验的规则
    prd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 自定义判断两次密码输入是否一致
    // 通过形参获取值
    reprd: function (value) {
      // 获取父级元素 属性查找
      var pwd = $('.reg-box [name=password]').val();
      // 判断是否一致
      if (pwd !== value) {
        return "两次输入不一致";
      }
    }

  });
  // 发起post的请求
  // 注册页面
  $("#form_reg").on("submit", function (e) {
    // 监听事件
    // 阻止默认提交行为
    e.preventDefault();
    $.post('/api/reguser', {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val()
    }, function (res) {

      if (res.status !== 0) return layer.msg(res.message);
      // 失败后提示消息



      layer.msg("注册成功")
      // 模拟点击效果弹到登陆页面
      $("#link_login").click();

    })
  })

  // 登陆页面
  $("#form_login").submit(function (e) {
    e.preventDefault(); // 阻止冒泡
    // 发起请求
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(), // 获取表单的数据
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        // 登陆成功提示
        layer.msg('登陆成功');
        // 存储本地方便存取

        localStorage.setItem("token", res.token);
        // 跳转主页面页面
        location.href = "../../index.html";
      }
    });
  })

})