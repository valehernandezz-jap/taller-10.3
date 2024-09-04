document.addEventListener('DOMContentLoaded', () => {
  const studentForm = document.getElementById('student-form')
  const studentNameInput = document.getElementById('student-name')
  const studentList = document.getElementById('student-list')
  const filterInput = document.getElementById('filter')
  const sortSelect = document.getElementById('sort')

  // Cargo estudiantes del localStorage
  function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || []
    return students
  }

  // Guardo estudiantes en el localStorage
  function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students))
  }

  // Renderizo los estudiantes en la UI
  function renderStudents() {
    const students = loadStudents()
    const filterText = filterInput.value.toLowerCase()
    const sortOrder = sortSelect.value

    let filteredStudents = students.filter((student) =>
      student.toLowerCase().includes(filterText)
    )
    if (sortOrder === 'asc') {
      filteredStudents.sort()
    } else {
      filteredStudents.sort().reverse()
    }

    studentList.innerHTML = ''
    filteredStudents.forEach((student) => {
      const li = document.createElement('li')
      li.textContent = student

      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Eliminar'
      deleteButton.classList.add('delete')
      deleteButton.addEventListener('click', () => {
        deleteStudent(student)
      })

      li.appendChild(deleteButton)
      studentList.appendChild(li)
    })
  }

  // Agrego estudiante a la lista
  function addStudent(studentName) {
    const students = loadStudents()
    students.push(studentName)
    saveStudents(students)
    renderStudents()
  }

  // Elimino estudiante de la lista
  function deleteStudent(studentName) {
    let students = loadStudents()
    students = students.filter((student) => student !== studentName)
    saveStudents(students)
    renderStudents()
  }

  studentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const studentName = studentNameInput.value.trim()
    if (studentName) {
      addStudent(studentName)
      studentNameInput.value = ''
    }
  })

  filterInput.addEventListener('input', renderStudents)
  sortSelect.addEventListener('change', renderStudents)

  // Renderizo inicialmente
  renderStudents()
})
