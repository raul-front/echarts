<template>
  <el-dialog :title="editForm.action === 'update' ? '修改员工' : '添加员工'" v-model="thisVisible" width="600px">
    <el-form ref="editFormRef" :model="editForm" :rules="editFormRule" label-width="100px" v-loading="editFormLoading">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model.trim="editForm.name" placeholder="请填写姓名"></el-input>
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
      <el-form-item label="生日：" prop="birth">
        <el-date-picker v-model="editForm.birth" value-format="YYYY-MM-DD" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址：" prop="addr">
        <el-input v-model.trim="editForm.addr" placeholder="请填写地址"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitForm" :loading="submitBtnLoading">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch, onMounted, computed, toRaw, reactive, h, toRefs, nextTick } from 'vue'
import { filter, copy } from 'utils/func'
import { ElMessage } from 'element-plus'

export default {
  props: {
    visible: Boolean,
    editData: Object,
  },
  components: {
  },
  setup (props, { emit }) {
    const editFormRef = ref(null)
    const defaultForm = {
      action: 'add',
      name: '',
      sex: 1,
      age: 23,
      birth: '',
      addr: '',
    }
    const thisVisible = ref(false)
    const editFormLoading = ref(false)
    const submitBtnLoading = ref(false)
    const editForm = ref(copy(defaultForm))
    const editFormRule = {
      name: [
        { required: true, type: 'string', message: '请填写姓名', trigger: 'change' },
      ],
      sex: [
        { required: true, type: 'number', message: '请选择性别', trigger: 'change' },
      ],
      age: [
        { required: true, type: 'number', message: '请填写年龄', trigger: 'blur' },
      ],
      birth: [
        { required: true, type: 'string', message: '请选择生日', trigger: 'blur' },
      ],
      addr: [
        { required: true, type: 'string', message: '请填写地址', trigger: 'blur' },
      ],
    }
    watch(() => props.visible, val => {
      if (val && val !== thisVisible.value) {
        if (props.editData.action === 'add') {
          openAddDialog()
        } else {
          openUpdateDialog()
        }
      }
    })
    watch(thisVisible, val => {
      emit('update:visible', val)
    })

    const resetForm = () => {
      editFormRef.value && editFormRef.value.resetFields()
    }

    const openAddDialog = () => {
      submitBtnLoading.value = false
      resetForm()
      editForm.value = copy(defaultForm)
      thisVisible.value = true
    }
    const openUpdateDialog = () => {
      // this.editForm = this.getUpdateData(row)
      // this.editForm.action = 'update'
      // setTimeout(() => {
      //   this.editFormLoading = false
      // }, 200)
      editFormLoading.value = true
      resetForm()
      editForm.value = copy(props.editData)
      console.log('edit', editForm)
      submitBtnLoading.value = false
      thisVisible.value = true
      setTimeout(() => {
        editFormLoading.value = false
      }, 200)
    }

    onMounted(() => {
    })

    const handleSubmitForm = () => {
      editFormRef.value.validate((valid) => {
        if (valid) {
          submitBtnLoading.value = true

          // if (this.editForm.action === 'update') {
          //   this.updateData()
          // } else {
          //   this.addData()
          // }
        } else {
          ElMessage.error('表单校验失败')
        }
      })
    }
    const handleCloseDialog = () => {
      thisVisible.value = false
      resetForm()
    }

    return {
      editFormRef,
      thisVisible,
      editForm,
      editFormRule,
      editFormLoading,
      submitBtnLoading,
      handleCloseDialog,
      handleSubmitForm,

    }
  },
}
</script>

<style lang="sass">

</style>
