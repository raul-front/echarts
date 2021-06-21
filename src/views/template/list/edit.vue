<template>
  <div class="component-flex-full template-list-edit" v-loading="loading">
    <div class="component-flex-page">
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRule" style="width: 600px" label-width="100px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model.trim="editForm.name" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input v-model.trim="editForm.phone" placeholder="请填写手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model.trim="editForm.email" placeholder="请填写邮箱"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="editForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input-number v-model="editForm.age" :min="1" :max="120" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="薪资：" prop="money">
          <el-input-number v-model="editForm.money" :precision="2" :step="0.1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="生日：" prop="birth">
          <el-date-picker v-model="editForm.birth" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址：" prop="addr">
          <el-input v-model.trim="editForm.addr" placeholder="请填写地址"></el-input>
        </el-form-item>
        <!-- <el-form-item label="头像：" prop="avatar">
          <upload-one-image v-model="editForm.avatar"></upload-one-image>
        </el-form-item>
        <el-form-item label="照片：" prop="photo">
          <upload-many-image v-model="editForm.photo"></upload-many-image>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="component-flex-footer">
      <el-button @click="handleResetForm">重 置</el-button>
      <el-button type="primary" @click="handleSubmitForm" :loading="submitBtnLoading">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, updateUser } from 'api/template'
import useEditPage from 'hooks/useEditPage'
import { useRouter } from 'vue-router'
import { validatePhone, regExpEmail, validateFormChineseLength } from 'utils/validate'

const validatorPhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请填写手机'))
    return
  } else if (!validatePhone(value)) {
    callback(new Error('请检查手机格式'))
    return
  }
  callback()
}
export default {
  components: {
  },
  setup () {
    const router = useRouter()
    let defaultForm = {
      name: '',
      phone: '',
      email: '',
      sex: 1,
      age: 23,
      money: 9,
      birth: '',
      addr: '',
      avatar: '',
      photo: [],
    }

    const editFormRule = {
      name: [
        { required: true, type: 'string', message: '请填写姓名', trigger: 'change' },
        { validator: validateFormChineseLength(2, 10), message: '姓名由2-10位汉字组成', trigger: 'change' },
      ],
      phone: [{ required: true, validator: validatorPhone, trigger: 'change' }],
      email: [
        { required: true, type: 'string', message: '请填写邮箱', trigger: 'change' },
        { pattern: regExpEmail, message: '请检查邮箱格式', trigger: 'change' },
      ],
      sex: [{ required: true, type: 'number', message: '请选择性别', trigger: 'change' }],
      age: [{ required: true, type: 'number', message: '请填写年龄', trigger: 'blur' }],
      birth: [{ required: true, type: 'string', message: '请选择生日', trigger: 'blur' }],
      addr: [{ required: true, type: 'string', message: '请填写地址', trigger: 'blur' }],
      avatar: [{ required: true, type: 'string', message: '请选择头像', trigger: 'change' }],
      photo: [{ required: true, type: 'array', message: '请选择照片', trigger: 'change' }],
    }

    const handleAddData = (data) => {
      // 这里传过来的是form数据，可以重新组装
      return addUser(data)
    }
    const handleUpdateData = (id, data) => {
      return updateUser(id, data)
    }
    const handleGetDetail = (id) => {
      return getUser(id).then(res => {
        // TODO: 处理成表单数据
        const data = res.data
        defaultForm = {
          name: data.name,
          phone: '',
          email: '',
          sex: data.sex,
          age: data.age,
          money: 0,
          birth: data.birth,
          addr: data.addr,
          avatar: '',
          photo: [],
        }
        return defaultForm
      })
    }
    const handleEditSuccess = () => {
      router.push({ name: 'Template_List' })
    }

    const {
      editFormRef,
      editForm,
      loading,
      isUpdate,
      submitBtnLoading,
      handleResetForm,
      handleSubmitForm,
    } = useEditPage({ defaultForm, handleAddData, handleUpdateData, handleGetDetail, handleEditSuccess })

    return {
      editFormRef,
      editForm,
      editFormRule,
      isUpdate,
      loading,
      submitBtnLoading,
      handleResetForm,
      handleSubmitForm,
    }
  },
}
</script>

<style lang="scss">
</style>
