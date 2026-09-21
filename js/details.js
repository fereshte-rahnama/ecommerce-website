// Product Information Tabs

const infoButtons = document.querySelectorAll('.info-buttons button');
const infoPanels = document.querySelectorAll('.info-panel');

infoButtons.forEach((button, index) => {

    button.addEventListener('click', () => {

        // Remove active class from all buttons
        infoButtons.forEach((btn) => {
            btn.classList.remove('active');
        });

        // Hide all panels
        infoPanels.forEach((panel) => {
            panel.classList.remove('active');
        });

        // Activate clicked button
        button.classList.add('active');

        // Show matching panel
        infoPanels[index].classList.add('active');

    });

});