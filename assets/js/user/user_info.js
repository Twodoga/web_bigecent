/*
 * @Author: 
 * @Date: 2020-10-09 08:58:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-09 10:41:54
 * @Description: file content
 * @Company: 
 */
$(function () {
    // 导入form
    var form = layui.form;
    var layer = layui.layer;
    // 判断用户输入的字符
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return "输入1~6之间的字符";
        }
    });
    iniuUserInfo();
    /**
     * 初始化用户输入的信息
     */
    function iniuUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取失败");
                form.val('formUserInfo', res.data)
            }
        });
    };

    /**
     * 重置表单的数据
     */
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        // 重新渲染获取的数据 调用iniuUSerInfo();
        iniuUserInfo();
    });
    /**  
     *  更新用户修改的信息
     */
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg("修改失败");
                layer.msg("修改成功");
                // 调用父页面的 渲染欢迎函数
                window.parent.getUserInfo();
            }
        });
    })
})