document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const habitTracker = document.getElementById('habitTracker');
    const habitsDiv = document.getElementById('habits');
    const addHabitButton = document.getElementById('addHabit');
  
    let habits = JSON.parse(localStorage.getItem('habits')) || [];
  
    const saveHabits = () => {
      localStorage.setItem('habits', JSON.stringify(habits));
    };
  
    const displayHabits = () => {
      habitsDiv.innerHTML = '';
      habits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit');
        habitDiv.innerHTML = `
          <span>${habit.name}</span>
          <input type="checkbox" ${habit.checked ? 'checked' : ''}>
        `;
        const checkbox = habitDiv.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          habit.checked = checkbox.checked;
          saveHabits();
        });
  
        // Check if the habit was missed
        const createdDate = new Date(habit.createdDate);
        const now = new Date();
        const diffTime = Math.abs(now - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        if (!habit.checked && diffDays > 2) {
          habitDiv.classList.add('missed');
        } else if (habit.checked) {
          habitDiv.classList.add('checked');
        }
  
        habitsDiv.appendChild(habitDiv);
      });
    };
  
    const addHabit = () => {
      const habitName = document.getElementById('habitName').value;
      if (habitName) {
        const newHabit = {
          name: habitName,
          checked: false,
          createdDate: new Date().toISOString()
        };
        habits.push(newHabit);
        saveHabits();
        displayHabits();
        document.getElementById('habitName').value = '';
      }
    };
  
    menuButton.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  
    loginButton.addEventListener('click', () => {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      habitTracker.style.display = 'none';
    });
  
    registerButton.addEventListener('click', () => {
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
      habitTracker.style.display = 'none';
    });
  
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      habitTracker.style.display = 'none';
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
    });
  
    document.getElementById('loginSubmit').addEventListener('click', () => {
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        habitTracker.style.display = 'block';
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        displayHabits();
      } else {
        alert('Invalid login credentials');
      }
    });
  
    document.getElementById('registerSubmit').addEventListener('click', () => {
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;
      let users = JSON.parse(localStorage.getItem('users')) || [];
  
      if (users.find(user => user.username === username)) {
        alert('Username already exists');
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
      }
    });
  
    addHabitButton.addEventListener('click', addHabit);
  
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      habitTracker.style.display = 'block';
      displayHabits();
    } else {
      loginForm.style.display = 'block';
    }
  });
  