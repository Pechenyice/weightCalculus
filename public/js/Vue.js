
window.addEventListener('DOMContentLoaded', () => {

    let type = 'Milky';

    let themes = document.getElementsByClassName('theme__option');
    let root = document.documentElement;

    themes[0].addEventListener('click', () => {
        if (themes[0].classList.contains('theme__option_active')) return;
        document.getElementsByClassName('theme__activator')[0].style.transform = 'translateX(0px)';
        themes[1].classList.remove('theme__option_active');
        themes[0].classList.add('theme__option_active');
        root.style.setProperty('--background-color', "#fff");
        root.style.setProperty('--background-accent-color', "#00a2ff");
        root.style.setProperty('--accent-color', "#0083cf");
        root.style.setProperty('--content-color', "#fff");
    });

    themes[1].addEventListener('click', () => {
        if (themes[1].classList.contains('theme__option_active')) return;
        document.getElementsByClassName('theme__activator')[0].style.transform = 'translateX(73px)';
        themes[0].classList.remove('theme__option_active');
        themes[1].classList.add('theme__option_active');
        root.style.setProperty('--background-color', "rgb(48, 48, 48)");
        root.style.setProperty('--background-accent-color', "rgb(231, 221, 74)");
        root.style.setProperty('--accent-color', "rgb(201, 187, 0)");
        root.style.setProperty('--content-color', "rgb(48, 48, 48)");
    });

    let info = new Vue({
        el: '#info',
        data: {
            age: 30,
            weight: 100,
            height: 100,
            sex: 'man'
        }   
    });

    let addMeal = new Vue({
        el: '#addMeal',
        data: {
            newName: "",
            newCal: null,
        },
        methods: {
            addIngr: function (event) {
                if (!(this.newName) || this.newCal == null) {
                    alert('You should enter name and calories of new Ingridient!');
                    return;
                }

                ingrs.meals[type].push({name: this.newName, cal: +this.newCal});

                this.newCal = null;
                this.newName = "";
            },
            setType: function(index, typer) {
                let cookers = document.getElementById('addMeal').getElementsByClassName('cooking__cook');
                
                for (let cooker of cookers) {
                    if (cooker.classList.contains('cooking__cook_active')) cooker.classList.remove('cooking__cook_active');
                }

                type = cookers[index].dataset.type;
                cookers[index].classList.add('cooking__cook_active');
            }
        }
    });

    let ingrs = new Vue({
        el: '#ingrs',
        data: {
            meals: {
                "Milky": [{name: 'Milk', cal: 100}, {name: 'Egg', cal: 100}, {name: 'Cheese', cal: 100}],
                "Drink": [{name: 'Water', cal: 10}, {name: 'Pepsi', cal: 100}, {name: 'Wine', cal: 100}],
                "Fruit": [{name: 'Milk', cal: 100}, {name: 'Milk', cal: 100}, {name: 'Milk', cal: 100}],
                "Green": [{name: 'Carrot', cal: 50}, {name: 'Cabbage', cal: 50}, {name: 'Celery', cal: 0}],
                "Meat": [{name: 'Pork', cal: 250}, {name: 'Mutton', cal: 150}, {name: 'Beef', cal: 200}],
                "Fish": [{name: 'Apple', cal: 30}, {name: 'Banana', cal: 30}, {name: 'Grapes', cal: 50}],
            }
        },
        methods: {
            calcIngr: function (meal) {
                calc.ingrs.push(meal);
            }
        }
    });

    let calc = new Vue({
        el: '#calc',
        data: {
            weight: 100,
            height: 100,
            sex: 'man',
            ingrs: []
        },
        methods: {
            reset: function() {
                this.ingrs = [];
            }
        },
        computed: {
            calculatedTarget: function() {
                let tmp = (info.sex == 'man') ? 5 : -161; 
                return info.weight * 10 + 6.25 * info.height - 5 * info.age + tmp;
            },

            cals: function() {
                let res = 0;
                for (let i of this.ingrs) res+= i.cal;
                return res;
            }
        }
    });

});
