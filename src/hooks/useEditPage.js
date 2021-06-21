/*
 * @Descripttion: table edit dialog
 * @Author: pujianguo
 * @Date: 2021-06-20 21:57:30
 */

import { ref, computed, onMounted } from 'vue'
import { copy } from 'utils/func'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const useEditPage = ({ defaultForm, handleAddData, handleUpdateData, handleGetDetail, handleEditSuccess }) => {
  const route = useRoute()

  const editFormRef = ref(null)
  const editFormLoading = ref(false)
  const loading = ref(false)
  const submitBtnLoading = ref(false)
  const editForm = ref(copy(defaultForm))

  const id = computed(() => {
    return route.params.id
  })
  const isUpdate = computed(() => {
    return route.name.endsWith('_Update')
  })

  onMounted(() => {
    initData()
  })

  const initData = () => {
    if (isUpdate.value) {
      getData()
    }
  }
  const getData = () => {
    loading.value = true
    handleGetDetail(id.value).then(data => {
      editForm.value = copy(data)
      loading.value = false
    }).catch(_ => {
      loading.value = false
    })
  }

  const handleResetForm = () => {
    editFormRef.value.resetFields()
    editForm.value = copy(defaultForm)
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
      handleEditSuccess()
      submitBtnLoading.value = false
    }).catch(_ => {
      submitBtnLoading.value = false
    })
  }
  const _submitUpdateData = () => {
    const data = copy(editForm.value)
    handleUpdateData(id.value, data).then(res => {
      ElMessage.success('修改成功')
      handleEditSuccess()
      submitBtnLoading.value = false
    }).catch(_ => {
      submitBtnLoading.value = false
    })
  }

  return {
    editFormRef,
    editForm,
    isUpdate,
    loading,
    editFormLoading,
    submitBtnLoading,
    handleResetForm,
    handleSubmitForm,
  }
}

export default useEditPage
