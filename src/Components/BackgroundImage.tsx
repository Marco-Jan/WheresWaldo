// BackgroundImage.tsx
import { useEffect, useState } from 'react';
import { Box, Dialog, DialogContentText, DialogContent , Menu, MenuItem } from '@mui/material';
import { storage, db } from '../firebase/firebaseInit';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

interface Props {
  show: boolean;
}

type Koordinaten = {
  Skull: { x1: number; x2: number; y1: number; y2: number; } | null;
  Henry: { x1: number; x2: number; y1: number; y2: number; } | null;
  ShySteve: { x1: number; x2: number; y1: number; y2: number; } | null;
};


const BackgroundImage = ({ show }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [koordinaten, setKoordinaten] = useState<Koordinaten | null>(null);
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);



  useEffect(() => {
    const fetchImage = async () => {
      const imageRef = ref(storage, 'comicwimmel.png');
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const fetchKoordinaten = async () => {
      const skullRef = doc(db, "Koordinaten", 'Skull');
      const henryRef = doc(db, "Koordinaten", 'Henry');
      const ShySteveRef = doc(db, "Koordinaten", 'ShySteve');

      const skullSnap = await getDoc(skullRef);
      const henrySnap = await getDoc(henryRef);
      const ShySteveSnap = await getDoc(ShySteveRef);

      if (skullSnap.exists() && henrySnap.exists()) {
        setKoordinaten({
          Skull: skullSnap.data() as Koordinaten['Skull'],
          Henry: henrySnap.data() as Koordinaten['Henry'],
          ShySteve: ShySteveSnap.data() as Koordinaten['ShySteve'],
        });
      } else {
        console.log("One or both documents do not exist!");
      }
    };

    fetchKoordinaten();
  }, []);



  if (!show) {
    return null;
  }



  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const boundingRect = event.currentTarget.getBoundingClientRect();

    // Relative Position des Klicks zum Bild
    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;

    console.log(`x: ${mouseX}, y: ${mouseY}`);


    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
    });

    setClickPosition({ x: mouseX, y: mouseY });
  };



  const handleSelection = (objectName: string) => {
    setSelectedObject(objectName);
    setContextMenu(null);

    if (!clickPosition || !koordinaten) return;

    const { x, y } = clickPosition;
    const objCoords = koordinaten[objectName as keyof Koordinaten];
    if (objCoords && x > objCoords.x1 && x < objCoords.x2 && y > objCoords.y1 && y < objCoords.y2) {
      console.log(`${objectName} found at position x: ${x}, y: ${y}`);
      setOpenDialog(true);
    } else {
      console.log(`${objectName} not found`);
      setOpenDialog(false)
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  if (!show) {
    return null;
  }

  return (
    <Box
      onContextMenu={handleContextMenu}
      sx={{
        display: 'flex',
        backgroundImage: `url(${imageUrl})`,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '150vw',
        minHeight: '150vh',
        overflow: 'auto',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={() => handleSelection('Skull')}>Skull</MenuItem>
        <MenuItem onClick={() => handleSelection('Henry')}>Henry</MenuItem>
        <MenuItem onClick={() => handleSelection('ShySteve')}>ShySteve</MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogContentText>
            {`${selectedObject} found`}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>

  );
};

export default BackgroundImage;