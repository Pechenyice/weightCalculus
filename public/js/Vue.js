
window.addEventListener('DOMContentLoaded', () => {

    let type = 'Milky';

    let themes = document.getElementsByClassName('theme__option');
    let root = document.documentElement;

    themes[0].addEventListener('click', () => {
        if (themes[0].classList.contains('theme__option_active')) return;
        localStorage.setItem('theme', 0);
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
        localStorage.setItem('theme', 1);
        document.getElementsByClassName('theme__activator')[0].style.transform = 'translateX(73px)';
        themes[0].classList.remove('theme__option_active');
        themes[1].classList.add('theme__option_active');
        root.style.setProperty('--background-color', "rgb(48, 48, 48)");
        root.style.setProperty('--background-accent-color', "rgb(231, 221, 74)");
        root.style.setProperty('--accent-color', "rgb(201, 187, 0)");
        root.style.setProperty('--content-color', "rgb(48, 48, 48)");
    });

    let theme = localStorage.getItem('theme');
    
    if (theme == 0) themes[0].click();
    if (theme == 1) themes[1].click();

    let info = new Vue({
        el: '#info',
        data: {
            age: 0,
            weight: 0,
            height: 0,
            sex: 'man'
        },
        methods: {
            update: async function() {
                let url = `/api/updateUser`
                let resp = await fetch(url, {
                    method: 'POST',
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    mode: 'same-origin',
                    body: JSON.stringify({
                        age: this.age,
                        weight: this.weight,
                        height: this.height,
                        sex: this.sex
                    })
                });
        
                try {
                    resp = await resp.json();
        
                    if (resp.status == 'error') alert(resp.message);
                } catch {}
            }
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

                this.registerMeal();

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
            },
            registerMeal: async function() {
                let url = `/api/registerMeal`
                let resp = await fetch(url, {
                    method: 'POST',
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    mode: 'same-origin',
                    body: JSON.stringify({
                        type: type,
                        name: this.newName,
                        cal: this.newCal
                    })
                });
        
                try {
                    resp = await resp.json();
        
                    if (resp.status == 'error') alert(resp.message);
                } catch {}
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

    let me = null;

    (async function() {
        let url = `/api/getMe`
        let resp = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            mode: 'same-origin'
        });

        resp = await resp.json();

        if (resp.status == 'error') alert(resp.message);

        document.getElementsByClassName('profile__name')[0].innerHTML = `${resp.name} ${resp.surname}`;
        info.age = resp.age;
        info.weight = resp.weight;
        info.height = resp.height;
        info.sex = resp.sex;
    })();

    (async function() {
        let url = `/api/getMeals`
        let resp = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            mode: 'same-origin'
        });

        resp = await resp.json();

        if (resp.status == 'error') alert(resp.message);

        for (let e of resp.data) {
            ingrs.meals[e.type].push({name: e.name, cal: e.cal});
        }
    })();

    document.getElementsByClassName('profile__action')[0].addEventListener('click', async () => {
        let url = `/api/exit`
        let resp = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            mode: 'same-origin'
        });

        try {
            resp = await resp.json();

            if (resp.status == 'error') alert(resp.message);
        } catch {}

        location.replace('/auth');
    });

});
