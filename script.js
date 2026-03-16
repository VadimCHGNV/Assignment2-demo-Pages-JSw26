
/**
 * Energy Bowl Builder
 * Author: Vadim Cheganov (Student #200609007)
 * 
 *  JavaScript Functions vid tutorial
 *    https://youtu.be/FOD408a0EzU
 *    This video helped me understand function creation and usage and some basic logic
 * 
 * Classroom Materials for Module 5 - Functions
 *    Concepts of class structure, form handling, and localStorage were learned during lessons
 * 
 *  Reddit Discussions
 *    Various posts and code cnippets from r/learnjavascript and r/webdev communities
 * 
 *  Placeholder images from random free png site
 *    
 */

// energy bowl class
class EnergyBowl {
    constructor(options) {
        this.base = options.base;
         this.fruits = options.fruits || [];
         this.toppings = options.toppings || [];
          this.addons = options.addons || [];
          this.size = options.size;
         this.instructions = options.instructions || '';
    }

    getDescription() {
        const fruitsList = this.fruits.length ? this.fruits.join(', ') : 'not selected';
       
        const toppingsList = this.toppings.length ? this.toppings.join(', ') : 'not selected';
       
        const addonsList = this.addons.length ? this.addons.join(', ') : 'not selected';
         const instructions = this.instructions ? `\n Special Instructions: ${this.instructions}` : '';
        
        return ` Base: ${this.base}
  Size: ${this.size}
  Fruits: ${fruitsList}
   Toppings: ${toppingsList}
   Add-ons: ${addonsList}${instructions}`;
    }

    calculatePrice() {
        let price = 100; // basic price for base bowl

        if (this.size === 'medium') price += 50;
         if (this.size === 'large') price += 100;

        price += this.fruits.length * 20;
         price += this.toppings.length * 20;
          price += this.addons.length * 20;

         return price;
     }

    calculateCalories() {
        let calories = 150; // basic calories for base bowl 

        // adding calories for fruits, toppings and addons
        calories += this.fruits.length * 30;   // fruits 
        calories += this.toppings.length * 40; // toppings 
        calories += this.addons.length * 35;   // addons 

        // considering size multiplier
        if (this.size === 'medium') {
             calories = Math.round(calories * 1.2);
                     
          } 
     
        else if (this.size === 'large') {
               calories = Math.round(calories * 1.4);
      }

        return calories;
    }
}

// DOM elements
const form = document.getElementById('bowl-form');
const orderDetails = document.getElementById('order-details');

const clearBtn = document.getElementById('clear-history');
const bowlImage = document.getElementById('bowl-image');



function saveToStorage(bowl) {
    const orderData = {
        base: bowl.base,
        fruits: bowl.fruits,
        toppings: bowl.toppings,
        addons: bowl.addons,
        size: bowl.size,
        instructions: bowl.instructions
    };
    localStorage.setItem('lastBowl', JSON.stringify(orderData));
}

function loadFromStorage() {
    const saved = localStorage.getItem('lastBowl');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const bowl = new EnergyBowl(data);
            renderOrder(bowl);
        } catch (e) {
            console.error('Error loading from localStorage', e);
        }
    }
}

// modify order rendering function to also update the image based on the base selection
function renderOrder(bowl) {
    const description = bowl.getDescription().replace(/\n/g, '<br>');
    const price = bowl.calculatePrice();
    const calories = bowl.calculateCalories();
    
    orderDetails.innerHTML = `
        <p>${description}</p>
        <p><strong> Total: ${price} dollars.</strong></p>
        <p><strong> Calories: ${calories}</strong></p>
    `;

    // changing picture based on base selection
    if (bowl.base === 'Acai') {
        bowlImage.src = 'imgs/vecteezy_blueberry-smoothie-bowl-with-banana-blueberries-and-granola_59041461.png';
      } 
    else if (bowl.base === 'Yogurt') {
        bowlImage.src = 'imgs/vecteezy_ai-generated-yogurt-bowl-isolated-on-transparent-background_41923890.png';
        } 
       else if (bowl.base === 'Oats') {
        bowlImage.src = 'imgs/vecteezy_healthy-oat-porridge-bowl-with-nuts-and-dried-fruits-for-a_58175391.png';
        } 
      else if (bowl.base === 'Chia Pudding') {
        bowlImage.src = 'imgs/vecteezy_delicious-banana-and-peanut-butter-oatmeal-bowl-with-caramel_70645820.png';
        } 
      else {
        bowlImage.src = 'imgs/vecteezy_a-detailed-watercolor-painting-of-an-empty-wooden-bowl-with_59053731.png';
          }
}


clearBtn.addEventListener('click', () => {
      localStorage.removeItem('lastBowl');
      orderDetails.innerHTML = '<p> Last order cleared. Make a new one!</p>';
        bowlImage.src = 'imgs/vecteezy_a-detailed-watercolor-painting-of-an-empty-wooden-bowl-with_59053731.png';
      }
    );

window.addEventListener('load', loadFromStorage);






function getFormData() {
    const base = document.querySelector('input[name="base"]:checked')?.value || '';
     const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(cb => cb.value);
    
     const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(cb => cb.value);
       const addons = Array.from(document.querySelectorAll('input[name="addons"]:checked')).map(cb => cb.value);
       const size = document.querySelector('input[name="size"]:checked')?.value || '';
     
       const instructions = document.querySelector('textarea[name="instructions"]').value.trim();

    return { base, fruits, toppings, addons, size, instructions };
}

 
// handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = getFormData();
      if (!data.base || !data.size) {

         alert('Please select a base and size!');
           return;
       }

    const bowl = new EnergyBowl(data);
    renderOrder(bowl);
    console.log(bowl.getDescription()); // show description in console
});