/*
 * @Author: 
 * @Date: 2020-10-07 15:06:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-07 17:45:04
 * @Description: file content
 * @Company: 
 */
$(function () {
    getUserInfo()
    var layer = layui.layer;
    //退出功能
    $("#btnLogout").on("click", function () {
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '../../login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})
// 发起ajax.get请求
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取失败');
            renderAvatar(res.data)
        }
    });
};

/**
 * 
 * @param {*} user  渲染用户昵称头像
 */
function renderAvatar(user) {
    // console.log(user);
    // 获取用户名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像
    if (user.user_pic !== null) {
        // 判断用户是否有自定义头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        //渲染文本头像
        $(".layui-nav-img").hide(); // 隐藏
        var first = name[0].toUpperCase(); // 取子符串的第一位
        // 显示文字头像
        $(".text-avatar").html(first).show();
    }
}