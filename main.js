document.addEventListener('DOMContentLoaded', function() {
    // Obteniendo elementos del DOM
    const billInput = document.getElementById('bill-input');
    const tipButtons = document.querySelectorAll('.tips');
    const customTipInput = document.querySelector('.tip-custom');
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

        // Obtener el porcentaje de propina seleccionado
        if (this.classList.contains('tip-custom')) {
            tipPercentage = parseFloat(customTipInput.value);
        } else {
            tipPercentage = parseFloat(this.textContent);
        }

        // Calcular la propina y el total
        const tipAmount = (billAmount * tipPercentage) / 100 / numberOfPeople;
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
    });
});
