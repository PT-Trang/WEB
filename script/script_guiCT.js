function addIngredient() {
    const container = document.getElementById('ingredients-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'ingredients[]';
    input.required = true;
    input.className = 'recipe-form-input';
    input.placeholder = 'VD: 1 thìa đường';
    container.appendChild(input);
}

function removeIngredient() {
    const container = document.getElementById('ingredients-container');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) container.removeChild(inputs[inputs.length - 1]);
}

function addStep() {
    const container = document.getElementById('steps-container');
    const stepNumber = container.children.length + 1;
    const wrapper = document.createElement('div');
    wrapper.className = 'recipe-form-step';

    const label = document.createElement('span');
    label.className = 'recipe-form-step-label';
    label.textContent = `Bước ${stepNumber}:`;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'steps[]';
    input.required = true;
    input.className = 'recipe-form-input recipe-form-flex';
    input.placeholder = `Mô tả bước ${stepNumber}...`;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
}

function removeStep() {
    const container = document.getElementById('steps-container');
    const steps = container.querySelectorAll('div');
    if (steps.length > 1) {
        container.removeChild(steps[steps.length - 1]);
        updateStepNumbers();
    }
}

function updateStepNumbers() {
    const steps = document.querySelectorAll('#steps-container > div');
    steps.forEach((step, index) => {
        const label = step.querySelector('span');
        const input = step.querySelector('input');
        const num = index + 1;
        label.textContent = `Bước ${num}:`;
        input.placeholder = `Mô tả bước ${num}...`;
    });
}

function previewThumbnail() {
    const file = document.getElementById('thumbnail').files[0];
    const preview = document.getElementById('thumbnail-preview');
    preview.innerHTML = '';
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'recipe-form-cover';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function previewImages() {
    const files = document.getElementById('image').files;
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'recipe-form-img-thumb';
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('🎉 Cảm ơn bạn đã gửi công thức cho chúng tôi!');
});
