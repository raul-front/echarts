/*
 * @Descripttion: table edit dialog
 * @Author: pujianguo
 * @Date: 2021-06-20 21:57:30
 */

import { ref, computed, watch } from 'vue'
import { copy } from 'utils/func'
import { ElMessage } from 'element-plus'

const useTableEditDialog = ({ props, emit, defaultForm, handleAddData, handleUpdateData, handleInitUpdateData = null, handleGetDetail = null }) => {
  const editFormRef = ref(null)
  const thisVisible = ref(false)
  const editFormLoading = ref(false)
  const submitBtnLoading = ref(false)

  const editForm = ref(copy(defaultForm))

  const isUpdate = computed(() => {
    return props.editData.action !== 'add'
  })

  watch(() => props.visible, val => {
    if (val && val !== thisVisible.value) {
      if (isUpdate.value) {
        openUpdateDialog()
      } else {
        openAddDialog()
      }
    }
  })
  watch(thisVisible, val => {
    emit('update:visible', val)
  })

  // 打开弹框
  const openAddDialog = () => {
    submitBtnLoading.value = false
    resetForm()
    editForm.value = copy(defaultForm)
    thisVisible.value = true
  }
  const openUpdateDialog = () => {
    editFormLoading.value = true
    submitBtnLoading.value = false
    resetForm()
    thisVisible.value = true
    // 传入id时，数据需要从接口获取
    if (props.id) {
      handleGetDetail(props.id).then(data => {
        console.log('data', data)
        editForm.value = data
        thisVisible.value = true
        editFormLoading.value = false
      }).catch(_ => {
        editFormLoading.value = false
      })
    } else {
      editForm.value = handleInitUpdateData ? handleInitUpdateData(copy(props.editData)) : copy(props.editData)
      editFormLoading.value = false
    }
  }
  const handleCloseDialog = () => {
    thisVisible.value = false
    resetForm()
  }

  // 提交数据
  const handleSubmitForm = () => {
    editFormRef.value.validate((valid) => {
      if (valid) {
        submitBtnLoading.value = true
        if (isUpdate.value) {
          _submitUpdateData()
        } else {
          _submitAddData()
        }
      } else {
        ElMessage.error('表单校验失败')
      }
    })
  }
  const _submitAddData = () => {
    const data = copy(editForm.value)
    handleAddData(data).then(res => {
      ElMessage.success('添加成功')
      _editSuccess()
      handleCloseDialog()
      submitBtnLoading.value = false
    }).catch(_ => {
      submitBtnLoading.value = false
    })
  }
  const _submitUpdateData = () => {
    const data = copy(editForm.value)
    handleUpdateData(data.id, data).then(res => {
      ElMessage.success('修改成功')
      _editSuccess()
      handleCloseDialog()
      submitBtnLoading.value = false
    }).catch(_ => {
      submitBtnLoading.value = false
    })
  }

  const _editSuccess = () => {
    emit('editSuccess')
  }

  const resetForm = () => {
    editFormRef.value && editFormRef.value.resetFields()
  }

  return {
    editFormRef,
    thisVisible,
    editForm,
    isUpdate,
    editFormLoading,
    submitBtnLoading,
    handleCloseDialog,
    handleSubmitForm,
  }
}

export default useTableEditDialog
