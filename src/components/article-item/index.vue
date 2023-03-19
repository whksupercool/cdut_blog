<template>
    <!-- 文章详情单元格 -->
    <van-cell class="article-item" :to="{
        // 根据路由名称进行跳转
        name: 'article',
        // 传递路由动态参数
        params: {
            // 属性名：路由路径中设计的动态参数名称
            articleId: article.art_id
        }
    }">
        <!-- 文章标题 -->
        <div class="title van-multi-ellipsis--l2" slot="title">{{ article.title }}</div>
        <!-- 文章标题 -->

        <!-- 标题下方的描述信息 -->
        <div slot="label">
            <!-- 有三张图片的情况 -->
            <div class="cover-wrap" v-if="article.cover.type === 3">
                <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
                    <van-image class="cover-item-img" fit="cover" :src="img" />
                </div>
            </div>
            <!-- 有三张图片的情况 -->

            <!-- 文章作者姓名、评论数量、发布时间 -->
            <div class="label-info-wrap">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }} 评论</span>
                <span>{{ article.pubdate | relativeTime }}</span>
            </div>
            <!-- 文章作者姓名、评论数量、发布时间 -->
        </div>
        <!-- 标题下方的描述信息 -->

        <!-- 有一张图片的情况 -->
        <van-image v-if="article.cover.type === 1" slot="default" class="right-cover" fit="cover"
            :src="article.cover.images[0]" />
        <!-- 有一张图片的情况 -->
    </van-cell>
    <!-- 文章详情单元格 -->
</template>

<script>
export default {
    name: 'ArticleItem',
    components: {},
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {}
}
</script>

<style scoped lang="less">
.article-item {
    .van-cell__title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
            font-size: 32px;
            color: #3a3a3a;
        }

        .label-info-wrap span {
            font-size: 22px;
            color: #b4b4b4;
            margin-right: 25px;
        }

        /deep/ .cover-wrap {
            display: flex;
            padding: 30px 0;

            .cover-item {
                flex: 1;
                height: 146px;

                &:not(:last-child) {
                    padding-right: 4px;
                }

                .cover-item-img {
                    width: 100%;
                    height: 146px;
                }
            }
        }
    }

    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;

        .right-cover {
            width: 100%;
            height: 146px;
        }
    }
}
</style>
