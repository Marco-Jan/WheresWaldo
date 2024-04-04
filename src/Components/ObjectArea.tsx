import { MouseEvent } from 'react';

const ObjectArea = () => {

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log(`X: ${x}, Y: ${y}`);
        handleFoundObject(x, y);
    };

    const handleFoundObject = (x: number, y: number) => {
    // Überprüfen, ob die Koordinaten innerhalb des definierten Bereichs für "Skull" liegen
    if (x > 833 && x < 860 && y > 176 && y < 207) { // Korrigierte Bedingungen
      console.log('Skull found');
    }
  };

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'absolute', 
                top: 0,
                left: 0,
                width: '100%',
                height: '100%', 
                cursor: 'pointer',
                backgroundColor: 'transparent', 
            }}
        >
            
        </div>
    );
};

export default ObjectArea;
