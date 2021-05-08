
window.addEventListener('DOMContentLoaded', () => {

    var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        }
    });

    var app2 = new Vue({
        el: '#app2',
        data: {
            meals: [
            { name: 'Learn JavaScript', icon: 'fas fa-hamburger' },
            { name: 'Learn Vue', icon: 'fas fa-hamburger' },
            { name: 'Build something awesome', icon: 'fas fa-hamburger' }
            ]
        }
    });

    // document.getElementsByTagName('button')[0].addEventListener('click', () => {
    //     app2.meals.push({ name: 'WTF', icon: 'fas fa-hamburger' });
    // });
});
