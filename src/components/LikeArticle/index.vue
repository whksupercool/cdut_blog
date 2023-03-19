<!-- 文章点赞组件 -->
<template>
    <van-button :icon="value === 1 ? 'good-job' : 'good-job-o'" :class="{
        liked: value === 1
    }" :loading="loading" @click="onLike" />
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addLike, deleteLike } from '@/api/article'

export default {
    //组件名称
    name: 'LikeArticle',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        value: {
            type: Number,
            required: true
        },
        articleId: {
            type: [Number, String, Object],
            required: true
        },
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
        async onLike() {
            // console.log('----onLike----')
            this.loading = true
            try {
                let satus = -1
                if (this.value === 1) {
                    // 已点赞，取消收藏
                    await deleteLike(this.articleId)
                } else {
                    // 未点赞，添加收藏
                    await addLike(this.articleId)
                    satus = 1
                }

                // 更新视图
                this.$emit('input', satus)
                this.$toast.success(satus === 1 ? '点赞成功！' : '取消点赞！')
            } catch (err) {
                // console.log(err)
                if (err.response && err.response.status === 401) {
                    this.$toast.fail(err.response.data.message)
                } else {
                    this.$toast.fail('操作失败，请重试！')
                }
            }

            this.loading = false
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
.liked {
    .van-icon {
        color: #e5645f;
    }
}
</style>