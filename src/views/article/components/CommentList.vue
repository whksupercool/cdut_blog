<!--  -->
<template>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error="error"
        error-text="加载失败，请点击重试" :immediate-check="false">
        <CommentItem v-for="(item, index) in list" :key="index" :comment="item" />
    </van-list>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getComments } from "@/api/comment"
import CommentItem from "@/views/article/components/CommentItem.vue"

export default {
    //组件名称
    name: 'CommentList',
    //import引入的组件需要注入到对象中才能使用
    components: {
        CommentItem
    },
    props: {
        source: {
            type: [Number, String, Object],
            required: true
        },
        list: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            // 自定义 Prop 数据验证
            validator(value) {
                return ['a', 'c'].includes(value)
            },
            default: 'a'
        }
    },
    data() {
        //这里存放数据
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null, // 获取下一页数据的标记
            limit: 10,
            error: false
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async onLoad() {
            // 异步更新数据
            try {
                // 1. 请求获取数据
                const { data } = await getComments({
                    type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    source: this.source.toString(), // 源id，文章id或评论id
                    offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
                })
                // console.log(data)

                // 2. 将数据添加到列表中
                const { results } = data.data
                this.list.push(...results)
                // 把文章评论返回到父组件
                this.$emit("onload-success", data.data)

                // 3. 将 loading 设置为 false
                this.loading = false

                // 4. 判断是否还有数据
                if (results.length) {
                    // 有就更新获取下一页的数据页码
                    this.offset = data.data.last_id
                } else {
                    // 没有就将 finished 设置结束
                    this.finished = true
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
        // 所以我们要手动的开启初始 loading
        this.loading = true
        this.onLoad()
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