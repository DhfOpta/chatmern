import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToggleButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ControlledAccordions.css';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const nvgt=useNavigate()

  return (
    <div className='contn'>
      <Accordion expanded={expanded === 'panel1'} className='acor' onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className='panel1bh-header'
        >
          <Typography className='AccordionSummaryNm'>
          Chang Your Password         
           </Typography>
          <Typography className='AccordionSummaryNmDsc' sx={{ color: 'text.secondary', fontSize:'1.72rem' }}> Click on the bellow link to chang password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        <NavLink className='nvlnk' to='/authDas/userDashboard/PasswordChng'> Link to change Password </NavLink>      </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} className='acor' onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          className='panel2bh-header'
        >
          <Typography className='AccordionSummaryNm'>Chang Your Profile Picature</Typography>
          <Typography  className='AccordionSummaryNmDsc' sx={{ color: 'text.secondary' , fontSize:'1.72rem'}}>
          Click on the bellow link to chang Profile          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          
            <NavLink className='nvlnk' to='/authDas/userDashboard/UserDp/chngDp'> Link to change Profile Picature </NavLink>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <div>
        <ToggleButton style={{width:'100%',marginTop:'1rem',fontSize:'1.2rem'}} onClick={()=>{localStorage.removeItem('tokn'),
        localStorage.removeItem('val'),    localStorage.removeItem('DpUserSet')
            nvgt('/Regiter/Login')}}>Logout</ToggleButton>
      </div>
  </div>
  );
}


// export default SettingUserPrfl