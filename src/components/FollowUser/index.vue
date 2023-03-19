<!--  -->
<template>
    <van-button class="follow-btn" round size="small" v-if="isFollowed" @click="onFollow"
        :loading="loading">已关注</van-button>
    <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-else @click="onFollow"
        :loading="loading">关注</van-button>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addFollow, deleteFollow } from '@/api/user'

export default {
    //组件名称
    name: 'FollowUser',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    // 自定义 v-model 的数据名称
    model: {
        prop: 'isFollowed', // 默认是 value
        event: 'update-is_followed' // 默认是 input
    },
    props: {
        isFollowed: {
            type: Boolean,
            required: true
        },
        userId: {
            type: [Number, String, Object],
            required: true
        }
    },
    data() {
        //这里存放数据
        return {
            loading: false,
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async onFollow() {
            this.loading = true // 展示关注按钮的 loading 状态
            try {
                if (this.isFollowed) {
                    // 已关注，取消关注
                    await deleteFollow(this.userId)
                    // this.article.is_followed = false
                } else {
                    // 没有关注，添加关注
                    await addFollow(this.userId)
                    // this.article.is_followed = true
                }

                // 更新视图状态
                // this.article.is_followed = !this.article.is_followed
                this.$emit('update-is_followed', !this.isFollowed)
                // this.$emit('input', !this.value)
                // this.$emit('update-is_followed', !this.value)
            } catch (err) {
                // console.log(err)
                let message = '操作失败，请重试！'
                if (err.response && err.response.status === 400) {
                    message = '你不能关注你自己！'
                } else if (err.response && err.response.status === 401) {
                    message = '用户未认证，请重新登录！'
                }
                this.$toast(message)
            }
            this.loading = false // 关闭关注按钮的 loading 状态
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