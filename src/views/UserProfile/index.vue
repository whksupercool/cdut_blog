<!--  -->
<template>
    <div class='user-profile"'>
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()"></van-nav-bar>
        <!-- 导航栏 -->

        <!-- 选择图片文件 -->
        <input type="file" hidden ref="file" @change="onFileChange">
        <!-- 选择图片文件 -->

        <!-- 个人信息 -->
        <van-cell center class="photo-cell" title="头像" is-link @click="$refs.file.click()">
            <van-image class="avatar" fit="cover" round :src="user.photo" width="0.75rem" height="0.75rem"></van-image>
        </van-cell>
        <van-cell title="昵称" is-link :value="user.name" @click="isUpdateNameShow = true"></van-cell>
        <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isUpdateGenderShow = true"></van-cell>
        <van-cell title="生日" is-link :value="user.birthday" @click="isUpdateBirthdayShow = true"></van-cell>
        <!-- 个人信息 -->

        <!-- 编辑呢称 -->
        <van-popup v-model="isUpdateNameShow" style="height: 100%;background-color: #f5f7f9;" position="bottom">
            <UpdateName v-if="isUpdateNameShow" v-model="user.name" @close="isUpdateNameShow = false"></UpdateName>
        </van-popup>
        <!-- 编辑呢称 -->

        <!-- 编辑性别 -->
        <van-popup v-model="isUpdateGenderShow" position="bottom">
            <update-gender v-if="isUpdateGenderShow" v-model="user.gender" @close="isUpdateGenderShow = false" />
        </van-popup>
        <!-- 编辑性别 -->

        <!-- 编辑生日 -->
        <van-popup v-model="isUpdateBirthdayShow" position="bottom">
            <UpdateBirthday v-if="isUpdateBirthdayShow" v-model="user.birthday" @close="isUpdateBirthdayShow = false" />
        </van-popup>
        <!-- 编辑生日 -->

        <!-- 编辑头像 -->
        <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height: 100%;">
            <UpdatePhoto v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow = false"
                @update-photo="user.photo = $event"></UpdatePhoto>
        </van-popup>
        <!-- 编辑头像 -->
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getUserProfile } from "@/api/user"
import UpdateName from "@/views/UserProfile/components/UpdateName.vue"
import UpdateGender from "@/views/UserProfile/components/UpdateGender.vue"
import UpdateBirthday from "@/views/UserProfile/components/UpdateBirthday.vue"
import UpdatePhoto from "@/views/UserProfile/components/UpdatePhoto.vue"



export default {
    //组件名称
    name: 'UserProfile',
    //import引入的组件需要注入到对象中才能使用
    components: {
        UpdateName,
        UpdateGender,
        UpdateBirthday,
        UpdatePhoto
    },
    props: {},
    data() {
        //这里存放数据
        return {
            user: {}, // 个人信息
            isUpdateNameShow: false, // 是否展示昵称编辑页面
            isUpdateGenderShow: false,
            isUpdateBirthdayShow: false,
            isUpdatePhotoShow: false,
            img: null, // 预览的图片

        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async loadUserProfile() {
            try {
                const { data } = await getUserProfile()
                // console.log(data)
                this.user = data.data
            } catch (error) {
                this.$toast.fail(error.response.data.message)
            }
        },
        onFileChange() {
            // 获取文件对象
            const file = this.$refs.file.files[0]
            // 基于文章对象数据获取 blob 数据
            this.img = window.URL.createObjectURL(file)
            // console.log(data)
            this.isUpdatePhotoShow = true
            this.$refs.file.value = ''
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loadUserProfile()
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
.user-profile {
    .avatar {
        width: 30px;
        height: 30px;
    }

    .van-popup {
        background-color: #f5f7f9;
    }

    .photo-cell {
        .van-cell__value {
            display: flex;
            flex-direction: row-reverse;
        }
    }
}
</style>