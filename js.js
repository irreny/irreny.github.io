// --- Data used by tables and accordions ---
const button = document.querySelector('button');

/* Тут на кнопку навешиваем обрабочик, который ждёт клика и тогда запустит логику */
button.addEventListener('click', function() {
	alert('Тестирование показывает наличие проблем, а не их отсутствие')
})

const sqlKnowledge = [
  // ... (данные SQL остаются без изменений)
  {name:'Функции агрегирования', example:"COUNT(), SUM(), AVG(), MIN(), MAX()"},
  {name:'Операторы сравнения', example:"=, !=, >, <, >=, <="},
  {name:'Логические операторы', example:"AND, BETWEEN, IN, LIKE, NOT, OR, IS NULL, IS NOT NULL"},  
  {name:'JOIN', example:"INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN"},
  {name:'Группировка и сортировка', example:"GROUP BY, HAVING, ORDER BY (DESC, ASC)"},
  {name:'Другие', example:"AS, UNION, DISTINCT, UPPER, LOWER, EXTRACT, ROUND, FLOOR"},
  {name:'Виды связей', example:"Один ко многим, Один к одному, Многие ко многим"},
  {name:'Условная логика (CASE)', example:"CASE WHEN, THEN, ELSE"}
];

const pyKnowledge = [
  // ... (данные Python остаются без изменений)
  {topic:'Простые типы данных', example:"int, float, str, bool:\nx = 10 # int"},
  {topic:'Ветвления', example:"if/elif/else:\nx = 5\nif x>0: print('P')\nelse: print('N')\nОтвет: P"},
  {topic:'Итерации и циклы', example:"for/while:\ntotal = 0\nfor i in range(1, 4): total += i\nprint(total)\nОтвет: 6"},
  {topic:'Коллекции (List)', example:"my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)\nОтвет: [1, 2, 3, 4]"},
  {topic:'Коллекции (Dict)', example:"d = {'a': 1, 'b': 2}\nprint(d['b'])\nОтвет: 2"},
];

const sqlAccordionItems = [
  {title:'Пример использования LEFT JOIN', body:`SELECT t.id, t.title, p.name FROM test_cases t\nLEFT JOIN projects p ON p.id = t.project_id;`},
  {title:'Пример использования FULL JOIN', body:`SELECT c.name, o.order_id FROM customers c\nFULL JOIN orders o ON c.id = o.customer_id;`},
  {title:'Пример вложенного запроса (подзапроса)', body:`SELECT title, status FROM test_cases\nWHERE project_id IN (SELECT id FROM projects WHERE status = 'active');`},
  {title:'Пример добавления строки', body:`INSERT INTO Goods (good_id, good_name) SELECT (SELECT COUNT(*) FROM Goods) + 1, Cheese`}
];

const pyAccordionItems = [
  {title:'Пример: коллекции и итерации', body:`users = [{'id':1,'name':'Ann'},{'id':2,'name':'Bob'}]\nnames = [u['name'] for u in users]\nprint(names)\nОтвет: ['Ann', 'Bob']`},
  {title:'ООП: простой пример', body:`class TestCase:\n  def __init__(self, id, title):\n    self.id = id\n    self.title = title\ntc = TestCase(101, 'Auth Flow')\nprint(f'{tc.id}: {tc.title}')\nОтвет: 101: Auth Flow`},
  {title:'Работа с JSON', body:`import json\ndata = json.loads('{\"key\": \"value\"}')\nprint(data)\nОтвет: {'key': 'value'}`}
];


// --- Render tables and Static Blocks ---
function renderTable(data, tbodySelector){
  const tbody = document.querySelector(tbodySelector); 
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach(r => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); 
    td1.textContent = r.name || r.topic; 
    const td2 = document.createElement('td'); 
    td2.innerText = r.example;
    tr.append(td1, td2); 
    tbody.appendChild(tr);
  });
}

/**
 * renderStaticBlocks
 * Отображает элементы (которые раньше были в accordion) как обычные видимые блоки.
 */
function renderStaticBlocks(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'static-item';
    div.innerHTML = `
      <div class="title">${item.title}</div>
      <pre class="content">${item.body}</pre>
    `;
    container.appendChild(div);
  });
}



// =========================================================================
// ПРИМЕР DATA ANALYSIS (КОД И ВИЗУАЛИЗАЦИЯ) - ОСТАВЛЕН БЕЗ ИЗМЕНЕНИЙ
// =========================================================================

// Старый код аналитики удален из JS, т.к. он теперь статичен в HTML:
/*
const dataAnalysisExample = `
...
`
*/

const analysisResults = {
    total_tests: 6,
    avg_time: 9.0,
    pass_rate: 0.50,
    critical_bugs: 1,
    status_counts: {
        'Passed': 3,
        'Failed': 2,
        'Blocked': 1
    }
};

function renderDashboard(results) {
    const metricsContainer = document.getElementById('dashboard-metrics');
    const chartContainer = document.getElementById('status-chart');
    
    // Этот код не будет выполнен, т.к. элементы #dashboard-metrics и #status-chart
    // были удалены из index.html в пользу статической секции #data-analysis.
    // Оставляем функцию пустой, чтобы избежать ошибок, или удаляем,
    // если дальнейшая логика JS не зависит от нее.
    if (metricsContainer) { metricsContainer.innerHTML = ''; }
    if (chartContainer) { chartContainer.innerHTML = ''; }
}


// --- Utility: сделать таблицы сортируемыми по клику на th[data-key]
function enableSortableTables() {
  document.querySelectorAll('th[data-key]').forEach(th => {
    th.addEventListener('click', () => {
      const table = th.closest('table');
      if (!table) return;
      const tbody = table.querySelector('tbody');
      if (!tbody) return;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const idx = Array.from(th.parentNode.children).indexOf(th);
      const asc = th.dataset.asc !== '1'; 
      th.dataset.asc = asc ? '1' : '0';
      
      rows.sort((a, b) => {
        return a.children[idx].innerText.localeCompare(b.children[idx].innerText, 'ru');
      });
      
      if (!asc) rows.reverse(); 
      
      tbody.innerHTML = ''; 
      rows.forEach(r => tbody.appendChild(r));
      
      table.querySelectorAll('tr').forEach((row, i) => {
          row.style.background = (i % 2 === 0) ? '' : '#fbfcff';
      });
    });
  });
}

// --- Lightbox / Modal для увеличения изображений ---
function enableImageZoom(selector = '.zoomable') {
  // Создаём модальное окно (один раз)
  if (document.getElementById('imageModal')) return;
  const modal = document.createElement('div');
  modal.id = 'imageModal';
  modal.style.cssText = `
    display:none;
    position:fixed;
    top:0;left:0;right:0;bottom:0;
    background:rgba(0,0,0,0.85);
    justify-content:center;
    align-items:center;
    z-index:10000;
    padding:20px;
  `;
  const img = document.createElement('img');
  img.style.maxWidth = '92%';
  img.style.maxHeight = '92%';
  img.style.borderRadius = '10px';
  img.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
  modal.appendChild(img);
  document.body.appendChild(modal);

  // open on click
  document.querySelectorAll(selector).forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', (e) => {
      img.src = el.src || el.dataset.src || '';
      modal.style.display = 'flex';
      // prevent body scroll
      document.body.style.overflow = 'hidden';
    });
  });

  // close on click outside image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // close on Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
  });
}

// --- Data Analysis Examples (для рендеринга в статические блоки) ---
const daExamples = [
    {title: 'Расчет Pass Rate', body: `pass_count = df[df['status'] == 'Passed'].shape[0]\npass_rate = pass_count / len(df)\nprint(f'{pass_rate:.2f}')`},
    {title: 'Фильтрация критических багов', body: `critical_bugs = df[df['severity'] == 'Critical']\nprint(len(critical_bugs))`},
    {title: 'Среднее время выполнения', body: `avg_time = df['exec_time_sec'].mean()\nprint(f'{avg_time:.1f} сек')`},
    {title: 'Группировка по тестировщику', body: `tester_tests = df.groupby('tester')['test_case_id'].count()\nprint(tester_tests)`}
];
/**
 * renderTwoColumnStaticBlocks
 * Отображает элементы в два контейнера (две колонки), используя четность.
 * @param {string} containerId - ID родительского элемента (должен быть .grid)
 * @param {Array<Object>} items - Массив объектов {title, body}
 */
function renderTwoColumnStaticBlocks(containerId, items) {
  const gridContainer = document.getElementById(containerId);
  if (!gridContainer) return;
  
  // Создаем две колонки внутри контейнера .grid
  const leftCol = document.createElement('div');
  const rightCol = document.createElement('div');
  
  gridContainer.innerHTML = ''; // Очистка
  gridContainer.appendChild(leftCol);
  gridContainer.appendChild(rightCol);

  items.forEach((item, index) => {
    const targetCol = (index % 2 === 0) ? leftCol : rightCol; // Четные (0, 2) слева, нечетные (1, 3) справа
    
    const div = document.createElement('div');
    div.className = 'static-item';
    div.innerHTML = `
      <div class="title">${item.title}</div>
      <pre class="content">${item.body}</pre>
    `;
    targetCol.appendChild(div);
  });
}

// В секции Setup on load:
document.addEventListener('DOMContentLoaded', () => {
    renderStaticBlocks('daStatic', daExamples);
});


// --- Setup on load ---
document.addEventListener('DOMContentLoaded', () => {
    // render left tables
    renderTable(sqlKnowledge, '#sqlTable tbody'); 
    renderTable(pyKnowledge, '#pyTable tbody');
    renderTwoColumnStaticBlocks('daStaticGrid', daExamples);
    // render static (non-collapsible) blocks for SQL and Python examples
    renderStaticBlocks('sqlStatic', sqlAccordionItems);
    renderStaticBlocks('pyStatic', pyAccordionItems);
    
    // РЕНДЕРИНГ БЛОКОВ DATA ANALYSIS
    renderStaticBlocks('daStatic', daExamples); // <-- НОВЫЙ ВЫЗОВ
    
    // ... (остальной код для analysisBlock, renderDashboard и т.д. можно удалить/закомментировать, 
    // так как мы используем Вариант 2, а не имитацию дашборда)
    
    // включаем сортировку таблиц по клику на заголовки
    enableSortableTables();

    // включаем zoom для картинок
    enableImageZoom('.zoomable');
});
