document.addEventListener('DOMContentLoaded', function() {
    // Obteniendo elementos del DOM
    const billInput = document.getElementById('bill-input');
    const tipButtons = document.querySelectorAll('.tips');
    const customTipInput = document.querySelector('.custom-input'); // Cambiado el selector
    const peopleInput = document.querySelector('.people-input');
    const tipAmountElement = document.getElementById('tip-amount');
    const totalAmountElement = document.getElementById('total-amount');
    const resetButton = document.querySelector('.reset');
    const errorLabel = document.querySelector('.error');

    // Función para calcular la propina y el total
    function calculateTip() {
        const billAmount = parseFloat(billInput.value);
        const numberOfPeople = parseInt(peopleInput.value);

        // Verificar si el valor de la cuenta y el número de personas son válidos
        if (isNaN(billAmount) || billAmount <= 0 || isNaN(numberOfPeople) || numberOfPeople <= 0) {
            errorLabel.style.display = 'block';
            return;
        } else {
            errorLabel.style.display = 'none';
        }

        let tipPercentage;

        // Eliminar la clase active-tip de todos los elementos .tips
        tipButtons.forEach(button => {
            button.classList.remove('active-tip');
        });

        // Obtener el porcentaje de propina seleccionado
        if (this === customTipInput) {
            // Verificar si el valor es válido
            if (customTipInput.value.trim() !== '') {
                tipPercentage = parseFloat(customTipInput.value) / 100;
            } else {
                // Si no hay valor, usar el porcentaje predeterminado (15%)
                tipPercentage = 0.15;
            }
            // Agregar la clase active-tip al elemento .tip-custom
            document.querySelector('.tip-custom').classList.add('active-tip');
        } else {
            tipPercentage = parseFloat(this.textContent) / 100;
            // Agregar la clase active-tip al elemento clicado
            this.classList.add('active-tip');
        }

        // Calcular la propina y el total
        const tipAmount = (billAmount * tipPercentage) / numberOfPeople;
        const totalAmount = (billAmount / numberOfPeople) + tipAmount;

        // Actualizar los elementos HTML con los resultados
        tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    }

    // Event listeners para los botones de propina y el botón de reset
    tipButtons.forEach(button => {
        button.addEventListener('click', calculateTip);
    });

    // Event listener para el input de propina personalizada
    customTipInput.addEventListener('input', calculateTip);

    // Event listener para el botón de reset
    resetButton.addEventListener('click', function() {
        billInput.value = '';
        peopleInput.value = '';
        customTipInput.value = '';
        tipAmountElement.textContent = '$0.00';
        totalAmountElement.textContent = '$0.00';

        // Eliminar la clase active-tip de todos los elementos .tips
        tipButtons.forEach(button => {
            button.classList.remove('active-tip');
        });

        // Establecer el porcentaje predeterminado como activo (15%)
        document.querySelector('.tip-15').classList.add('active-tip');
    });
});
