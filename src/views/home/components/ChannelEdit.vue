<template>
    <div class="channel-edit">
        <!-- 我的频道 -->
        <div class="my-channel">
            <van-cell :border="false">
                <div class="title-text" slot="title">我的频道</div>
                <van-button class="edit-btn" type="danger" plain round size="mini"
                    @click="isEdit = !isEdit">{{ isEdit ? "完成" : "编辑" }}</van-button>
            </van-cell>
            <van-grid :gutter="10">
                <van-grid-item class="grid-item" v-for="(channel, index) in myChannels" :key="index"
                    @click="onMyChannelClick(channel, index)">
                    <van-icon v-show="isEdit && !fiexdChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
                    <!-- v-bind:class 语法一个对象，对象中的 key 表示要作用的 CSS 类名象中的 value 要计算出布尔值true，则作用该类名false，不作用类名 -->
                    <span class="text" :class="{ active: index === active }" slot="text">{{ channel.name }}</span>
                </van-grid-item>
            </van-grid>
        </div>
        <!-- 我的频道 -->

        <!-- 频道推荐 -->
        <div class="channel-recommend">
            <van-cell :border="false">
                <div class="title-text" slot="title">推荐频道</div>
            </van-cell>
            <van-grid :gutter="10">
                <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index"
                    :text="channel.name" icon="plus" @click="onAddMyChannel(channel)"></van-grid-item>
            </van-grid>
        </div>
        <!-- 频道推荐 -->
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
    name: 'ChannelEdit',
    components: {},
    props: {
        myChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            allChannels: [], // 所有频道
            isEdit: false, // 控制编辑状态的显示
            fiexdChannels: [0], // 固定频道，不允许删除
        }
    },
    computed: {
        // 得到用户登录信息
        ...mapState(['user']),
        // 计算属性会观测内部依赖数据的变化
        // 如果依赖的数据发生变化，则计算属性会重新执行
        recommendChannels() {
            return this.allChannels.filter(channel => {
                return !this.myChannels.find(myChannel => {
                    return myChannel.id === channel.id
                })
            })
        },
    },
    watch: {},
    created() {
        this.loadAllChannels()
    },
    mounted() { },
    methods: {
        async loadAllChannels() {
            try {
                const { data } = await getAllChannels()
                // console.log(data.data.channels)
                this.allChannels = data.data.channels
            } catch (error) {
                this.$toast.fail('获取所有频道失败，请稍后再试！')
            }
        },
        async onAddMyChannel(channel) {
            this.myChannels.push(channel)

            // 数据持久化处理
            if (this.user) {
                try {
                    // 已登录，把数据请求接口放到线上
                    await addUserChannel({
                        id: channel.id, // 频道ID
                        seq: this.myChannels.length // 序号
                    })
                } catch (err) {
                    this.$toast.fail('获取用户频道失败，请稍后再试！')
                }
            } else {
                // 未登录，把数据存储到本地
                setItem('TOUTIAO_CHANNELS', this.myChannels)
            }
        },
        onMyChannelClick(channel, index) {
            if (this.isEdit) {
                // 1. 如果是固定频道，则不删除
                if (this.fiexdChannels.includes(channel.id)) {
                    return
                }

                // 2. 删除频道项
                this.myChannels.splice(index, 1)

                // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
                // 参数1：要删除的元素的开始索引（包括）
                // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
                if (index <= this.active) {
                    // 让激活频道的索引 - 1
                    this.$emit('update-active', this.active - 1, true)
                }

                // 4. 处理持久化
                this.deleteChannel(channel.id)
            } else {
                // 非编辑状态，执行切换频道
                this.$emit('update-active', index, false)
            }
        },
        // 删除频道
        async deleteChannel(channelId) {
            try {
                if (this.user) {
                    // 已登录，则将数据更新到线上
                    await deleteUserChannel(channelId)
                } else {
                    // 未登录，将数据更新到本地
                    setItem('TOUTIAO_CHANNELS', this.myChannels)
                }
            } catch (error) {
                this.$toast.fail('删除频道失败，请稍后再试！')
            }
        }
    }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;

    .title-text {
        font-size: 32px;
        color: #333333;
    }

    /deep/ .my-channel {
        .edit-btn {
            width: 104px;
            height: 48px;
            font-size: 26px;
            color: #f85959;
            border: 1px solid #f85959;
        }

        .van-icon-clear {
            position: absolute;
            right: -10px;
            top: -10px;
            font-size: 30px;
            color: #cacaca;
            z-index: 2;
        }

    }

    /deep/ .grid-item {
        width: 160px;
        height: 86px;

        .van-grid-item__content {
            flex-direction: row;
            white-space: nowrap; // 不让文字换行
            background-color: #f4f5f6;

            .van-grid-item__text,
            .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }

            .active {
                color: red;
            }

            .van-icon-plus {
                font-size: 28px;
                margin-right: 6px;
            }

            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
}
</style>