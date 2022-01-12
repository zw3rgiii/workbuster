console.log(0);
Array.prototype.forEach.call(document.querySelectorAll('.file-upload__button'), function(button) {
    console.log(1);
    const hiddenInput = button.parentElement.querySelector('.file-upload__input');
    const label = button.parentElement.querySelector('.file-upload__label');
    const defaultLabelText = 'No File(s) Selected';

    label.title = defaultLabelText;
    label.innerText = defaultLabelText;

    button.addEventListener('click', function() {
        hiddenInput.click();
    });

    hiddenInput.addEventListener('change', function() {
        console.log(hiddenInput.files[0]);
        const filenameList = Array.prototype.map.call(hiddenInput.files, function(file) {
            return file.name;
        });
        console.log(filenameList);
        label.innerText = filenameList.join('\n') || defaultLabelText;
        label.title = label.textContent;
    });
});