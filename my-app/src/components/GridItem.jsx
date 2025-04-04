const GridItem = ({ title, content }) => {
    return (
      <div className="grid-item">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  };
  
  export default GridItem;