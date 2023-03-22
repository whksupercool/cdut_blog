<!--  -->
<template>
    <div class='update-name'>
        <!-- 导航栏 -->
        <van-nav-bar class="update-name-nav-bar" title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')"
            @click-right="onConfirmName" />
        <!-- 导航栏 -->

        <!-- 输入框 -->
        <div class="field-wrap">
            <van-field v-model.trim="localName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入昵称"
                show-word-limit />
        </div>
        <!-- 输入框 -->
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { updateUserProfile } from "@/api/user"
export default {
    //组件名称
    name: 'UpdateName',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        //这里存放数据
        return {
            localName: this.value,
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async onConfirmName() {
            // console.log('====onConfirmName====')
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, // 禁止背景点击
                duration: 0 // 持续展示
            })

            try {
                const localName = this.localName
                if (!localName.length) {
                    this.$toast.fail('昵称不能为空')
                    return
                }

                await updateUserProfile({
                    name: localName
                })

                // 更新视图
                this.$emit('input', localName)

                // 关闭弹层
                this.$emit('close')

                // 提示成功
                this.$toast.success('更新成功')
            } catch (error) {
                this.$toast.fail(error.response.data.message)
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //生命周期 - 创建之前
    beforeCreate() { },
    //生命周期 - 挂载之前
    beforeMount() { },
    //生命周期 - 更新之前
    beforeUpdate() { },
    //生命周期 - 更新之后
    updated() { },
    //生命周期 - 销毁之前
    beforeDestroy() { },
    //生命周期 - 销毁完成
    destroyed() { },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() { },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.update-name {
    .update-name-nav-bar {
        background-color: #3296fa;

        /deep/ .van-nav-bar__text {
            color: #fff;
        }
    }

    .field-wrap {
        padding: 20px;
    }
}
</style>