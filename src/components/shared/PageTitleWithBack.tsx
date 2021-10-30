import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PageTitleWithBack({ title, onBackClick }: { title: string; onBackClick(): void }) {
  return (
    <div>
      <ListItem disableGutters>
        <ListItemIcon>
          <IconButton onClick={onBackClick} size="small">
            <ArrowBackIcon color="primary" />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={title}></ListItemText>
      </ListItem>
    </div>
  );
}

export default PageTitleWithBack;
