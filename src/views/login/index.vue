<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
            <template #left>
                <van-icon @click="$router.back()" name="arrow-left" />
            </template>
        </van-nav-bar>
        <!-- 导航栏 -->

        <!-- 登录表单 -->
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile" type="number"
                maxlength="11">
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number"
                maxlength="6">
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <!--time: 倒计时时间-->
                    <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s"
                        @finish="isCountDownShow = false" />
                    <van-button v-else class="send-sms-btn" round size="small" type="default" native-type="button"
                        @click="onSendSms">获取验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit"> 登录
                </van-button>
            </div>
        </van-form>
        <!-- 登录表单 -->

    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data() {
        return {
            user: {
                mobile: '13911111111',
                code: '246810'
            },
            // 登录表单验证内容
            userFormRules: {
                mobile: [
                    {
                        required: true,
                        message: '手机号不能为空！',
                    },
                    {
                        pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
                        message: '手机号格式错误！'
                    }
                ],
                code: [
                    {
                        required: true,
                        message: '验证码不能为空！',
                    },
                    {
                        pattern: /^\d{6}$/,
                        message: '验证码格式错误！'
                    }
                ]
            },
            // 是否展示倒计时
            isCountDownShow: false,
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        // 提交表单
        async onSubmit() {
            // 1. 获取表单数据
            const user = this.user
            console.log('---------------submit---------------')

            // 2. 表单验证

            // loading 转圈圈提示
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                message: "登录中...",
                forbidClick: true // 是否禁止背景点击
            })
            // 3. 提交表单请求登录
            try {
                const { data } = await login(this.user)
                this.$store.commit('setUser', data.data)
                this.$toast.success('登录成功')

                // 登录成功，跳转回原来页面
                // back 的方式不严谨，后面讲功能优化的时候再说
                this.$router.back()
            } catch (error) {
                if (error.response.status === 400) {
                    // console.log('手机号或验证码错误', error)
                    this.$toast.fail('手机号或验证码错误')
                } else {
                    // console.log('登录失败', error)
                    this.$toast.fail('登录失败')
                }
            }
        },
        // 获取验证码
        async onSendSms() {
            console.log('---------------onSendSms---------------')
            // 1. 校验手机号
            try {
                await this.$refs.loginForm.validate('mobile')
                console.log('手机号验证成功')
            } catch (error) {
                return console.log('手机号验证失败', error)
            }

            // 2. 验证通过，显示倒计时
            this.isCountDownShow = true

            // 3.  请求发送验证码
            try {
                await sendSms(this.user.mobile)
                this.$toast.success('发送成功！')
            } catch (error) {
                // 发送失败，关闭倒计时
                this.isCountDownShow = false
                if (error.response.status === 429) {
                    this.$toast('发送太频繁，请1分钟后重试！')
                } else {
                    this.$toast('发送失败，亲稍后重试！')
                }
            }
        },
    }
}
</script>

<style scoped lang="less">
.login-container {
    .iconfont {
        font-size: 37px;
        margin-right: 20px;
    }

    .send-sms-btn {
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666;
    }

    .login-btn-wrap {
        padding: 53px 33px;

        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>
