<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <div v-if="isDeleteShow">
                <span @click="$emit('clearSearchHistories')">全部删除</span>
                &nbsp;&nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>
            <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
        </van-cell>
        <van-cell v-for="(item, index) in searchHistories" :key="index" @click="onSearchItemClick(item, index)">
            <span slot="title">{{ item }}</span>
            <van-icon v-show="isDeleteShow" name="close"></van-icon>
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    components: {},
    props: {
        searchHistories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isDeleteShow: false, // 控制删除图标是否显示
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        onSearchItemClick(item, index) {
            if (this.isDeleteShow) {
                // 删除状态，删除历史记录数据
                this.searchHistories.splice(index, 1)
            } else {
                // 非删除状态，直接进入搜索
                this.$emit('search', item)
            }
        }
    }
}
</script>

<style scoped lang="less">
.search-history {
    .van-cell {
        .van-icon {
            font-size: 40px;
        }
    }
}
</style>