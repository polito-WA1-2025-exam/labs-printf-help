import React from 'react';
import GridComponent from '../components/GridComponent';
import HeaderSteps from '../components/HeaderSteps';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const gridItems = [
    {
      id: 1,
      title: "Item 1",
      content: "This is a sample grid item. The layout will adjust automatically.",
      image: "../assets/test2.png"
    },
    {
      id: 2,
      title: "Item 2",
      content: "This is another sample grid item.",
      image: "../assets/test2.png"
    },
    {
      id: 3,
      title: "Item 3",
      content: "Each item will maintain proper spacing and alignment.",
      image: "../../public/assets/test2.png"
    },
    {
      id: 4,
      title: "Item 4",
      content: "The grid uses Bootstrap's responsive column system.",
      image: "../../public/assets/test2.png"
    },
    {
      id: 5,
      title: "Item 5",
      content: "On mobile, items will stack vertically (1 per row).",
      image: "../../public/assets/test2.png"
    },
    {
      id: 6,
      title: "Item 6",
      content: "On tablets, 2 items per row. On desktops, 3 items per row.",
      image: "../../public/assets/test2.png"
    }
  ];

  return (
    <div className="App d-flex flex-column min-vh-100">
      <main>
        <div>
          <HeaderSteps totalSteps={5} />
        </div>
        <div className="container">
          <GridComponent items={gridItems} />
        </div>
      </main>
    </div>
  );
}
