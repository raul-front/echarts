<template>
  <el-dialog :title="isUpdate ? '修改员工' : '添加员工'" v-model="thisVisible" width="600px">
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
import useTableEditDialog from 'lisa/hooks/useTableEditDialog'
import { addUser, updateUser, getUser } from 'api/template'

export default {
  props: {
    visible: Boolean,
    editData: Object,
    id: [Number, String],
  },
  emits: ['editSuccess', 'update:visible'],
  setup (props, { emit }) {
    const defaultForm = {
      action: 'add',
      name: '',
      sex: 1,
      age: 23,
      birth: '',
      addr: '',
    }
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

    const handleAddData = (data) => {
      // 这里传过来的是form数据，可以重新组装
      return addUser(data)
    }
    const handleUpdateData = (id, data) => {
      return updateUser(id, data)
    }
    // 可选函数，用于初始化update数据
    const handleInitUpdateData = (data) => {
      return data
    }
    const handleGetDetail = (id) => {
      return getUser(id).then(res => {
        // 这里可以处理数据，可以直接调handleInitUpdateData就不用传进入了
        return res.data
      })
    }

    const {
      editFormRef,
      thisVisible,
      editForm,
      isUpdate,
      editFormLoading,
      submitBtnLoading,
      handleCloseDialog,
      handleSubmitForm,
    } = useTableEditDialog({ props, emit, defaultForm, handleInitUpdateData, handleAddData, handleUpdateData, handleGetDetail })

    return {
      editFormRef,
      thisVisible,
      isUpdate,
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
