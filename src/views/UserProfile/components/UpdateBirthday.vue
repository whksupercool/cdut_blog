<!--  -->
<template>
    <div class="update-birthday">
    <!--
      currentDate 双向绑定了日期选择器
        设置日期选择器的默认值
        同步日期选择器选择的日期
      min-date: 可选的最小日期
      max-date: 可选的最大日期
                                                     -->
        <van-datetime-picker title="请选择生日" v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
            @cancel="$emit('close')" @confirm="onConfirmBirthday" />
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
    //组件名称
    name: 'UpdateBirthday',
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
            minDate: new Date(1970, 0, 1), // 最小时间
            maxDate: new Date(), // 最大时间
            currentDate: new Date(this.value) // 当前时间
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async onConfirmBirthday() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, // 禁止背景点击
                duration: 0 // 持续展示
            })

            try {
                const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')

                await updateUserProfile({
                    birthday: currentDate
                })

                // 更新视图
                this.$emit('input', currentDate)

                // 关闭弹层
                this.$emit('close')

                // 提示成功
                this.$toast.success('更新成功')
            } catch (err) {
                this.$toast.fail(err.response.data.message)
            }
        },
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