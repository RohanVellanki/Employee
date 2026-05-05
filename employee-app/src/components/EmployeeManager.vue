<template>
  <div class="container mt-5 mb-5">
    <h1 class="mb-4 text-center">Employee Management System</h1>
    <div class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveEmployee">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" v-model="form.name" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label for="designation" class="form-label">Designation</label>
              <input type="text" id="designation" v-model="form.designation" class="form-control" required />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="department" class="form-label">Department</label>
              <input type="text" id="department" v-model="form.department" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label for="salary" class="form-label">Salary</label>
              <input type="number" id="salary" v-model="form.salary" class="form-control" required min="0" />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" v-if="isEditing" class="btn btn-secondary me-2" @click="cancelEdit">Cancel</button>
            <button type="submit" class="btn btn-success">{{ isEditing ? 'Update' : 'Save' }}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Employee Records</h5>
        <button class="btn btn-sm btn-outline-light" @click="fetchEmployees">Refresh</button>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Salary</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="6" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="employees.length === 0">
                <td colspan="6" class="text-center py-4 text-muted">No employees found.</td>
              </tr>
              <tr v-else v-for="emp in employees" :key="emp.id">
                <td>{{ emp.id }}</td>
                <td>{{ emp.name }}</td>
                <td>{{ emp.designation }}</td>
                <td>{{ emp.department }}</td>
                <td>${{ Number(emp.salary).toLocaleString() }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-primary me-2" @click="editEmployee(emp)">Edit</button>
                  <button class="btn btn-sm btn-danger" @click="deleteEmployee(emp.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const API_URL = 'https://69f9ab42c509a40d3aa2fb21.mockapi.io/employees' 
const employees = ref([])
const loading = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const form = ref({
  name: '',
  designation: '',
  department: '',
  salary: ''
})
const fetchEmployees = async () => {
  if (API_URL === 'YOUR_MOCKAPI_URL_HERE') {
    console.warn('Please set your MockAPI URL in src/components/EmployeeManager.vue')
    return
  }
  loading.value = true
  try {
    const response = await axios.get(API_URL)
    employees.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
    alert('Failed to fetch employees. Please check console and API URL.')
  } finally {
    loading.value = false
  }
}
const saveEmployee = async () => {
  if (API_URL === 'YOUR_MOCKAPI_URL_HERE') {
    alert('Please set your MockAPI URL in src/components/EmployeeManager.vue')
    return
  }
  try {
    if (isEditing.value) {
      await axios.put(`${API_URL}/${editingId.value}`, form.value)
      alert('Employee updated successfully!')
    } else {
      await axios.post(API_URL, form.value)
      alert('Employee added successfully!')
    }
    resetForm()
    fetchEmployees()
  } catch (error) {
    console.error('Error saving employee:', error)
    alert('Failed to save employee. Check console for details.')
  }
}
const deleteEmployee = async (id) => {
  if (!confirm('Are you sure you want to delete this employee?')) return
  
  try {
    await axios.delete(`${API_URL}/${id}`)
    alert('Employee deleted successfully!')
    fetchEmployees()
  } catch (error) {
    console.error('Error deleting employee:', error)
    alert('Failed to delete employee. Check console for details.')
  }
}
const editEmployee = (emp) => {
  isEditing.value = true
  editingId.value = emp.id
  form.value = {
    name: emp.name,
    designation: emp.designation,
    department: emp.department,
    salary: emp.salary
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const cancelEdit = () => {
  resetForm()
}
const resetForm = () => {
  isEditing.value = false
  editingId.value = null
  form.value = {
    name: '',
    designation: '',
    department: '',
    salary: ''
  }
}
onMounted(() => {
  fetchEmployees()
})
</script>
<style scoped>
</style>
