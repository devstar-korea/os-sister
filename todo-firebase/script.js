// 할일 데이터 (로컬 스토리지에서 불러오기)
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// DOM 요소
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 할일 저장
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 할일 렌더링
function renderTodos() {
  if (todos.length === 0) {
    todoList.innerHTML = '<li class="empty-message">할일이 없습니다. 새로운 할일을 추가해보세요!</li>';
    return;
  }

  todoList.innerHTML = todos.map((todo, index) => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}" data-index="${index}">
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} />
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <div class="btn-group">
        <button class="edit-btn">수정</button>
        <button class="delete-btn">삭제</button>
      </div>
    </li>
  `).join('');
}

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 할일 추가
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    text: text,
    completed: false
  });

  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
}

// 할일 삭제
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// 할일 완료 토글
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// 할일 수정 모드
function editTodo(index, li) {
  const todo = todos[index];
  const todoText = li.querySelector('.todo-text');
  const btnGroup = li.querySelector('.btn-group');

  // 수정 입력창으로 변경
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'todo-edit-input';
  input.value = todo.text;
  todoText.replaceWith(input);

  // 버튼 변경
  btnGroup.innerHTML = `
    <button class="save-btn">저장</button>
    <button class="cancel-btn">취소</button>
  `;

  input.focus();
  input.select();

  // Enter 키로 저장
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveTodoEdit(index, input.value);
    } else if (e.key === 'Escape') {
      renderTodos();
    }
  });
}

// 할일 수정 저장
function saveTodoEdit(index, newText) {
  const text = newText.trim();
  if (!text) {
    alert('할일을 입력해주세요.');
    return;
  }

  todos[index].text = text;
  saveTodos();
  renderTodos();
}

// 이벤트 리스너
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

todoList.addEventListener('click', (e) => {
  const li = e.target.closest('.todo-item');
  if (!li) return;

  const index = parseInt(li.dataset.index);

  if (e.target.classList.contains('todo-checkbox')) {
    toggleTodo(index);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTodo(index);
  } else if (e.target.classList.contains('edit-btn')) {
    editTodo(index, li);
  } else if (e.target.classList.contains('save-btn')) {
    const input = li.querySelector('.todo-edit-input');
    saveTodoEdit(index, input.value);
  } else if (e.target.classList.contains('cancel-btn')) {
    renderTodos();
  }
});

// 초기 렌더링
renderTodos();
