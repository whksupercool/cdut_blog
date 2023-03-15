<template>
    <div class="search-suggestion">
        <van-cell v-for="(suggestion, index) in suggestions" :key="index" icon="search"
            @click="$emit('search', suggestion)">
            <div slot="title" v-html="textHighlight(suggestion)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            suggestions: [], // 联想建议数据列表
        }
    },
    computed: {},
    watch: {
        searchText: {

            // debounce 函数
            // 参数1：一个函数
            // 参数2：延迟时间，单位是毫秒
            // 返回值：防抖之后的函数
            handler: debounce(function (value) {
                this.loadSearchSuggestions(value)
            }, 200),

            // 当 searchText 发生改变的时候就会调用 handler 函数
            // 注意：handler 函数名称是固定的
            // handler(value) {
            //     // console.log(value)
            //     this.loadSearchSuggestions(value)
            // },
            immediate: true,
        }
    },
    created() { },
    mounted() { },
    methods: {
        async loadSearchSuggestions(q) {
            try {
                const { data } = await getSearchSuggestions(q)
                // console.log(data.data.options)
                this.suggestions = data.data.options
                // console.log(this.suggestions)
            } catch (error) {
                this.$toast.fail('数据获取失败！')
            }
        },
        textHighlight(text) {
            if (this.suggestions[0]) {
                const highlightStr = `<span class="text-highlight">${this.searchText}</span>`
                // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
                // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
                // RegExp 正则表达式构造函数
                //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
                //    参数2：匹配模式，要写到字符串中
                const reg = new RegExp(this.searchText, 'gi')
                return text.replace(reg, highlightStr)
            }
        }
    }
}
</script>

<style scoped lang="less">
.search-suggestion {
    /deep/ span.text-highlight {
        color: #3296fa;
        ;
    }
}
</style>