const formElement = document.querySelector('form')

const amountInput = document.querySelector('#amount')
const expenseInput = document.querySelector('#expense')
const categoryInput = document.querySelector('#category')

const expensesListElement = document.querySelector('ul')

amountInput.oninput = () => {
  let value = amountInput.value.replace(/\D/g, '')

  value = Number(value) / 100

  amountInput.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

formElement.onsubmit = (event) => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expenseInput.value,
    category_id: categoryInput.value,
    category_name: categoryInput.options[categoryInput.selectedIndex].text,
    amount: amountInput.value.toUpperCase().replace('R$', '').trim(),
    created_at: new Date(),
  }

  addExpense(newExpense)
}

function addExpense(newExpense) {
  try {
    // Expense Item
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    // Expense Icon
    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    // Expense Info
    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-info')

    const expenseDescription = document.createElement('strong')
    expenseDescription.textContent = newExpense.expense

    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    expenseInfo.append(expenseDescription, expenseCategory)

    // Expense Value
    const expenseAmount = document.createElement('span')
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount}`

    // Remove Icon
    const removeIcon = document.createElement('img')
    removeIcon.classList.add('remove-icon')
    removeIcon.setAttribute('src', 'img/remove.svg')
    removeIcon.setAttribute('alt', 'Remover despesa')

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    expensesListElement.append(expenseItem)
  } catch (error) {
    alert('Não foi possível adicionar a despesa. Tente novamente mais tarde.')

    console.error(error)
  }
}
