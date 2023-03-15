<template>
    <div class="search-container">
        <!-- 顶部搜索栏 -->
        <form class="search-form" action="/">
            <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" clearable background="#3296fa"
                @search="onSearch" @cancel="onCancel" @focus="isResultShow = false" />
        </form>
        <!-- 顶部搜索栏 -->

        <!-- 搜索结果 -->
        <SearchResult :search-text="searchText" v-if="isResultShow"></SearchResult>
        <!-- 搜索结果 -->

        <!-- 联想建议 -->
        <SearchSuggestion @search="onSearch" :searchText="searchText" v-else-if="searchText"></SearchSuggestion>
        <!-- 联想建议 -->

        <!-- 搜索历史记录 -->
        <SearchHistory v-else></SearchHistory>
        <!-- 搜索历史记录 -->


    </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
    name: "SearchIndex",
    components: {
        SearchHistory,
        SearchSuggestion,
        SearchResult
    },
    props: {},
    data() {
        return {
            searchText: '', // 搜索内容文本
            isResultShow: false, // 控制搜索结果的展示
        }
    },
    computed: {},
    watch: {},
    created() { },
    methods: {
        onSearch(val) {
            // console.log(val)
            this.searchText = val

            this.isResultShow = true
        },
        onCancel() {
            this.$router.back()
        },
    }
};
</script>

<style scoped lang="less">
.search-container {
    margin-top: 108px;

    .van-search__action {
        color: white;
    }

    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>