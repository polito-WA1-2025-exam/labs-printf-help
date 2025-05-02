import {Container} from 'react-bootstrap';
import {useState} from 'react';

import HeaderSteps from '../components/HeaderSteps';
import GridComponent from '../components/GridComponent';

import BowlClass from '../modules/bowl.mjs'; // Import the Bowl class

export default function Order() {
    const emptyBowl = new BowlClass(); // Create an empty bowl instance

    const [activeStep, setActiveStep] = useState(1);
    const totalSteps = 5; // Total number of steps

    const [bowl, setBowl] = useState(); // Initialize bowl state

    const updateSize = (size) => {
        setBowl((prevBowl) => {
            prevBowl.setSize(size); // Set the size of the bowl
            return prevBowl; // Return the updated bowl
        })
    }

    const updateBase = (base) => {
        setBowl((prevBowl) => {
            prevBowl.setBase(base); // Set the base of the bowl
            return prevBowl; // Return the updated bowl
        })
    }

    const updateProteins = (proteins) => {
        setBowl((prevBowl) => {
            prevBowl.setProteins(proteins); // Set the proteins of the bowl
            return prevBowl; // Return the updated bowl
        })
    }
    
    const updateIngredients = (ingredients) => {
        setBowl((prevBowl) => {
            prevBowl.setIngredients(ingredients); // Set the ingredients of the bowl
            return prevBowl; // Return the updated bowl
        })
    }

    const bowlSizes = [
        { 
            id: 1, 
            title: "Regular",
            content: "Regular bowls include one protein and up to 4 ingredients (minimum 1, optionally repeated). ",
            image: "../assets/test2.png"
        },
        { 
            id: 2, 
            title: "Medium",
            content: "Medium bowls include two proteins and up to 4 ingredients (minimum 1, optionally repeated). ",
            image: "../assets/test2.png"
        },
        { 
            id: 3, 
            title: "Large",
            content: "Large bowls include three proteins and up to 6 ingredients (minimum 1, optionally repeated).",
            image: "../assets/test2.png"
        }
    ];

    const bowlBases = [
        { 
            id: 1, 
            title: "Rice",
            content: "Rice is a staple food in many cultures and is a great source of carbohydrates.",
            image: "../assets/test2.png"
        },
        { 
            id: 2, 
            title: "Black Rice",
            content: "Black rice is a whole grain that is high in fiber and antioxidants.",
            image: "../assets/test2.png"
        },
        { 
            id: 3, 
            title: "Salad",
            content: "Salad is a healthy option that is low in calories and high in nutrients.",
            image: "../assets/test2.png"
        }
    ];

    const bowlProteins = [
        { 
            id: 1, 
            title: "Tuna",
            content: "Tuna is a great source of omega-3 fatty acids and protein.",
            image: "../assets/test2.png"
        },
        { 
            id: 2, 
            title: "Chicken",
            content: "Chicken is a lean protein that is low in fat and high in protein.",
            image: "../assets/test2.png"
        },
        { 
            id: 3, 
            title: "Salmon",
            content: "Salmon is a fatty fish that is high in omega-3 fatty acids and protein.",
            image: "../assets/test2.png"
        },
        { 
            id: 4, 
            title: "Tofu",
            content: "Tofu is a great plant-based protein option that is low in calories.",
            image: "../assets/test2.png"
        }
    ];

    const bowlIngredients = [
        { 
            id: 1, 
            title: "Avoacado",
            content: "Avoacado is a great source of healthy fats and fiber.",
            image: "../assets/test2.png"
        },
        {
            id: 2, 
            title: "Ananas",
            content: "Ananas is a tropical fruit that is high in vitamin C and manganese.",
            image: "../assets/test2.png"
        },
        { 
            id: 3, 
            title: "Cashew nuts",
            content: "Cashew is a nut that is high in healthy fats and protein.",
            image: "../assets/test2.png"
        },
        { 
            id: 4, 
            title: "Kale",
            content: "Kale is a leafy green vegetable that is high in vitamins A, C, and K.",
            image: "../assets/test2.png"
        },
        { 
            id: 5, 
            title: "Mango",
            content: "Mango is a tropical fruit that is high in vitamins A and C.",
            image: "../assets/test2.png"
        },
        { 
            id: 6, 
            title: "Peppers",
            content: "Peppers are a great source of vitamins A and C, and are low in calories.",
            image: "../assets/test2.png"
        },
        {
            id: 7,
            title: "Corn",
            content: "Corn is a starchy vegetable that is high in fiber and vitamins.",
            image: "../assets/test2.png"
        },
        {
            id: 8,
            title: "Wakame",
            content: "Wakame is a type of seaweed that is high in vitamins and minerals.",
            image: "../ assets/test2.png"
        },
        {
            id: 9,
            title: "Tomatoes",
            content: "Tomatoes are a great source of vitamins A and C, and are low in calories.",
            image: "../assets/test2.png"
        },
        {
            id: 10,
            title: "Carrots",
            content: "Carrots are a great source of vitamins A and C, and are low in calories.",
            image: "../assets/test2.png"
        },
        {
            id: 11,
            title: "Salad",
            content: "Salad is a healthy option that is low in calories and high in nutrients.",
            image: "../assets/test2.png"
        }
    ];

    return (
        <Container>
            <HeaderSteps totalSteps={totalSteps} activeStep={activeStep} setActiveStep={setActiveStep} />
            {(() => {
                const titles = [
                    "Select Bowl Size",
                    "Select Bowl Base",
                    "Select Proteins",
                    "Select Ingredients",
                    "Review your order"
                ];

                const items = [
                    bowlSizes,
                    bowlBases,
                    bowlProteins,
                    bowlIngredients
                ];

                const updateFunctions = [
                    updateSize,
                    updateBase,
                    updateProteins,
                    updateIngredients
                ];

                if (activeStep >= 1 && activeStep <= 4) {
                    return (
                        <>
                            <h2 className='text-center mb-4'>{titles[activeStep - 1]}</h2>
                            <GridComponent
                                items={items[activeStep - 1]}
                                updateFunction={updateFunctions[activeStep - 1]} // Pass the corresponding update function
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                            />
                        </>
                    );
                } else if (activeStep === 5) {
                    return (
                        <>
                            <h2 className='text-center mb-4'>{titles[activeStep - 1]}</h2>
                        </>
                    );
                } else {
                    return <h2 className='text-center mb-4'>Something went wrong try again!</h2>;
                }
            })()}
        </Container>
    );
}