import { Button } from '@mui/material';
import Link from 'next/link';

const UniviseButton = () => {
  return (
    <Button variant="contained" color="error" sx={{ margin: 1 }} component={Link} href="/">
      Univise
    </Button>
  );
};

export default UniviseButton;
