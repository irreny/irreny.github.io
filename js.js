/* Это объявление переменной, мы наши кнопку по тегу */
const button = document.querySelector('button');

/* Тут на кнопку навешиваем обрабочик, который ждёт клика и тогда запустит логику */
button.addEventListener('click', function() {
	alert('Если не думаешь, то и не болтай')
})

const stack = document.querySelector('.stack');
const groups = document.querySelectorAll('.stack__group');

stack.addEventListener('mousemove', e => {
  const rect = stack.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  groups.forEach(group => {
    const groupRect = group.getBoundingClientRect();
    // Центр облачка относительно окна
    const groupCenterX = groupRect.left + groupRect.width / 2;
    const groupCenterY = groupRect.top + groupRect.height / 2;

    // Вектор от курсора к центру облачка
    const deltaX = groupCenterX - e.clientX;
    const deltaY = groupCenterY - e.clientY;

    // Нормализуем вектор и ограничиваем максимальное смещение
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 150; // радиус влияния курсора
    const maxTranslate = 200; // максимальное смещение в px

    // Чем ближе курсор, тем сильнее смещение
    const strength = Math.max(0, (maxDistance - distance) / maxDistance);

    // Смещение с ограничением
    const translateX = (deltaX / distance) * maxTranslate * strength || 0;
    const translateY = (deltaY / distance) * maxTranslate * strength || 0;

    // Применяем трансформацию с плавным переходом
    group.style.transform = `translate(${translateX}px, ${translateY}px)`;
  });
});

// При уходе курсора из контейнера — сбросить смещение
stack.addEventListener('mouseleave', () => {
  groups.forEach(group => {
    group.style.transform = `translate(0, 0)`;
  });
});

