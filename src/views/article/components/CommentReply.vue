<!--  -->
<template>
    <div class='comment-reply'>
        <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
        </van-nav-bar>

        <div class="scroll-wrap">
            <!-- 当前评论项 -->
            <CommentItem :comment="comment"></CommentItem>
            <!-- 当前评论项 -->

            <!-- 评论的回复列表 -->
            <van-cell title="全部回复" />
            <CommentList :list="commentList" :source="comment.com_id" type="c"></CommentList>
            <!-- 评论的回复列表 -->
        </div>

        <!-- 底部区域 -->
        <div class="reply-bottom">
            <van-button class="write-btn" size="small" round @click="isPostShow = true">写评论</van-button>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup closeable v-model="isPostShow" position="bottom">
            <CommentPost :target="comment.com_id" @post-success="onPostSuccess" />
        </van-popup>
        <!-- /发布评论 -->
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CommentItem from "@/views/article/components/CommentItem.vue"
import CommentList from "@/views/article/components/CommentList.vue"
import CommentPost from "@/views/article/components/CommentPost.vue"
export default {
    //组件名称
    name: 'CommentReply',
    //import引入的组件需要注入到对象中才能使用
    components: {
        CommentItem,
        CommentList,
        CommentPost
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data() {
        //这里存放数据
        return {
            isPostShow: false,
            commentList: [] // 评论的回复列表
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        onPostSuccess(data) {
            // 更新回复的数量
            this.comment.reply_count++

            // 关闭弹层
            this.isPostShow = false

            // 将最新回复的内容展示到列表的顶部
            this.commentList.unshift(data.new_obj)
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
.comment-reply {
    .scroll-wrap {
        position: fixed;
        top: 180px;
        left: 0;
        right: 0;
        bottom: 88px;
        overflow-y: auto;
    }

    .reply-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-top: 1px solid #d8d8d8;

        .write-btn {
            width: 60%;
        }
    }
}
</style>