<!--  -->
<template>
    <div class='update-gender"'>
        <van-picker show-toolbar title="请选择性别" :columns="columns" :default-index="value" @cancel="$emit('close')"
            @confirm="onConfirmGender" @change="onPickerChange" />
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { updateUserProfile } from "@/api/user"

export default {
    //组件名称
    name: 'UpdateGender',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        //这里存放数据
        return {
            columns: ['男', '女'],
            localGender: this.value
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async onConfirmGender() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, // 禁止背景点击
                duration: 0 // 持续展示
            })

            try {
                const localGender = this.localGender

                await updateUserProfile({
                    gender: localGender
                })

                // 更新视图
                this.$emit('input', localGender)

                // 关闭弹层
                this.$emit('close')

                // 提示成功
                this.$toast.success('更新成功')
            } catch (err) {
                this.$toast.fail(err.response.data.message)
            }
        },
        onPickerChange(picker, value, index) {
            this.localGender = index
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
</style>